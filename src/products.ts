import { Request, Response, Router } from "express";
import { insertProduct, products } from "./db";
import { Licence, PremiumValue, Product } from "./types";

const router = Router();

const premiumStats = () => {
  const properties: { [key: string]: PremiumValue } = {};

  products.forEach((product) => {
    for (const [key, value] of Object.entries(product)) {
      if (key === "name" || key === "price") continue;

      const premiumKey = JSON.stringify({
        property: key,
        value,
      });

      if (!properties[premiumKey]) {
        properties[premiumKey] = {
          count: 1,
          minPrice: product.price,
          maxPrice: product.price,
        };
        continue;
      }

      const premiumValue = properties[premiumKey];
      premiumValue!.count++;
      premiumValue!.minPrice =
        product.price < premiumValue!.minPrice
          ? product.price
          : premiumValue!.minPrice;
      premiumValue!.maxPrice =
        product.price > premiumValue!.maxPrice
          ? product.price
          : premiumValue!.maxPrice;
    }
  });

  return Object.entries(properties).map(([key, value]) => {
    return { ...JSON.parse(key), ...value };
  });
};

const regularPosition = (price: number, power: number = 0): number => {
  if (price >= 2 ** power) return regularPosition(price, power + 1);
  return power - 1;
};

const regularStats = () => {
  const maxPrice = products.reduce(
    (max, { price }) => (price > max ? price : max),
    0
  );
  const properties = new Array(regularPosition(maxPrice) + 1).fill(0);

  products.forEach((product) => {
    properties[regularPosition(product.price)]++;
  });

  return properties
    .map((value, index) => {
      if (!value) return;
      return {
        count: value,
        minPrice: 2 ** index,
        maxPrice: 2 ** (index + 1),
      };
    })
    .filter(Boolean);
};

router.get("/", (req: Request, res: Response) => {
    // TODO Get user fron jwt token

    const license = Math.round(Math.random()) ? Licence.PREMIUM : Licence.REGULAR
    switch(license) {
        case Licence.PREMIUM:
            res.json(premiumStats())
            break
        case Licence.REGULAR:
            res.json(regularStats())
            break
    }
});

router.post("/", (req: Request<any, any, Product>, res: Response) => {
  insertProduct(req.body);
  res.status(200).send('Product inserted')
});

export default router;
