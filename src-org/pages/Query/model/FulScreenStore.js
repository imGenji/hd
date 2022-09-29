import { observable, action } from 'mobx';

export default class FulScreenStore{
    @observable fulScreen = true

    @action
    changeFulScreen = (newValue) => {
        this.fulScreen = newValue;
    }
}
