const router = require("express").Router();

const ChatController = require("../controllers/ChatController");
const Middleware = require("../cors/Middleware");

module.exports = () => {
  router.use(Middleware.UserAuth);
  router.post("/message", ChatController.SendMessage);

  return router;
};
