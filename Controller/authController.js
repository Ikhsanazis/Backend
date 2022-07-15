const model = require("../Model/usersModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// USERS LOGIN
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

        res
          .status(200)
          .send({
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

module.exports = { login };
