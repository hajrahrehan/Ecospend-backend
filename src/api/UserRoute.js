const router = require("express").Router();

const UserController = require("../controllers/UserController");
const Middleware = require("../cors/Middleware");

module.exports = () => {
  router.use(Middleware.UserAuth);
  router.get("/", UserController.GetInfo);
  router.get("/cards", UserController.GetCards);
  router.get("/spending-summary", UserController.GetSpendingSummary);
  router.patch("/update/email", UserController.UpdateEmail);
  router.patch("/update/password", UserController.UpdatePassword);

  return router;
};
