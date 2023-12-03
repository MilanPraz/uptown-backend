const handleError = (err, req, res, next) => {
  try {
    console.log("yeta xu ma");
    console.log(err);
    const errArray = err.errors;
    if (errArray) {
      const dataa = Object.values(errArray);
      if (err.name === "ValidationError") {
        return res.status(400).send(dataa);
      }
      return res.status(500).send({ msg: "server error", error: err });
    }
  } catch (err) {
    console.log("lololo");
    console.log("Error here :", err);
  }
};

module.exports = handleError;
