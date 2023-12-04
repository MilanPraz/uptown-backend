const roomModel = require("../model/roomModel");
const { search } = require("../routes/roomRoute");

const getRoom = async (req, res, next) => {
  try {
    console.log("hello");
    const page = Number(req.query.page) || 1;
    const perPage = Number(req.query.perPage) || 6;

    let skip = perPage * (page - 1);
    let limit = perPage;

    const rooms = await roomModel.aggregate(
      [
        {
          $match: {
            address: RegExp(search, "i"),
          },
        },
        {
          $facet: {
            data: [
              {
                $skip: skip,
              },
              {
                $limit: limit,
              },
            ],
            metadata: [{ $count: "total" }, { $addFields: { page, perPage } }],
          },
        },
      ],
      { new: true }
    );
    return res.status(200).send(rooms);
  } catch (err) {
    next(err);
  }
};

const postRoom = async (req, res, next) => {
  try {
    console.log(req.body);
    // res.send(req.body);
    const room = await roomModel.create({
      ...req.body,
      image: req.file.filename,
    });
    return res.status(200).send(room);
  } catch (err) {
    next(err);
  }
};

const getRoomById = async (req, res, next) => {
  try {
    const room = await roomModel.findById(req.params.id);
    return res.status(200).send(room);
  } catch (err) {
    next(err);
  }
};

const updateReview = async (req, res, next) => {
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
    console.log(year, month_names[month], day);

    let existReview = await roomModel.findOne({
      _id: req.params.id,
      "reviews.created_by": req.user.user._id,
    });
    if (existReview) {
      // console.log("he exist");
      let room = await roomModel.findOneAndUpdate(
        {
          _id: req.params.id,
          "reviews.created_by": req.user.user._id,
        },
        {
          "reviews.$.rating": req.body.rating, // to update particular review only we use $--- its like index
          "reviews.$.comment": req.body.comment,
          "reviews.$.reviewDate": `${day} ${month_names[month]} ${year}`,
        },
        { new: true }
      );
      // console.log(room);
      res.send(room);
    } else {
      const room = await roomModel.findByIdAndUpdate(
        req.params.id,
        {
          $push: {
            reviews: {
              ...req.body,
              created_by: req.user.user._id,
              reviewDate: `${day} ${month_names[month]} ${year}`,
              reviewerPhoto: req.user.user.image,
            },
          },
        },
        { new: true, runValidators: true }
      );

      res.status(200).send(room);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { getRoom, postRoom, getRoomById, updateReview };
