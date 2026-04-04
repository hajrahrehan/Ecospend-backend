const Status = require("../constants/Status.json");

const Logger = require("../utils/Logger");
const ErrorManager = require("../../errors/error-manager");

const logger = new Logger();

const { environment } = require("../../config");
const DBService = require("../services/DBService");
const { isEmail } = require("../utils/utils");
const moment = require("moment");

module.exports = {
  GetInfo: async (req, res) => {
    const userObj = req.user.toObject();
    delete userObj.password;
    try {
      return res.json({
        status: Status.SUCCESS,
        message: "User details.",
        data: {
          user: userObj,
        },
      });
    } catch (e) {
      ErrorManager.getError(res, "UNKNOWN_ERROR");
      logger.error(e.message + "\n" + e.stack);
      if (environment === "prod") throw e;
    }
  },
  GetCards: async (req, res) => {
    const data = await DBService.Card.GetCards({
      userId: req.user._id,
    });
    try {
      return res.json({
        status: Status.SUCCESS,
        message: "User Cards.",
        data,
      });
    } catch (e) {
      ErrorManager.getError(res, "UNKNOWN_ERROR");
      logger.error(e.message + "\n" + e.stack);
      if (environment === "prod") throw e;
    }
  },
  GetSpendingSummary: async (req, res) => {
    try {
      const currentStart = moment().startOf("month").toDate();
      const currentEnd = moment().endOf("month").toDate();
      const prevStart = moment().subtract(1, "month").startOf("month").toDate();
      const prevEnd = moment().subtract(1, "month").endOf("month").toDate();

      const currentTxns = await DBService.Transaction.List(
        { userId: req.user._id },
        currentStart,
        currentEnd,
      );
      const prevTxns = await DBService.Transaction.List(
        { userId: req.user._id },
        prevStart,
        prevEnd,
      );

      let currentTransfers = 0;
      let currentPurchases = 0;
      currentTxns.forEach((t) => {
        if (t.type === "transfer") currentTransfers += t.amount;
        else if (t.type === "purchase") currentPurchases += t.amount;
      });

      let prevTotal = 0;
      prevTxns.forEach((t) => {
        prevTotal += t.amount;
      });

      const currentTotal = currentTransfers + currentPurchases;
      const percentChange =
        prevTotal > 0
          ? Math.round(((currentTotal - prevTotal) / prevTotal) * 100)
          : 0;

      const alerts = [];
      if (prevTotal > 0 && currentTotal > prevTotal * 1.2) {
        alerts.push(
          `You've spent ${percentChange}% more this month compared to last month.`,
        );
      }
      if (currentPurchases > currentTransfers && currentPurchases > 0) {
        alerts.push("Your purchase spending is higher than your transfers this month.");
      }

      const tips = [];
      if (currentTotal > 0) {
        tips.push(
          `Try to save at least Rs.${Math.round(currentTotal * 0.2)} this month by reducing non-essential purchases.`,
        );
      }
      if (currentPurchases > 0) {
        tips.push("Use a Gold or Platinum card for purchases to get 10-20% discounts.");
      }
      if (currentTotal === 0) {
        tips.push("Great start! Keep tracking your spending to build healthy habits.");
      }

      return res.json({
        status: Status.SUCCESS,
        message: "Spending summary.",
        data: {
          currentMonth: {
            total: currentTotal,
            transfers: currentTransfers,
            purchases: currentPurchases,
          },
          previousMonth: { total: prevTotal },
          percentChange,
          alerts,
          tips,
        },
      });
    } catch (e) {
      ErrorManager.getError(res, "UNKNOWN_ERROR");
      logger.error(e.message + "\n" + e.stack);
      if (environment === "prod") throw e;
    }
  },

  UpdateEmail: async (req, res) => {
    try {
      const { email } = req.body;
      if (!email || !isEmail(email)) {
        return ErrorManager.getError(res, "INVALID_ARGUMENTS");
      }

      if (email === req.user.email) {
        return res.json({
          status: Status.SUCCESS,
          message: "Email updated.",
          data: {},
        });
      }

      const EmailExists = await DBService.User.FindOne({ email });
      if (EmailExists) {
        return ErrorManager.getError(res, "USER_FIELD_ALREADY_EXISTS", "email");
      }

      await DBService.User.UpdateUser({ email }, { _id: req.user._id });

      return res.json({
        status: Status.SUCCESS,
        message: "Email updated.",
        data: {},
      });
    } catch (e) {
      ErrorManager.getError(res, "UNKNOWN_ERROR");
      logger.error(e.message + "\n" + e.stack);
      if (environment === "prod") throw e;
    }
  },
  UpdatePassword: async (req, res) => {
    try {
      const { password } = req.body;
      if (!password || password.length < 6) {
        return ErrorManager.getError(res, "INVALID_ARGUMENTS");
      }

      await DBService.User.UpdateUser({ password }, { _id: req.user._id });

      return res.json({
        status: Status.SUCCESS,
        message: "Password updated.",
        data: {},
      });
    } catch (e) {
      ErrorManager.getError(res, "UNKNOWN_ERROR");
      logger.error(e.message + "\n" + e.stack);
      if (environment === "prod") throw e;
    }
  },
};
