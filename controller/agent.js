const agentModel = require("../model/agentModel");

const getAgent = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const perPage = Number(req.query.perPage) || 6;

    let skip = perPage * (page - 1);
    let limit = perPage;
    const agents = await agentModel.aggregate(
      [
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
      ],
      { new: true }
    );
    return res.status(200).send(agents);
  } catch (err) {
    next(err);
  }
};

const postAgent = async (req, res, next) => {
  try {
    console.log(req.body);
    // res.send(req.body);
    const blog = await agentModel.create({
      ...req.body,
      image: req.file.filename,
    });
    return res.status(200).send(blog);
  } catch (err) {
    next(err);
  }
};

const getAgentById = async (req, res, next) => {
  try {
    const agent = await agentModel.findById(req.params.id);
    return res.status(200).send(agent);
  } catch (err) {
    next(err);
  }
};

module.exports = { getAgent, postAgent, getAgentById };
