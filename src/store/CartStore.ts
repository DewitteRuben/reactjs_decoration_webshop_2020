import { observable, action } from "mobx";
import _ from "lodash";
import { IShopItem } from "../io-ts-types";

export class CartStore {
  @observable
  items: IShopItem[] = [
    {
      id: "3KDSKQSL",
      _id: "0",
      description: "Beautiful plant",
      images: {
        larqe: "",
        medium: "",
        thumb: "",
        small:
          "https://images.pexels.com/photos/3603817/pexels-photo-3603817.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=44"
      },
      name: "Vase 420",
      price: 22.5,
      stateOfProduct: "good",
      category: "decoration",
      subCategory: "vases-and-flowers",
      itemCategory: "vases",
      specificCategory: "keramic-vase"
    },
    {
      id: "KDJS@32DSK",
      _id: "1",
      description: "Beautiful plant",
      images: {
        larqe: "",
        medium: "",
        thumb: "",
        small:
          "https://images.pexels.com/photos/3603817/pexels-photo-3603817.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=44"
      },
      name: "Vase 420",
      price: 22.5,
      stateOfProduct: "good",
      category: "decoration",
      subCategory: "vases-and-flowers",
      itemCategory: "vases",
      specificCategory: "keramic-vase"
    }
  ];

  @action
  addItem = (item: IShopItem) => {
    this.items.push(item);
  };

  @action
  removeItem = (id: string) => {
    _.remove(this.items, item => item._id === id);
  };
}
