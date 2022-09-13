const model = require("../model/usersModel");
const bcrypt = require("bcrypt");
const validator = require("email-validator");
validator.validate("test@email.com");

// GET USERS
const getUsers = async (req, res) => {
  try {
    const getData = await model.getUsers();

    res.send({ data: getData.rows, jumlahData: getData.rowCount });
  } catch (error) {
    res.status(400).send("There's an Error!");
  }
};

// POST USERS
const addUser = async (req, res) => {
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

// PATCH USERS
const editUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const id = req?.params.id;
    console.log(req.params, id);

    // const isimage = req.files.image;
    // !isimage ? null : isimage[0];
    // const image = isimage[0].filename;
    // image? req.files.image[0].filename:[]
    // const image = req.files.image[0].filename;

    // console.log("----------------------------");
    // console.log(image);

    console.log("----------------------------");

    const getData = await model.getUserById(id);
    console.log(getData);

    if (getData.rowCount > 0) {
      const newUserName = username || getData?.rows[0]?.userName;
      const newPassword = password || getData?.rows[0]?.password;
      const newEmail = email || getData?.rows[0]?.email;

      let message = "profile";

      // if (newUserName) message += "username,";
      // if (newPassword) message += "password,";
      // if (newEmail) message += "email,";

      const editData = await model.editUser({
        username: newUserName,
        email: newEmail,
        password: newPassword,
        // image,
        id,
      });

      if (editData) {
        res.send(`${message} updated`);
      } else {
        res.status(400).send("data failed to change");
      }
    } else {
      res.status(400).send("data not found");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("There's an Error!");
  }
};

const editUserProfile = async (req, res) => {
  try {
    // const { username, email, password } = req.body;

    const id = req?.params.id;
    console.log(req.params, id);

    // const isimage = req.files.image;
    // !isimage ? null : isimage[0];
    // const image = isimage[0].filename;
    // image? req.files.image[0].filename:[]
    const image = req.files.image[0].filename;

    console.log("----------------------------");
    console.log(image);

    console.log("----------------------------");

    const getData = await model.getUserById(id);
    console.log(getData);

    if (getData.rowCount > 0) {
      // const newUserName = username || getData?.rows[0]?.userName;
      // const newPassword = password || getData?.rows[0]?.password;
      // const newEmail = email || getData?.rows[0]?.email;

      let message = "Profile picture";

      // if (newUserName) message += "username,";
      // if (newPassword) message += "password,";
      // if (newEmail) message += "email,";

      const editData = await model.editUserProfile({
        // username: newUserName,
        // email: newEmail,
        // password: newPassword,
        image,
        id,
      });

      if (editData) {
        res.send(`${message} updated`);
      } else {
        res.status(400).send("data failed to change");
      }
    } else {
      res.status(400).send("data not found");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("There's an Error!");
  }
};

// DELETE USERS
const deleteUser = async (req, res) => {
  try {
    const { id } = req.body;
    const getData = await model.getUserById(id);

    if (getData.rowCount > 0) {
      const deleteUser = await model.deleteUser(id);

      if (deleteUser) {
        res.send(`data with id ${id} deleted`);
      } else {
        res.status(400).send("data failed to delete!");
      }
    } else {
      res.status(400).send("data not found");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("There's an Error!");
  }
};

module.exports = {
  getUsers,
  addUser,
  editUser,
  deleteUser,
  editUserProfile
};
