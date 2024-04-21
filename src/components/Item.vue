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
        currentItem: IItem
    }

    interface IEmits {
        (u: 'update:modelValue', value: IItem[]): void
        (u: 'changeColor', value: IItem[]): void
        (u: 'changeColorCount', value: IItem[]): void
    }

    const props = defineProps<IProps>();
    const { modelValue, currentItem } = toRefs(props);

    const emits = defineEmits<IEmits>();

    const iconSquareModel = ref(unref(currentItem).color);

    const inputCountModel = ref(unref(currentItem).countColor);

    const addCurrentItem = () => {
        emits('update:modelValue', [...unref(modelValue), { ...unref(currentItem), color: unref(iconSquareModel), countColor: unref(inputCountModel) }]);
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

    watch(inputCountModel, (value) => {
        emits('changeColorCount', { ...unref(currentItem), countColor: value });
    });

    watch(iconSquareModel, (value) => {
        emits('changeColor', { ...unref(currentItem), color: value });
    });

</script>

<template>
    <div class="item">
        <CheckBox v-model="checkboxModel">
            Item {{ currentItem.index + 1 }}
        </CheckBox>
        <div class="item__wrapper">
            <InputCount v-model="inputCountModel"></InputCount>
            <InputColor v-model="iconSquareModel"></InputColor>
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