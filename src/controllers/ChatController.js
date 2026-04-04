const Status = require("../constants/Status.json");
const Logger = require("../utils/Logger");
const ErrorManager = require("../../errors/error-manager");
const { environment, Groq: GroqConfig } = require("../../config");
const DBService = require("../services/DBService");
const moment = require("moment");

const GroqSDK = require("groq-sdk");
const groq = GroqConfig.apiKey
  ? new GroqSDK({ apiKey: GroqConfig.apiKey })
  : null;

const logger = new Logger();

module.exports = {
  SendMessage: async (req, res) => {
    try {
      const { message } = req.body;
      if (!message) {
        return ErrorManager.getError(res, "INCOMPLETE_ARGS");
      }

      if (!groq) {
        return res.json({
          status: Status.SUCCESS,
          message: "Chat response.",
          data: {
            reply:
              "EcoAI is currently unavailable. Please try again later.",
          },
        });
      }

      const user = req.user;
      const startOfMonth = moment().startOf("month").toDate();
      const endOfMonth = moment().endOf("month").toDate();

      const transactions = await DBService.Transaction.List(
        { $or: [{ userId: user._id }, { account_no: user.account_no }] },
        startOfMonth,
        endOfMonth,
      );

      const recentTxns = transactions.slice(0, 10);
      let totalSpent = 0;
      let totalReceived = 0;
      const txnSummary = recentTxns.map((t) => {
        const isDebit =
          t.userId && t.userId.toString() === user._id.toString();
        if (isDebit) totalSpent += t.amount;
        else totalReceived += t.amount;
        return `${isDebit ? "Sent" : "Received"} Rs.${t.amount} ${isDebit ? "to" : "from"} ${t.name} (${t.type})`;
      });

      const systemPrompt = `You are EcoAI, a friendly and helpful financial advisor for EcoSpend digital bank.
You help users understand their spending habits, offer savings tips, and answer banking questions.

Current user context:
- Name: ${user.fname} ${user.lname}
- Balance: Rs.${user.balance}
- Total spent this month: Rs.${totalSpent}
- Total received this month: Rs.${totalReceived}
- Recent transactions: ${txnSummary.length > 0 ? txnSummary.join("; ") : "No transactions this month"}

Rules:
- Be concise, friendly, and helpful.
- Give personalized savings tips based on the user's spending data.
- NEVER ask for or reveal full card numbers, CVV, or passwords.
- If asked about something you cannot help with, suggest contacting support via the Tickets page.
- Keep responses under 200 words.`;

      const completion = await groq.chat.completions.create({
        model: "llama-3.1-8b-instant",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message },
        ],
        temperature: 0.4,
        max_tokens: 300,
      });

      const reply =
        completion.choices?.[0]?.message?.content?.trim() ||
        "I'm not sure I understood that. Could you rephrase?";

      return res.json({
        status: Status.SUCCESS,
        message: "Chat response.",
        data: { reply },
      });
    } catch (e) {
      ErrorManager.getError(res, "UNKNOWN_ERROR");
      logger.error(e.message + "\n" + e.stack);
      if (environment === "prod") throw e;
    }
  },
};
