<script lang="ts" setup>
    import {
        unref, toRefs, computed, ref,
        watch,
    } from 'vue';
    import { storeToRefs } from 'pinia';
    import { useStoreList } from '../store/storeList';
    import { IList, IItem } from '../types';

    interface IProps {
        list: IList
    }

    type TDisplay = 'shuffle' | 'sort';

    const props = defineProps<IProps>();
    const { list } = toRefs(props);

    const storeList = useStoreList();
    const { updatedItems, selectedItemsIds } = storeToRefs(storeList);

    const displayColors = ref<TDisplay>('sort');

    const buttonTexteDisplay = computed(() => {
        if (unref(displayColors) === 'shuffle') return 'Сортировать';
        if (unref(displayColors) === 'sort') return 'Перемешать';
        return '';
    });

    const currentUpdatedItems = computed(() => unref(updatedItems).filter((updateItem) => unref(list).items.find((item) => updateItem.index === item.index)));
    const currentSelectedItems = computed(() => unref(currentUpdatedItems).filter((item) => unref(selectedItemsIds).includes(item.index)));
    const selectedItemsWithColor = computed(() => unref(currentSelectedItems).filter((item) => item.countColor));
    const groupedColorsItems = computed(() => unref(selectedItemsWithColor)
        .map((item) => {
            const result: IItem[] = [];
            for (let i = 0; i < item.countColor; i++) {
                result.push(item);
            }
            return result;
        }));

    const colorsShuffle = computed(() => unref(groupedColorsItems)
        .flat()
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value));

    const groupedColorsSorted = computed(() => unref(groupedColorsItems)
        .sort((grouppedColors1, grouppedColors2) => grouppedColors1.length - grouppedColors2.length));

    const deleteColorHandler = (item: IItem) => {
        storeList.updateItem({ ...item, countColor: item.countColor - 1 });
    };
</script>

<template>
    <div class="list-with-colors">
        List {{ list.index + 1 }}
        <input
            :value="buttonTexteDisplay"
            @click.stop.prevent="displayColors = displayColors === 'shuffle' ? 'sort' : 'shuffle'"
            type="button"
            class="list-with-colors__button"
        >
        <div
            v-if="displayColors === 'shuffle'"
            class="list-with-colors__shuffle"
        >
            <div
                class="list-with-colors__square"
                @click="deleteColorHandler(item)"
                @keydown.enter="deleteColorHandler(item)"
                v-for="(item, index) in colorsShuffle"
                :key="index"
                :style="{ 'background-color': item.color }"
            >
            </div>
        </div>
        <div
            v-if="displayColors === 'sort'"
            class="list-with-colors__sorted"
        >
            <div
                class="list-with-colors__sorted-line"
                v-for="(grouppedItems, index) in groupedColorsSorted"
                :key="index"
            >
                <div
                    class="list-with-colors__square"
                    @click="deleteColorHandler(item)"
                    @keydown.enter="deleteColorHandler(item)"
                    v-for="(item, index) in grouppedItems"
                    :key="index"
                    :style="{ 'background-color': item.color }"
                >
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.list-with-colors {
    display: flex;
    flex-direction: column;
    padding: 8px;
    gap: 4px;
    border: 1px solid black;
    position: relative;

    &__square {
        width: 8px;
        height: 8px;
        cursor: pointer;
    }

    &__sorted {
        display: flex;
        flex-direction: column;
        row-gap: 8px;
    }
    &__sorted-line {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
    }

    &__shuffle {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
    }

    &__button {
        position: absolute;
        top: 2px;
        right: 2px;
        background-color: rgb(37, 163, 253);
        color: white;
        border: none;
        border-radius: 4px;
        padding: 4px;
        font-size: 12px;
        cursor: pointer;
    }
}
</style>