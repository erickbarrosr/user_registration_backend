const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function checkToken(req, res, next) {
  let authHeader = req.headers["authorization"];
  let token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Acesso negado!" });
  }

  try {
    const secret = process.env.SECRET;

    jwt.verify(token, secret);

    next();
  } catch (error) {
    res.status(400).json({ message: "Token inválido." });
  }
}

const loginController = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email) {
        return res.status(422).json({ message: "Email obrigatório." });
      }

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado." });
      }

      if (!password) {
        return res.status(422).json({ message: "Senha obrigatória." });
      }

      const checkPassword = await bcrypt.compare(password, user.password);

      if (!checkPassword) {
        return res.status(422).json({ message: "Senha inválida." });
      }

      const secret = process.env.SECRET;

      const token = jwt.sign(
        {
          id: user._id,
        },
        secret
      );

      res.status(200).json({ message: "Usuário autenticado!", token });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Erro interno de servidor, por favor, tente mais tarde.",
      });
    }
  },
  authenticate: async (req, res) => {
    try {
      const id = req.params.id;

      const user = await User.findById(id, { password: 0, confirmPassword: 0 });

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado." });
      }

      res.status(200).json({ user });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Erro interno de servidor, por favor, tente mais tarde.",
      });
    }
  },
};

module.exports = { loginController, checkToken };
