import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    //HASH THE PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    //CREATE A NEW USER AND SAVE DB
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    console.log(newUser);
    res.status(201).json({ message: "Tạo tài khoản thành công!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Tạo tài khoản không thành công! " });
  }
};
export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    //CHECK OF THE USER EXISTS
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    if (!user) {
      return res.status(404).json({ message: "Tài khoản không tồn tại!" });
    }

    //CHECK IF THE PASSWORD IS CORRECT
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return res.status(401).json({ message: "Mật khẩu không chính xác!" });
    }

    //GENERATE COOKIE TOKEN AND SEND TO THE USER
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Đăng nhập không thành công! " });
  }
};
export const logout = (req, res) => {};
