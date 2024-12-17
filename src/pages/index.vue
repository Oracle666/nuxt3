<script setup lang="ts">
import type { Reactive } from 'vue';
import type Item from '~/types/item';

interface Form {
  price: {
    value: string | null,
    options: Array<{ name: string, id: string }>
  },
  material: {
    value: string | null,
    options: Array<{ name: string, id: string }>
  },
}

const catalogStore = useCatalogStore();
const materialsStore = useMaterialsStore();

const items: Ref<Array<Item>> = ref([]);
const form: Reactive<Form> = reactive({
  price: {
    value: null,
    options: [
      { name: 'Цена по возрастанию', id: '1' },
      { name: 'Цена по убыванию', id: '2' },
    ]
  },
  material: {
    value: null,
    options: []
  }
});

onMounted(async () => {
  await catalogStore.fetchItems();
  await materialsStore.fetchMaterials();
  form.material.options = materialsStore.materials;
  items.value = catalogStore.items;
  items.value.forEach(item => {
    item.addedToCart = detectValueInStorage('cart', item.id, true);
    item.addedToFavorite = detectValueInStorage('favorite', item.id, true)
  })
})

watch(
  () => form.price.value,
  (newValue) => {
    if (newValue) {
      if (newValue === '1') {
        items.value = sortByPrice(catalogStore.items, true)
      } else {
        items.value = sortByPrice(catalogStore.items)
      }
    } else {
      items.value = catalogStore.items;
    }
  }
)

const clickCart = (item: Item) => {
  toggleStorage(item.id, 'cart');
  item.addedToCart = detectValueInStorage('cart', item.id, true);
};

const clickFavorite = (item: Item) => {
  toggleStorage(item.id, 'favorite');
  item.addedToFavorite = detectValueInStorage('favorite', item.id, true);
};
</script>

<template>
  <h1 class="title">Комплекты стеллажных систем</h1>
  <div class="filter">
    <FormSelect
      v-model="form.price.value"
      :options="form.price.options"
      label="Сортировать по:" 
      placeholder="Выберите значение" 
    />
    <FormSelect 
      v-model="form.material.value"
      :options="form.material.options"
      label="Материал" 
      placeholder="Выберите значение"
    />
  </div>
  <div 
    v-show="items.length"
    class="items-grid"
  >
    <div 
      v-for="item in items"
      class="items-grid__item"
      :class="{ 'items-grid__item--hidden' : form.material.value && form.material.value !== String(item.material) }"
    >
      <img 
        :src="item.image.url" 
        :alt="item.name" 
        loading="lazy"
        class="items-grid__item-img"
      >
      <div class="items-grid__item-content">
        <span v-if="item.code" class="items-grid__item-code">
          {{ item.code }}
        </span>
        <span class="items-grid__item-name">{{ item.name }}</span>
        <div class="items-grid__item-footer">
          <div class="items-grid__item-prices">
            <span 
              v-if="item.price.old_price"
              class="items-grid__item-price items-grid__item-price--old"
            >
              {{ item.price.old_price }}₽
            </span>
            <span class="items-grid__item-price items-grid__item-price--new">
              {{ item.price.current_price }}₽
            </span>
          </div>
          <div class="items-grid__item-actions">
            <div 
              class="items-grid__item-cart"
              @click="clickCart(item)"
            >
              <SvgCart v-if="!item.addedToCart" />
              <SvgSuccess v-else />
            </div>
            <div 
              class="items-grid__item-favorites"
              @click="clickFavorite(item)"
            >
              <SvgFavorites v-if="!item.addedToFavorite" />
              <SvgSuccess v-else />
            </div>
          </div>
        </div>
      </div>
      <div class="items-grid__item-sale">Скидка</div>
    </div>
  </div>

</template>

<style scoped lang="scss">
.title {
  font-weight: 600;
  font-size: 36px;
  line-height: 133%;
  color: #000;
  margin: 32px 0;
}

.filter {
  display: flex;
  gap: 24px;

  @media (max-width: 767px) {
    flex-direction: column;
  }
}

.items-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  row-gap: 40px;
  column-gap: 48px;
  margin-top: 41px;

  @media (max-width: 1023px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 767px) {
    grid-template-columns: repeat(1, 1fr);
  }

  &__item {
    border: 1px solid #eee;
    display: flex;
    flex-direction: column;
    position: relative;

    &--hidden {
      display: none;
    }
    &-img {
      aspect-ratio: 1/1;
      margin: 9px auto 23px;
    }
    &-content {
      padding: 0 12px 10px;
      display: flex;
      flex-direction: column;
      margin-top: auto;
    }
    &-code {
      color: #888;
      font-size: 10px;
      line-height: 140%;
      margin-bottom: 6px;
    }
    &-name {
      font-weight: 500;
      font-size: 16px;
      line-height: 140%;
      margin-bottom: 8px;
    }
    &-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
    }
    &-prices {
      display: flex;
      gap: 10px;
    }
    &-price {
      font-size: 16px;
      line-height: 140%;

      &--old {
        text-decoration: line-through;
        color: #888;
      }
    }
    &-actions {
      display: flex;
      gap: 25px;
    }
    &-favorites, &-cart {
      width: 20px;
      height: 20px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        width: 20px;
      }
    }
    &-sale {
      position: absolute;
      top: 8px;
      left: 0;
      color: #fff;
      font-size: 14px;
      line-height: 130%;
      background-color: #eb5757;
      padding: 3px 16px;
    }
  }
}
</style>
