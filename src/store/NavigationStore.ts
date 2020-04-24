import { action, observable } from "mobx";
import navData from "../data/nav.json";

export interface INavData {
  name: string;
  key: string;
  subcategories: {
    name: string;
    key: string;
  }[];
}

export default class NavigationStore {
  @observable data: INavData[] = navData;
  @observable navElement: HTMLElement | undefined = undefined;
  @observable hoverElement: HTMLElement | undefined = undefined;
  @observable hoverState = false;

  @observable current = { category: "", subcategory: "" };

  @action
  setCategory(c: string) {
    this.current.category = c;
  }

  @action
  setSubcategory(c: string) {
    this.current.subcategory = c;
  }

  @action
  setSelectedElement(e: HTMLElement) {
    this.navElement = e;
  }

  @action
  setHoverElement(e: HTMLElement) {
    this.hoverElement = e;
  }

  @action
  setHoverState(state: boolean) {
    this.hoverState = state;
  }

  getCurrentSelectedPosition() {
    if (this.navElement) {
      return this.navElement.dataset.item;
    }
    return "";
  }

  getCurrentHoverPosition() {
    if (this.hoverElement) {
      return this.hoverElement.dataset.item;
    }
    return "";
  }

  getHoveredCategory() {
    const hoverPos = this.getCurrentHoverPosition();
    if (this.data && hoverPos) {
      const hoveredCategory = this.data.filter(e => e.key === hoverPos);
      if (hoveredCategory.length > 0) {
        const subcategories = hoveredCategory[0];
        return subcategories;
      }
    }
    return undefined;
  }
}
