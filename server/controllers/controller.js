const { Axios, default: axios } = require("axios");
const { Booking, Event, Mountain, Order } = require("../models/index");
const midtransClient = require("midtrans-client");
const ImageKit = require("imagekit");
const { Op } = require("sequelize");

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
      let limit = 12;
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

      const { date, amount } = req.body;
      const UserId = req.user.id;
      const MountainId = id

      let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER_KEY,
      });

      const booking = await Booking.create({
        date,
        amount,
        MountainId,
        UserId,
      });

      if (!booking) throw { name: "NotFound" };

      let parameter = {
        transaction_details: {
          order_id:
            "TRANSACTION_" +
            booking.id +
            (process.env.NODE_ENV === "production" ? "" : "_dev"),
          gross_amount: booking.amount * mountain.price,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          username: req.user.username,
          email: req.user.email,
          password: req.user.password,
        },
      };

      const transaction = await snap.createTransaction(parameter);
      let transactionToken = transaction.token;
      let bookingId = parameter.transaction_details.order_id;

      console.log(transaction);

      await booking.update({
        bookingId,
      });

      res.json({ message: "Booking Created", transactionToken, bookingId });
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
      const { bookingId } = req.body;

      const booking = await Booking.findOne({ where: { bookingId } });

      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }

      if (booking.isPay === true) {
        return res.status(400).json({ message: "Booking alreay paid" });
      }

      const serverKey = process.env.MIDTRANS_SERVER_KEY;
      const base64server = Buffer.from(serverKey + ":").toString("base64");
      const response = await axios.get(
        `https://api.sandbox.midtrans.com/v2/${bookingId}/status`,
        {
          headers: {
            Authorization: `Basic ${base64server}`,
          },
        }
      );

      if (
        response.data.transaction_status === "Settlement" &&
        response.data.status_code === "200"
      ) {
        await booking.update({ isPay: true });
        res.json({ message: `Thank you for your payment` });
      } else {
        res.status(400).json({ message: `Please check your payment detail` });
      }
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
  static async putEvent(req, res, next) {
    try {
      const { id } = req.params;
      const event = await Event.findByPk(id);

      if (!event) throw { name: "NotFound" };

      if (!req.body) {
        throw { name: "SequelizeValidationError" };
      }

      await event.update(req.body);

      res.status(200).json(event);
    } catch (error) {
      next(error);
    }
  }
  static async patchEvent(req, res, next) {
    try {
      const {id} = req.params;
      const event = await Event.findByPk(id);

      const base64Image = req.file.buffer.toString("base64");
      const base64URL = `data:${req.file.mimetype};base64,${base64Image}`;

      const imageKit = new ImageKit({
        publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
        privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
        urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
      });

      let imageURL = await imageKit.upload({
        file: base64URL, //required
        fileName: req.file.originalname, //required
        tags: ["tag1", "tag2"],
      });

      await event.update({
        imgUrl: imageURL.url,
      });

      res
        .status(200)
        .json({ message: `image ${event.title} success to update`, event });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
