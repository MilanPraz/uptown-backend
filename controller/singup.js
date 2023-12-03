const joi = require("joi");
const bcrpyt = require("bcrypt");
const UserModel = require("../model/userModel");

const signupSchema = joi.object({
  username: joi.string().min(4).max(30).required(),
  password: joi
    .string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .min(8)
    .required(),
  repeat_password: joi.ref("password"),
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
  image: joi.string().alphanum(),
});

const singup = async (req, res, next) => {
  try {
    const value = signupSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (value.error) {
      let error = value.error.details;
      console.log(error);
      let errors = error?.map((Err) => {
        return {
          msg: Err.message,
          params: Err.context.key,
        };
      });
      return res.status(400).send({ errors });
    }

    let oldUser = await UserModel.findOne({ email: req.body.email });
    if (oldUser) {
      return res.status(400).send({ msg: "User Already Exist" });
    }

    const encryptedPw = await bcrpyt.hash(req.body.password, 10);
    const user = await UserModel.create({
      ...req.body,
      image: req.file.filename,
      password: encryptedPw,
      repeat_password: encryptedPw,
    });

    let userInfo = user.toObject();
    delete userInfo.password;
    delete userInfo.repeat_password;

    return res.status(200).send(userInfo);
  } catch (err) {
    next(err);
  }
};
module.exports = singup;
