const joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../model/userModel");

const loginSchema = joi.object({
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  password: joi
    .string()
    .min(8)
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required(),
});

const login = async (req, res, next) => {
  try {
    const value = loginSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (value.error) {
      const error = value.error.details;
      const errors = error?.map((err) => {
        return {
          msg: err.message,
          params: err.context.key,
        };
      });

      return res.status(400).send(errors);
    }

    let user = await UserModel.findOne({ email: req.body.email });

    if (user) {
      const matched = await bcrypt.compare(req.body.password, user.password);
      userObj = user.toObject();
      delete userObj.password;
      delete userObj.repeat_password;

      if (matched) {
        let token = jwt.sign({ user }, process.env.JWT_SECRET);
        return res.status(200).send({ userObj, token });
      }
    }

    res.status(400).send({ msg: "Invalid Credentials" });
  } catch (err) {
    next(err);
  }
};

module.exports = login;
