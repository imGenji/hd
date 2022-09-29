import { observable, action } from 'mobx';

export default class LegendStore{
    @observable activeTyphoon = false
    @observable activeArea = false
    @observable activePrediction = false
    @observable checkValue = [] || {}
    @action
    changeActiveTyphoon = (newValue) => {
        this.activeTyphoon = newValue;
    }
    @action
    changeActiveArea = (newValue) => {
        this.activeArea = newValue;
    }
    @action
    changeActivePrediction = (newValue) => {
        this.activePrediction = newValue;
    }
    @action
    changeCheckValue = (newValue) => {
        this.checkValue = newValue;
    }
}
