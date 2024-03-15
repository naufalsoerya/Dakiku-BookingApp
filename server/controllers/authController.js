const { User } = require("../server/models");
const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();
const nodemailer = require("nodemailer");

class AuthController {
  static async googleLogin(req, res, next) {
    const { googleToken } = req.body;
    try {
      const ticket = await client.verifyIdToken({
        idToken: googleToken,
        audience:
          "155566357791-j3vna54ebf74gcqg3dhmt4o8u8csa7dp.apps.googleusercontent.com",
      });
      const { email, name } = ticket.getPayload();
      const [user, created] = await User.findOrCreate({
        where: { email },
        defaults: {
          username: name,
          email,
          password: Math.random().toString(),
        },
      });
      const payload = { id: user.id };
      const token = signToken(payload);
      res.status(200).json({ message: `Success Logged in as ${email}`, token });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async register(req, res, next) {
    try {
      const user = await User.create(req.body);

      if (user) {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "naufalsurya.official@gmail.com",
            pass: process.env.PW,
          },
        });
        async function main() {
          const info = await transporter.sendMail({
            from: "naufalsurya.official@gmail.com",
            to: `${user.email}`,
            subject: "Register Success",
            text: "Your Register was successful",
          });

          console.log("Message sent: %", info.messageId);
        }
        main().catch(console.error);
      }

      res.status(201).json({ user });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email) {
        throw { name: "EmailRequired" };
      }

      if (!password) {
        throw { name: "PassRequired" };
      }

      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw { name: "InvalidLogin" };
      }

      const checkPass = comparePassword(password, user.password);
      if (!checkPass) {
        throw { name: "InvalidLogin" };
      }

      const payload = { id: user.id };
      const token = signToken(payload);

      res.status(200).json({ message: "login success", token });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;
