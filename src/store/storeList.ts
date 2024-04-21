import { ref } from 'vue';
import { defineStore } from 'pinia';
import { IList, IItem } from '../types';

export const nameStoreList = 'nameStoreList';

export const useStoreList = defineStore(nameStoreList, () => {
    const selectedItemsIds = ref<string[]>([]);
    const updatedItems = ref<IItem[]>([]);

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

    const selectItemsIds = (ids: string[]) => {
        selectedItemsIds.value = ids;
    };

    return {
        selectedItemsIds,
        updatedItems,
        selectItemsIds,
        updateItem,
        deleteItem,
        addItem,
    };
});
