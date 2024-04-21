<script lang="ts" setup>
    import {
        unref,
        toRefs,
        computed,
        watch,
    } from 'vue';
    import { storeToRefs } from 'pinia';
    import { useStoreList } from '../store/storeList';
    import CheckBox, { IPropsCheckbox } from './CheckBox.vue';
    import DropDown from './DropDown.vue';
    import Item from './Item.vue';
    import { IList } from '../types';

    interface IProps {
        list: IList
    }

    const props = defineProps<IProps>();
    const { list } = toRefs(props);
    const storeLists = useStoreList();
    const { selectedItemsIds, updatedItems } = storeToRefs(storeLists);

    const currentSelectedItems = computed(() => unref(selectedItemsIds).filter((selecteItemId) => unref(list).items.find((item) => item.index === selecteItemId)));

    const checkBoxModel = computed({
        get: () => !!unref(currentSelectedItems).length,
        set: (value: boolean) => {
            const currentItemsIds = unref(list).items.map((item) => item.index);
            const selectedIdsWithoutCurrentIds = unref(selectedItemsIds).filter((index) => !currentItemsIds.includes(index));
            if (value) {
                storeLists.selectItemsIds([...selectedIdsWithoutCurrentIds, ...unref(currentItemsIds)]);
            } else {
                storeLists.selectItemsIds(selectedIdsWithoutCurrentIds);
            }
        },
    });

    const checkboxType = computed<IPropsCheckbox['type']>(() => {
        const isAllChecked = unref(currentSelectedItems).length === unref(list).items.length;
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
                    v-model="selectedItemsIds"
                    v-model:updated-items="updatedItems"
                    v-for="(item, index) in list.items"
                    :index="index"
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