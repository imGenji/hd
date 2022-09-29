import { observable, action } from 'mobx';

export default class HeaderMenuStore{
    @observable selectedHeaderMenu;

    @action
    setHeaderMenu = (headerMenu) => this.selectedHeaderMenu = headerMenu;
}
