<script lang="ts" setup>
    import {
        unref,
        toRefs,
        computed,
        ref,
        watch,
    } from 'vue';
    import { storeToRefs } from 'pinia';
    import { useStoreList } from '../store/storeList';
    import CheckBox, { IPropsCheckbox } from './CheckBox.vue';
    import DropDown from './DropDown.vue';
    import Item from './Item.vue';
    import { IItem, IList } from '../types';

    interface IProps {
        list: IList
    }

    const props = defineProps<IProps>();
    const { list } = toRefs(props);
    const storeLists = useStoreList();
    const { lists } = storeToRefs(storeLists);
    const colorsItems = ref<IItem[]>(unref(list).items);

    const selectedItems = computed({
        get: () => unref(lists).find((storeList) => storeList.index === unref(list).index)?.items || [],
        set: (items: IItem[]) => {
            const isListAdded = !!unref(lists).find((storeList) => storeList.index === unref(list).index);
            const isListNew = !isListAdded;
            if (isListNew) storeLists.addList({ ...unref(list), items });
            if (isListAdded && items.length === 0) storeLists.deleteList(unref(list));
            if (isListAdded && items.length) {
                storeLists.updateList({ ...unref(list), items });
            }
        },
    });

    const updateItemByColor = (item: IItem, isChecked: boolean) => {
        colorsItems.value = colorsItems.value.filter((itemColor) => itemColor.index !== item.index);
        colorsItems.value.push(item);

        if (isChecked) {
            const selectedItemsWithoutUpdatedItem = unref(selectedItems).filter((itemSelected) => itemSelected.index !== item.index);
            storeLists.updateList({ ...unref(list), items: [...selectedItemsWithoutUpdatedItem, item] });
        }
    };

    const checkBoxModel = computed({
        get: () => !!unref(selectedItems).length,
        set: (value: boolean) => {
            if (value) {
                storeLists.addList({ ...unref(list), items: unref(colorsItems) });
            } else {
                storeLists.deleteList(unref(list));
            }
        },
    });

    const checkboxType = computed<IPropsCheckbox['type']>(() => {
        const isAllChecked = unref(selectedItems).length === unref(list).items.length;
        if (isAllChecked) return 'check';
        return 'square';
    });

</script>

<template>
    <div class="list">
        <DropDown>
            <template #right-arrow>
                <CheckBox
                    v-model="checkBoxModel"
                    :type="checkboxType"
                ></CheckBox>
            </template>
            <template #menu-name>
                List {{ list.index + 1 }}
            </template>
            <div class="list__contanier">
                <Item
                    v-model="selectedItems"
                    @changeColorCount="updateItemByColor"
                    @changeColor="updateItemByColor"
                    v-for="item in list.items"
                    :color-items="colorsItems"
                    :key="item.index"
                    :current-item="item">
                </Item>
            </div>
        </DropDown>
    </div>
</template>

<style lang="scss">
.list {

    &__contanier {
        margin-top: 8px;
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        grid-gap: 8px;
    }
}
</style>