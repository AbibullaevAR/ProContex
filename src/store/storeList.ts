import { ref } from 'vue';
import { defineStore } from 'pinia';
import { IList } from '../types';

export const nameStoreList = 'nameStoreList';

export const useStoreList = defineStore(nameStoreList, () => {
    const lists = ref<IList[]>([]);

    const addList = (list: IList) => {
        lists.value.push(list);
    };
    const deleteList = (list: IList) => {
        lists.value = lists.value.filter((stateList) => stateList.index !== list.index);
    };
    const updateList = (list: IList) => {
        deleteList(list);
        addList(list);
    };

    return {
        lists,
        addList,
        deleteList,
        updateList,
    };
});
