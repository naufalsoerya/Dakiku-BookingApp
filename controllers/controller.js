const { Booking, Event, Mountain, User } = require("../models/index");

class Controller {
  // Controller mountain
  static async getMountain(req, res, next) {
    try {
      const { sort, search, page } = req.query;
      const option = {
        where: {},
      };

      // search
      if (search) {
        option.where = {
          name: {
            [Op.iLike]: `%${search}%`,
          },
        };
      }

      // sort
      if (sort) {
        const order = sort[0] === "-" ? "DESC" : "ASC";
        const column = order === "DESC" ? sort.slice(1) : sort;
        option.order = [[column, order]];
      }

      // pagination
      let limit = 10;
      let pageNum = 1;

      if (page) {
        if (page.size) {
          limit = +page.size;
          option.limit = limit;
        }

        if (page.number) {
          pageNum = +page.number;
          option.offset = limit * (pageNum - 1);
          option.limit = limit;
        }
      } else {
        option.limit = limit;
        option.offset = limit * (pageNum - 1);
      }

      let { count, rows } = await Mountain.findAndCountAll(option);

      let mountain = await Mountain.findAll();

      if (mountain.length === 0) {
        throw { name: "NotFound" };
      }

      res.status(200).json({
        page: pageNum,
        data: rows,
        totalData: count,
        totalPage: Math.ceil(count / limit),
        dataPerPage: limit,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getMountainById(req, res, next) {
    try {
      const { id } = req.params;
      const mountain = await Mountain.findByPk(id);
      if (!mountain) throw { name: "NotFound" };

      res.status(200).json(mountain);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
