<script lang="ts" setup>
    import {
        toRefs, unref, computed,
    } from 'vue';
    import CheckBox from './CheckBox.vue';
    import InputColor from './InputColor.vue';
    import InputCount from './InputCount.vue';
    import { IItem } from '../types/index';

    interface IProps {
        modelValue: string[],
        updatedItems: IItem[],
        currentItem: IItem,
        index: number;
    }

    interface IEmits {
        (u: 'update:modelValue', value: string[]): void
        (u: 'update:updatedItems', value: IItem[]): void
    }

    const props = defineProps<IProps>();
    const { modelValue, currentItem, updatedItems } = toRefs(props);

    const emits = defineEmits<IEmits>();

    const isCurrentItemChecked = computed(() => !!unref(modelValue).find((id) => id === unref(currentItem).index));
    const updatedColorItem = computed(() => unref(updatedItems).find((item) => item.index === unref(currentItem).index));

    const colorModel = computed({
        get: () => unref(updatedColorItem)?.color || '',
        set: (value: string) => {
            const updatedItem = unref(updatedColorItem);
            if (updatedItem) {
                const newItems = updatedItems.value.filter((updateItem) => updateItem.index !== unref(updatedColorItem)?.index);
                emits('update:updatedItems', [...newItems, { ...updatedItem, color: value }]);
            } else {
                emits('update:updatedItems', [...unref(updatedItems), { ...unref(currentItem), color: value }]);
            }
        },
    });

    const colorCountModel = computed({
        get: () => unref(updatedColorItem)?.countColor || 0,
        set: (value: number) => {
            const updatedItem = unref(updatedColorItem);
            if (updatedItem) {
                const newItems = updatedItems.value.filter((updateItem) => updateItem.index !== unref(updatedColorItem)?.index);
                emits('update:updatedItems', [...newItems, { ...updatedItem, countColor: value }]);
            } else {
                emits('update:updatedItems', [...unref(updatedItems), { ...unref(currentItem), countColor: value }]);
            }
        },
    });

    const addCurrentItem = () => {
        emits('update:modelValue', [...unref(modelValue), unref(currentItem).index]);
    };

    const deleteCurrentItem = () => {
        emits('update:modelValue', unref(modelValue).filter((id) => id !== unref(currentItem).index));
    };

    const checkboxModel = computed({
        get: () => unref(isCurrentItemChecked),
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
            Item {{ index + 1 }}
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