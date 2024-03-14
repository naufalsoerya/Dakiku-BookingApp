const { Booking, Event, Mountain, User } = require("../models/index");
const midtransClient = require("midtrans-client");

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

  // Controller booking
  static async getBooking(req, res, next) {
    try {
      const booking = await Booking.findAll({
        include: [
          {
            model: Mountain,
          },
        ],
      });

      res.status(200).json(booking);
    } catch (error) {
      next(error);
    }
  }
  static async postBooking(req, res, next) {
    try {
      const { id } = req.params;
      const mountain = await Mountain.findByPk(id);

      const { date, amount, MountainId } = req.body;
      const UserId = req.user.id;
      const booking = await Booking.create({
        date,
        amount,
        MountainId,
        UserId,
      });
      if (!booking) throw { name: "NotFound" };

      let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER_KEY,
      });

      let parameter = {
        "transaction_details": {
          "order_id":
            "TRANCSACTION_" + booking.id + (process.env.NODE_ENV === 'production' ? '': '_dev' ),
          "gross_amount": booking.amount * mountain.price,
        },
        "credit_card": {
          "secure": true,
        },
        "customer_details": { 
          "username": req.user.username,
          "email": req.user.email,
          "password": req.user.password,
        },
      };

      const transaction = await snap.createTransaction(parameter)
        // transaction token
      let transactionToken = transaction.token;
      console.log("transactionToken:", transactionToken);

      res.json({ message: 'Booking Created', transactionToken });
    } catch (error) {
      next(error);
    }
  }
  static async putBooking(req, res, next) {
    try {
      const { id } = req.params;
      const booking = await Booking.findByPk(id);

      if (!booking) throw { name: "NotFound" };

      if (!req.body) {
        throw { name: "SequelizeValidationError" };
      }

      await booking.update(req.body);

      res.status(200).json(booking);
    } catch (error) {
      next(error);
    }
  }
  static async deleteBooking(req, res, next) {
    try {
      const { id } = req.params;
      const booking = await Booking.findByPk(id);
      if (!booking) throw { name: "NotFound" };

      await booking.destroy();
      res.json({ message: `Booking success to deleted` });
    } catch (error) {
      next(error);
    }
  }
  static async patchPayment(req, res, next) {
    try {
      await Booking.update({ isPay: true }, { where: { id: req.user.id } });

      res.status(200).json({ message: `Thank you for your payment` });
    } catch (error) {
      next(error);
    }
  }

  // Controller event
  static async getEvent(req, res, next) {
    try {
      const event = await Event.findAll();

      res.status(200).json(event);
    } catch (error) {
      next(error);
    }
  }
  static async postEvent(req, res, next) {
    try {
      const { title, description, price } = req.body;
      const UserId = req.user.id;
      const event = await Event.create({
        title,
        description,
        price,
        UserId,
      });
      if (!event) throw { name: "NotFound" };

      res.status(201).json(event);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
