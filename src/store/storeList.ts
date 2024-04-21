import { ref } from 'vue';
import { defineStore } from 'pinia';
import { IList, IItem } from '../types';

export const nameStoreList = 'nameStoreList';

export const useStoreList = defineStore(nameStoreList, () => {
    const lists = ref<IList[]>([]);
    const selectedItemsIds = ref<number[]>([]);
    const updatedItems = ref<IItem[]>([]);

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

    const addItem = (item: IItem) => {
        updatedItems.value.push(item);
    };

    const deleteItem = (item: IItem) => {
        updatedItems.value = updatedItems.value.filter((updateItem) => updateItem.index !== item.index);
    };

    const updateItem = (item: IItem) => {
        deleteItem(item);
        addItem(item);
    };

    const selectItemsIds = (ids: number[]) => {
        selectedItemsIds.value = ids;
    };

    return {
        lists,
        selectedItemsIds,
        updatedItems,
        selectItemsIds,
        updateItem,
        deleteItem,
        addItem,
        addList,
        deleteList,
        updateList,
    };
});
