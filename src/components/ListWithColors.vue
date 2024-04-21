<script lang="ts" setup>
    import {
        unref, toRefs, computed, ref,
    } from 'vue';
    import { storeToRefs } from 'pinia';
    import { useStoreList } from '../store/storeList';
    import { IList } from '../types';

    interface IProps {
        list: IList
    }

    type TDisplay = 'shuffle' | 'sort';

    const props = defineProps<IProps>();
    const { list } = toRefs(props);

    const storeList = useStoreList();
    const { lists } = storeToRefs(storeList);

    const displayColors = ref<TDisplay>('sort');

    const buttonTexteDisplay = computed(() => {
        if (unref(displayColors) === 'shuffle') return 'Сортировать';
        if (unref(displayColors) === 'sort') return 'Перемешать';
        return '';
    });

    const selectedItems = computed(() => unref(lists).find((listFromStore) => listFromStore.index === unref(list).index)?.items || []);
    const selectedItemsWithColor = computed(() => unref(selectedItems).filter((item) => item.countColor));
    const groupedColors = computed(() => unref(selectedItemsWithColor)
        .map((item) => {
            const result: string[] = [];
            for (let i = 0; i < item.countColor; i++) {
                result.push(item.color);
            }
            return result;
        }));

    const colorsShuffle = computed(() => unref(groupedColors)
        .flat()
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value));

    const groupedColorsSorted = computed(() => unref(groupedColors)
        .sort((grouppedColors1, grouppedColors2) => grouppedColors1.length - grouppedColors2.length));
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
                v-for="(color, index) in colorsShuffle"
                :key="index"
                :style="{ 'background-color': color }"
            >
            </div>
        </div>
        <div
            v-if="displayColors === 'sort'"
            class="list-with-colors__sorted"
        >
            <div
                class="list-with-colors__sorted-line"
                v-for="(colorGroup, index) in groupedColorsSorted"
                :key="index"
            >
                <div
                    class="list-with-colors__square"
                    v-for="color in colorGroup"
                    :key="color"
                    :style="{ 'background-color': color }"
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