<script lang="ts" setup>
    import {
        defineProps, toRefs, defineEmits, watch,
    } from 'vue';

    export interface IPropsCheckbox {
        modelValue: boolean,
        type?: 'square' | 'check'
    }
    interface IEmits {
        (u: 'update:modelValue', value: boolean): void
    }
    const props = withDefaults(defineProps<IPropsCheckbox>(), {
        type: 'check',
    });
    const { modelValue } = toRefs(props);

    const emits = defineEmits<IEmits>();

    const changeHandler = (event: any) => {
        emits('update:modelValue', event.target.checked);
    };

</script>

<template>
    <label class="check-box">
        <input class="check-box__input" type="checkbox" :checked="modelValue" @change="changeHandler">
        <div class="check-box__real" :class="`check-box__real_${type}`">
        </div>
        <slot></slot>
    </label>
</template>

<style lang="scss">
.check-box {
    display: inline-flex;
    cursor: pointer;
    align-items: center;
    grid-gap: 8px;

    &__real {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 18px;
        height: 18px;
        border: 1px solid black;
    }

    &__input {
        display: none;
    }

    &__input:checked+.check-box__real {
        &::after {
            position: absolute;
            display: inline-flex;
            align-items: center;
            justify-content: center;
        }
    }

    &__input:checked+.check-box__real_square {
        &::after {
            content: '';
            width: 8px;
            height: 8px;
            background-color: black;
        }
    }

    &__input:checked+.check-box__real_check {
        &::after {
            content: '\2713';
        }
    }
}
</style>