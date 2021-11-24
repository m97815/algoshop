import fs from "fs";
import { Models, Product, User } from "./types";

const connect = () => {
  if (!fs.existsSync("db.json")) {
    const models = [{ [Models.USERS]: [] }, { [Models.PRODUCTS]: [] }];
    fs.writeFileSync("db.json", JSON.stringify(models));
  }

  return JSON.parse(fs.readFileSync("db.json", "utf-8"));
};

const update = () => {
  fs.writeFile("db.json", JSON.stringify([{ products }, { users }]), () => {
      console.debug('DB Updated')
  });
};

const client = connect();

export const getAll = <T extends Product | User>(model: Models): Array<T> => {
  const m = client.find((obj: { [model: string]: Array<T> }) => obj[model]);
  return m ? m[model] : [];
};

export const users = getAll<User>(Models.USERS);
export const products = getAll<Product>(Models.PRODUCTS);

export const insertProduct = (product: Product): void => {
  products.push(product);
  update()
};

export const insertUser = (user: User): void => {
  users.push(user);
  update()
};
