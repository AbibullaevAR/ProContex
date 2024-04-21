<script lang="ts" setup>
    import {
        toRefs, unref, watch, ref, computed,
    } from 'vue';
    import CheckBox from './CheckBox.vue';
    import InputColor from './InputColor.vue';
    import InputCount from './InputCount.vue';
    import { IItem } from '../types/index';

    interface IProps {
        modelValue: IItem[],
        colorItems: IItem[],
        currentItem: IItem
    }

    interface IEmits {
        (u: 'update:modelValue', value: IItem[]): void
        (u: 'changeColor', value: IItem, isChecked: boolean): void
        (u: 'changeColorCount', value: IItem, isChecked: boolean): void
    }

    const props = defineProps<IProps>();
    const { modelValue, currentItem, colorItems } = toRefs(props);

    const emits = defineEmits<IEmits>();

    const isCurrentItemChecked = computed(() => !!unref(modelValue).find((item) => item.index === unref(currentItem).index));
    const updatedColorItem = computed(() => unref(colorItems).find((item) => item.index === unref(currentItem).index));

    const colorModel = computed({
        get: () => unref(updatedColorItem)?.color || '',
        set: (value: string) => {
            const updatedItem = unref(updatedColorItem);
            if (updatedItem) {
                emits('changeColor', { ...updatedItem, color: value }, unref(isCurrentItemChecked));
            }
        },
    });

    const colorCountModel = computed({
        get: () => unref(updatedColorItem)?.countColor || 0,
        set: (value: number) => {
            const updatedItem = unref(updatedColorItem);
            if (updatedItem) {
                emits('changeColorCount', { ...updatedItem, countColor: value }, unref(isCurrentItemChecked));
            }
        },
    });

    const addCurrentItem = () => {
        const updatedItem = unref(updatedColorItem) || unref(currentItem);
        emits('update:modelValue', [...unref(modelValue), { ...updatedItem }]);
    };

    const deleteCurrentItem = () => {
        emits('update:modelValue', unref(modelValue).filter((item) => item.index !== unref(currentItem).index));
    };

    const checkboxModel = computed({
        get: () => !!unref(modelValue).find((item) => item.index === unref(currentItem).index),
        set: (value: boolean) => {
            if (value) {
                addCurrentItem();
            } else {
                deleteCurrentItem();
            }
        },
    });

</script>

<template>
    <div class="item">
        <CheckBox v-model="checkboxModel">
            Item {{ currentItem.index + 1 }}
        </CheckBox>
        <div class="item__wrapper">
            <InputCount v-model="colorCountModel"></InputCount>
            <InputColor v-model="colorModel"></InputColor>
        </div>
    </div>
</template>

<style lang="scss">
.item {
    display: flex;
    align-items: center;

    &__wrapper {
        display: flex;
    }
}
</style>