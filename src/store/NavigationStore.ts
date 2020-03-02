import { action, observable } from "mobx";
import navData from "../data/nav.json";

export default class NavigationStore {
  @observable data = navData;
  @observable navElement: HTMLElement | undefined = undefined;
  @observable hoverElement: HTMLElement | undefined = undefined;
  @observable hoverState: boolean = false;

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

  getHoveredCategories() {
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
