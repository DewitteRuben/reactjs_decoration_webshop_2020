import { action, observable } from "mobx";

export default class NavigationStore {
  @observable currentNav: string = "";

  @observable navElement: HTMLElement | undefined = undefined;

  @action
  setCurrentPosition(name: string) {
    this.currentNav = name;
  }

  @action
  setElement(e: HTMLElement) {
    this.navElement = e;
  }
}
