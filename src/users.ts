import { Request, Response, Router } from "express";
import bcrypt from "bcrypt";
import { insertUser } from "./db";
import { User } from "./types";

const router = Router();

router.post("/", async (req: Request<any, any, User>, res: Response) => {
  const { username, password, licence } = req.body;
  const encrypted = await bcrypt.hash(password, 10);
  insertUser({
    username,
    password: encrypted,
    licence,
  });
  res.status(200).send("User inserted");
});

export default router;
