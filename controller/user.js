const UserModel = require("../model/userModel");

const commenterDetail = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await UserModel.findById(userId);
    userObj = user.toObject();
    delete userObj.password;
    delete userObj.repeat_password;
    // console.log(userObj);

    res.status(200).send(userObj);
  } catch (err) {
    next(err);
  }
};

const userDetail = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.user.user._id, {
      password: 0,
      repeat_password: 0,
    });
    res.status(200).send(user);
  } catch (err) {
    next(err);
  }
};

module.exports = { commenterDetail, userDetail };
