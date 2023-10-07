const User = require("../models/User");
const bcrypt = require("bcrypt");

const userController = {
  create: async (req, res) => {
    try {
      const { name, lastName, userName, email, password, confirmPassword } =
        req.body;

      if (!name) {
        return res.status(422).json({ message: "O nome é obrigatório." });
      }

      if (!lastName) {
        return res.status(422).json({ message: "O sobrenome é obrigatório." });
      }

      if (!userName) {
        return res
          .status(422)
          .json({ message: "O nome de usuário é obrigatório." });
      }

      if (!email) {
        return res.status(422).json({ message: "O email é obrigatório." });
      }

      if (!password) {
        return res.status(422).json({ message: "A senha é obrigatória." });
      }

      if (!confirmPassword) {
        return res
          .status(422)
          .json({ message: "A confirmação de senha é obrigatória." });
      }

      const passwordRegex =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(password)) {
        return res.status(422).json({
          message:
            "A senha deve ter pelo menos 8 caracteres e conter pelo menos uma letra, um número e um caractere especial.",
        });
      }

      if (password !== confirmPassword) {
        return res.status(422).json({ message: "As senhas não conferem." });
      }

      const salt = await bcrypt.genSalt(10);

      const passwordHash = await bcrypt.hash(password, salt);

      const userExist = await User.findOne({ userName });

      if (userExist) {
        return res.status(422).json({ message: "Esse usuário já existe." });
      }

      const emailExist = await User.findOne({ email });

      if (emailExist) {
        return res.status(422).json({ message: "Email já cadastrado." });
      }

      const user = {
        name,
        lastName,
        userName,
        email,
        password: passwordHash,
      };

      const userCreated = await User.create(user);

      res
        .status(201)
        .json({ userCreated, message: "Usuário criado com sucesso!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Erro interno de servidor, por favor, tente mais tarde.",
      });
    }
  },
  index: async (req, res) => {},
  show: async (req, res) => {},
  update: async (req, res) => {},
  destroy: async (req, res) => {},
};

module.exports = userController;
