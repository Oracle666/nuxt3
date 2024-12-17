<script setup lang="ts"></script>

<template>
  <div class="breadcrumbs">
    <ul class="breadcrumbs-list">
      <li class="breadcrumbs-list__item">Главная</li>
      <li class="breadcrumbs-list__item">Система хранения</li>
      <li class="breadcrumbs-list__item">Комплекты стеллажных систем</li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.breadcrumbs {
  padding-top: 32px;

  &-list {
    display: flex;
    font-size: 16px;
    line-height: 100%;


    &__item {
      white-space: nowrap;

      &:not(:last-child) {
        color: #828282;
        &::after {
          content: '/';
          padding: 0 6px;
        }
      }

      &:not(:first-child) {
        @media (max-width: 767px) {
          display: none; 
        }
      }

      &:first-child {
        @media (max-width: 767px) {
          &::after {
            display: none;
          }
        }
      }
    }
  }
}
</style>