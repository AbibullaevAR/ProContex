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
    const itemsColors = ref<IItem[]>([]);

    const itemsModel = computed({
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

    const changeColorHanlder = (item: IItem) => {
        const isItemAdded = !!unref(lists).find((storeList) => storeList.index === unref(list).index)?.items.find((listItem) => listItem.index === item.index);
        itemsColors.value = itemsColors.value.filter((itemColor) => itemColor.index !== item.index);
        itemsColors.value.push(item);
        // if (isItemAdded) {

        // }
    };

    const changeColorCountHanlder = (item: IItem) => {
        const isItemAdded = !!unref(lists).find((storeList) => storeList.index === unref(list).index)?.items.find((listItem) => listItem.index === item.index);
        itemsColors.value = itemsColors.value.filter((itemColor) => itemColor.index !== item.index);
        itemsColors.value.push(item);
        // if (isItemAdded) {

        // }
    };

    const checkBoxModel = computed({
        get: () => !!unref(itemsModel).length,
        set: (value: boolean) => {
            if (value) {
                const test = unref(list).items.filter((item) => !unref(itemsColors).find((itemColor) => item.index !== itemColor.index));
                storeLists.addList({ ...unref(list), items: [...test, ...unref(itemsColors)] });
            } else {
                storeLists.deleteList(unref(list));
            }
        },
    });

    const checkboxType = computed<IPropsCheckbox['type']>(() => {
        const isAllChecked = unref(itemsModel).length === unref(list).items.length;
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
                    v-model="itemsModel"
                    @changeColorCount="changeColorCountHanlder"
                    @changeColor="changeColorHanlder"
                    v-for="item in list.items"
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