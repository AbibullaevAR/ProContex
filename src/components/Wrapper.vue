<script lang="ts" setup>
    import { defineModel, watch } from 'vue';
    import ListWithColors from './ListWithColors.vue';
    import List from './List.vue';
    import { IList } from '../types';

    const initLists = (countList: number, countItems: number): IList[] => {
        const lists: IList[] = [];

        for (let indexList = 0; indexList <= countList; indexList++) {
            const items: IList['items'] = [];
            for (let indexItem = 0; indexItem <= countItems; indexItem++) {
                items.push({
                    index: indexItem,
                    color: 'black',
                    countColor: 0,
                });
            }
            lists.push({
                index: indexList,
                items,
            });
        }
        return lists;
    };

    const lists: IList[] = initLists(4, 4);
</script>

<template>
    <div class="wrapper">
        <div class="wrapper__block">
            <List
                v-for="list in lists"
                :key="`select-colors__${list.index}`"
                :list="list"
            ></List>
        </div>
        <div class="wrapper__block">
            <ListWithColors
                v-for="list in lists"
                :key="`visible-colors__${list.index}`"
                :list="list"
            ></ListWithColors>
        </div>
    </div>
</template>

<style lang="scss">
    .wrapper {
        display: flex;
        column-gap: 15%;
        min-height: 600px;

        &__block {
            width: 100%;
            padding: 12px 16px 12px 16px;
            border: 1px solid black;
            display: flex;
            flex-direction: column;
            grid-gap: 8px;
        }
    }
</style>
