import { observable, action } from "mobx";
import { IShopItem } from "./ItemStore";
import _ from "lodash";

export class CartStore {
  @observable
  items: IShopItem[] = [
    {
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
