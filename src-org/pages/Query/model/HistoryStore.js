import {action, observable, runInAction} from 'mobx';
import { getHistoryTab,getHistoryLabel} from '../api';
import prompt from "@/utils/prompt";

var date=new Date;

export default class HistoryStore {
    //台风Table数据
    @observable data = [
        {
            windv:'',
            datetime:'',
            movedir:'',
            lat:'',
            lon:''
        }
    ] || {};
    //台风列表数据
    @observable tableData = [
        {
            left:'',
            right:''
        }
    ];
    //当前被选中的台风列表数据的下标
    @observable activeIndex = [] || {};
    //当前被选中的年份
    @observable selectValue =date.getFullYear()
    //台风列表数据和台风Table数据
    @observable LabelAndTable = [] || {}
    /**
     * @id number
     */
    @action
    getHistoryTab = (id, cb,cb2) => {
        getHistoryTab(id).then(
            (resp) => runInAction(() => {
                const { pathData } = resp.data
                this.data = pathData
                this.LabelAndTable = resp.data
                cb && cb(this.LabelAndTable);
            }),
            (resp) => runInAction(() => {
                prompt.error(resp.msg);
            })
        )
    };
    /**
     * @param {object}
     */
    @action
    getHistoryLabel= (param) => {
        getHistoryLabel(param).then(
            (resp) => runInAction(() => {
                const {data} = resp.data
                this.tableData =[]
                data.map(item=>{
                    this.tableData.push({
                        left:item.tfbh,
                        right:item.chnname+" "+item.name
                    })
                })
            }),
            (resp) => runInAction(() => {
                prompt.error(resp.msg);
            })
        )
    }
    @action
    changeActiveIndex = (newValue) => {
        this.activeIndex = newValue;
    }
    @action
    changeSelectValue = (newValue) => {
        this.selectValue = newValue;
    }

}