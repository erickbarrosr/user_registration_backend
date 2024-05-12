import User from "../models/User";
import bcrypt from "bcrypt";

class UserController {
  async registerUser(req, res) {
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

      const passwordRegex =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

      if (!passwordRegex.test(password)) {
        return res.status(422).json({
          message:
            "A senha deve ter pelo menos 8 caracteres e conter pelo menos uma letra, um número e um caractere especial.",
        });
      }

      if (!confirmPassword) {
        return res
          .status(422)
          .json({ message: "A confirmação de senha é obrigatória." });
      }

      if (password !== confirmPassword) {
        return res.status(422).json({ message: "As senhas não conferem." });
      }

      const salt = await bcrypt.genSalt(10);

      const passwordHash = await bcrypt.hash(password, salt);

      const userExists = await User.findOne({ userName });

      if (userExists) {
        return res.status(422).json({ message: "Esse usuário já existe." });
      }

      const emailExists = await User.findOne({ email });

      if (emailExists) {
        return res.status(422).json({ message: "Email já cadastrado." });
      }

      const user = new User({
        name,
        lastName,
        userName,
        email,
        password: passwordHash,
      });

      const newUser = await user.save();

      res.status(201).json({
        message: "Usuário criado com sucesso!",
        newUser,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error." });
    }
  }
}

export default new UserController();
