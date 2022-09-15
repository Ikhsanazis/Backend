const model = require("../Model/usersModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// LOGIN
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const getUserByEmail = await model.getUserByEmail(email);

    if (getUserByEmail?.rowCount) {
      const checkPassword = bcrypt.compareSync(
        password,
        getUserByEmail?.rows[0]?.password
      );

      console.log(password);
      console.log(getUserByEmail?.rows[0]?.password);
      if (checkPassword) {
        const token = jwt.sign(
          getUserByEmail?.rows[0],
          process.env.SECRET_KEY,
          { expiresIn: "24h" }
        );
        console.log(token);

        res.status(200).send({
          user: { ...getUserByEmail?.rows[0], ...{ password: null } },
          token,
        });
      } else {
        res.status(401).send("Password is not correct ! Try Again.");
      }
    } else {
      res.status(400).send("Unregistered user");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("There's an Error!");
  }
};

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const inputUsername = username;
    const inputEmail = email.toLowerCase().trim();
    const inputPassword = password.trim();

    const salt = bcrypt.genSaltSync(15);
    const hash = bcrypt.hashSync(inputPassword, salt);

    const addUser = await model.addUser({
      inputUsername,
      inputEmail,
      inputPassword: hash,
    });

    const validator = require("email-validator");
    const domain = inputEmail.split(".");
    const check = validator.validate(inputEmail);

    console.log(inputEmail);
    console.log(domain);
    console.log(check);

    const checkEmail = () => {
      const case1 = domain[1] === "com" && domain.length <= 2;
      // console.log(case1 + ' ini case1')
      const case2 =
        domain[1] === "co" && domain[2] === "id" && domain.length <= 3;
      // console.log(case2 + ' ini case2')

      if (check) {
        if (case1 || case2) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    };

    const test = checkEmail(inputEmail);
    console.log(test + " ini test");

    const checkPassword = inputPassword.length >= 8;
    if (addUser) {
      if (test) {
        if (checkPassword) {
          res.send("succes to register!");
        } else {
          res.send("Password must have 8 characters");
        }
      } else {
        res.status(400).send("unvalid email!");
      }
    } else {
      res.status(400).send("Failed to added");
    }
  } catch (error) {
    res.status(400).send("Complete your data or using new email!");
    console.log(error);
  }
};

module.exports = { login, register };
