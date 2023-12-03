const happyClientModel = require("../model/happyClientModel");

const getHappyClient = async (req, res, next) => {
  try {
    const clients = await happyClientModel.find();

    res.send(clients);
  } catch (err) {
    next(err);
  }
};

const addHappyClient = async (req, res, next) => {
  try {
    const d = new Date();
    let year = d.getFullYear();
    let month = d.getMonth();
    let day = d.getDate();
    let month_names = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let client = await happyClientModel.create({
      username: req.user.user.username,
      image: req.user.user.image,
      message: req.body.message,
      userid: req.user.user._id,
      createdDate: `${day} ${month_names[month]} ${year}`,
    });
    res.send(client);
  } catch (err) {
    next(err);
  }
};

module.exports = { getHappyClient, addHappyClient };
