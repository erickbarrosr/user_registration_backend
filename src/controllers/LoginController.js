import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import createUserToken from "../utils/create-user-token";
import getUserToken from "../utils/get-user-token";

class LoginController {
  async authenticateUser(req, res) {
    try {
      const { email, password } = req.body;

      if (!email) {
        return res.status(422).json({ message: "O email é obrigatório." });
      }

      if (!password) {
        return res.status(422).json({ message: "A senha é obrigatória." });
      }

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: "Usuário não cadastrado." });
      }

      const checkPassword = await bcrypt.compare(password, user.password);

      if (!checkPassword) {
        return res.status(400).json({ message: "Senha incorreta." });
      }

      const token = await createUserToken(user);

      res.json({ message: "Usuário autenticado com sucesso!", token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Falha ao fazer login." });
    }
  }

  async checkIfUserIsLoggedIn(req, res) {
    try {
      let authenticatedUser = {};

      if (req.headers.authorization) {
        const token = await getUserToken(req);

        const decoded = jwt.verify(token, process.env.SECRET);

        authenticatedUser = await User.findById(decoded.id);

        authenticatedUser.password = undefined;
      } else {
        return res.status(401).json({ message: "Nenhum usuário autenticado." });
      }

      res.status(200).json({
        message: "O seguinte usuário está autenticado:",
        authenticatedUser,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error." });
    }
  }
}

export default new LoginController();
