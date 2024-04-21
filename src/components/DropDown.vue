<script setup lang="ts">
    import { ref } from 'vue';

    const isOpen = ref(false);
</script>

<template>
    <div class="dropdown">
        <div class="dropdown__container">
            <div class="dropdown__arrow-container">
                <div class="dropdown__arrow dropdown__arrow_close"
                     :class="{ 'dropdown__arrow_open': isOpen }"
                     @click="isOpen = !isOpen"
                     @keypress.enter="isOpen = !isOpen">
                </div>
            </div>
            <div>
                <slot name="right-arrow"></slot>
            </div>
        </div>
        <div class="dropdown__menu">
            <slot name="menu-name"></slot>
            <div v-show="isOpen">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.dropdown {
    display: flex;
    align-items: flex-start;
    grid-gap: 8px;
    height: 100%;

    &__arrow-container {
        padding-right: 4px;
        height: 100%;
        display: flex;
    }

    &__arrow {
        width: 12px;
        height: 12px;
        border-top: 1px solid black;
        border-right: 1px solid black;
        cursor: pointer;
    }

    &__arrow_close {
        transform: rotate(45deg);
        transform-origin: left;
    }

    &__arrow_open {
        transform: rotate(135deg);
        transform-origin: center;
    }

    &__container {
        display: inline-flex;
        align-items: flex-start;
        grid-gap: 8px;
        height: 100%;
    }
}
</style>