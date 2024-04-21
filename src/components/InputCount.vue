<script lang="ts" setup>
    import { toRefs, unref, watch } from 'vue';

    interface IProps {
        modelValue: number
    }

    interface IEmits {
        (u: 'update:modelValue', value: number): void
    }

    const props = withDefaults(defineProps<IProps>(), {
        modelValue: 0,
    });
    const { modelValue } = toRefs(props);

    const emits = defineEmits<IEmits>();

    const changeHandler = (event: any) => {
        emits('update:modelValue', +event.target.value);
    };

</script>

<template>
    <label class="input-count">
        <input class="input-count__input" :value="modelValue" @change="changeHandler" type="number" min="0">
    </label>
</template>

<style lang="scss">
.input-count {
    display: inline-block;

    &__input {
        outline: none;
        text-align: right;
        margin: 0;
        border-width: 0;
    }
}
</style>