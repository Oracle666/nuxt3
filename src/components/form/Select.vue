<script setup lang="ts">
interface Select {
  label: string,
  placeholder: string,
  options: Array<{
    name: string,
    id: string
  }>
}

const model = defineModel<null | string>({ required: true });
const open: Ref<boolean> = ref(false);
const select = ref();

const props = defineProps<Select>();

const currentValue = computed(() => {
  if (model.value) {
    return props.options.find(el => el.id === model.value)!.name;
  } else {
    return props.placeholder
  }
});

const clickOption = (id: string) => {
  if (model.value === id) {
    model.value = null;
  } else {
    model.value = id;
  }
  open.value = false;
};

onClickOutside(select, () => open.value = false);
</script>

<template>
  <div 
    ref="select"
    class="select"
  >
    <div class="select__label">{{ props.label }}</div>
    <div 
      class="select__content"
      @click.stop="open = !open"
    >
      <div class="select__value">{{ currentValue }}</div>
      <SvgChevron 
        class="select__icon" 
        :class="{ 'open' : open }"
      /> 
    </div>
    <Transition>
      <ul 
        v-show="open"
        class="select__list"
      >
        <li 
          v-for="option in props.options" 
          class="select__item"
          @click="clickOption(option.id)"
        >
          {{ option.name}}
        </li>
      </ul>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.select {
  max-width: 288px;
  width: 100%;
  position: relative;

  &__label {
    font-size: 12px;
    line-height: 150%;
    color: #4F4F4F;
    margin-bottom: 6px;
    padding-left: 16px;
  }
  &__content {
    height: 40px;
    background-color: #F2F2F2;
    padding: 0 16px;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  &__value {
    flex-grow: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 100%;
  }
  &__value, &__list {
    font-size: 14px;
    line-height: 150%;
  }
  &__list {
    position: absolute;
    top: calc(100% + 2px);
    left: 0;
    width: 100%;
    background-color: #F2F2F2;
    z-index: 1;
  }
  &__item {
    padding: 5px 16px;
    cursor: pointer;
  }
  &__icon {
    flex-shrink: 0;
    margin-left: auto;
    width: 24px;
    transition: transform .2s ease-in-out;
    transform: rotate(0);

    &.open {
      transform: rotate(180deg);
    }
  }
}
</style>