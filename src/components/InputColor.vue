<script lang="ts" setup>
    import { toRefs, unref, watch } from 'vue';

    interface IProps {
        modelValue: string
    }

    interface IEmits {
        (u: 'update:modelValue', value: string): void
    }

    const props = withDefaults(defineProps<IProps>(), {
        modelValue: 'red',
    });
    const { modelValue } = toRefs(props);

    const emits = defineEmits<IEmits>();

    const updateColor = (event: any) => {
        emits('update:modelValue', event.target.value);
    };

</script>

<template>
    <label class="input-color">
        <div class="input-color__real" :style="{ 'background-color': modelValue || 'black' }">

        </div>
        <input class="input-color__input" :value="modelValue" @change="updateColor" type="color">
    </label>
</template>

<style lang="scss">
.input-color {
    display: inline-block;
    width: 18px;
    height: 18px;
    cursor: pointer;

    &__input {
        display: none;
    }

    &__real {
        width: 100%;
        height: 100%;
    }
}
</style>