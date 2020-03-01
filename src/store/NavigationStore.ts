import { action, observable } from "mobx";

export default class NavigationStore {
  @observable currentNav: string = "";

  @observable navElement: HTMLElement | undefined = undefined;

  @action
  setNav(name: string) {
    this.currentNav = name;
  }
}
