const blogModel = require("../model/blogModel");

const getBlog = async (req, res, next) => {
  try {
    let search = req.query.search || "";
    let category = req.query.category || "";

    const page = Number(req.query.page) || 1;
    const perPage = Number(req.query.perPage) || 6;

    let skip = perPage * (page - 1);
    let limit = perPage;

    const blogs = await blogModel.aggregate([
      {
        $match: {
          title: RegExp(search, "i"),
          category: RegExp(category, "i"),
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
        },
      },
    ]);
    return res.status(200).send(blogs);
  } catch (err) {
    next(err);
  }
};

const getRecentBlog = async (req, res, next) => {
  try {
    let blogs = await blogModel.find().sort({ _id: -1 }).limit(3);

    res.status(200).send(blogs);
  } catch (err) {
    next(err);
  }
};

const postBlog = async (req, res, next) => {
  try {
    const d = new Date();
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
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
    console.log(req.body);
    // res.send(req.body);
    const blog = await blogModel.create({
      ...req.body,
      image: req.file.filename,
      blogDate: `${day} ${month_names[month]} ${year}`,
    });
    return res.status(200).send(blog);
  } catch (err) {
    next(err);
  }
};

const getBlogById = async (req, res, next) => {
  try {
    const blog = await blogModel.findById(req.params.id);
    return res.status(200).send(blog);
  } catch (err) {
    next(err);
  }
};

const getBlogCount = async (req, res, next) => {
  try {
    const blogs = await blogModel.find();

    let jobs = 0;
    let visual_assistant = 0;
    let coffee = 0;
    let drinks = 0;
    let foods = 0;
    let travel = 0;

    blogs.forEach((blog) => {
      if (blog.category === "jobs") {
        jobs += 1;
      } else if (blog.category === "visual_assistant") {
        visual_assistant += 1;
      } else if (blog.category === "coffee") {
        coffee += 1;
      } else if (blog.category === "drinks") {
        drinks += 1;
      } else if (blog.category === "foods") {
        foods += 1;
      } else if (blog.category === "travel") {
        travel += 1;
      } else {
        null;
      }
    });

    res.send({ jobs, visual_assistant, foods, coffee, travel, drinks });
  } catch (err) {
    next(err);
  }
};
const updateReview = async (req, res, next) => {
  try {
    console.log("review heere");
    const d = new Date();
    let year = d.getFullYear();
    let month = d.getMonth();
    let day = d.getDate();
    console.log(month);
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

    let existReview = await blogModel.findOne({
      _id: req.params.id,
      "reviews.created_by": req.user.user._id,
    });
    console.log(req.params.id);
    if (existReview) {
      console.log("exist haiiiii");
      let blog = await blogModel.findOneAndUpdate(
        {
          _id: req.params.id,
          "reviews.created_by": req.user.user._id,
        },
        {
          "reviews.$.comment": req.body.comment,
        },
        { new: true }
      );

      res.send(blog);
    } else {
      const blog = await blogModel.findByIdAndUpdate(
        req.params.id,
        {
          $push: {
            reviews: {
              ...req.body,
              created_by: req.user.user._id,
              reviewDate: `${day} ${month_names[month]} ${year}`,
            },
          },
        },
        { new: true, runValidators: true }
      );

      res.status(200).send(blog);
    }
  } catch (err) {
    next(err);
  }
};

const reply = async (req, res, next) => {
  try {
    console.log("review heere");
    const d = new Date();
    let year = d.getFullYear();
    let month = d.getMonth();
    let day = d.getDate();
    console.log(month);
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

    const blog = await blogModel.findOneAndUpdate(
      {
        _id: req.params.id,
        "reviews._id": req.body.commentId,
      },
      {
        $push: {
          "reviews.$.replies": {
            comment: req.body.comment,
            created_by: req.user.user._id,
            reviewDate: `${day} ${month_names[month]} ${year}`,
          },
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).send(blog);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getBlog,
  postBlog,
  getBlogById,
  updateReview,
  getRecentBlog,
  getBlogCount,
  reply,
};
