import express from "express";
import helmet from "helmet";
import cors from "cors";
import userRouter from "./users";
import productRouter from "./products";

const app = express();

const { PORT } = process.env;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use("/users", userRouter);
app.use("/products", productRouter);

app.listen(PORT, () => {
  console.log(`Running on ${PORT}`);
});
