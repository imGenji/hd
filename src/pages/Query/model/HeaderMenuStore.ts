import { observable, action } from 'mobx';

export default class HeaderMenuStore{
    @observable selectedHeaderMenu: string;

    @action
    setHeaderMenu = (headerMenu: string) => this.selectedHeaderMenu = headerMenu;
}


export type TypeHeaderMenuStore = HeaderMenuStore;
