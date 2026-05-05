const TransactionModel = require("../models/Transaction");

module.exports = {
  Create: async (obj) => {
    return TransactionModel.create(obj);
  },

  List: async (a, start, end) => {
    let filter = a ? { ...a } : {};

    if (start) {
      const range = { $gte: new Date(start) };
      if (end) range.$lte = new Date(end);
      filter.time = range;
    }

    return TransactionModel.find(filter).sort({ time: -1 });
  },
};
