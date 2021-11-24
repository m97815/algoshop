export enum Permission {
  REGULAR,
  PREMIUM,
}

export enum Models {
  USERS = "users",
  PRODUCTS = "products",
}

export enum Licence {
  REGULAR = "regular",
  PREMIUM = "premium",
}

export interface Product {
  name: string;
  price: number;
  [other: string]: any;
}

export interface User {
  username: string;
  password: string;
  licence: Licence;
}

export interface PremiumKey {
  property: string;
  value: string;
}

export interface PremiumValue {
  count: number;
  minPrice: number;
  maxPrice: number;
}

export interface PremiumStats extends PremiumKey, PremiumValue {

}

export interface RegularStats {
  count: number;
  minPrice: number;
  maxPrice: number;
}