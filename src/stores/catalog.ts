import { defineStore } from 'pinia';
import type Item from '~/types/item';

export const useCatalogStore = defineStore('catalogStore', () => {
  const items: Ref<Array<Item>> = ref([]);

  async function fetchItems() {
    items.value = await $fetch('items.json');
  }

  return {
    items,
    fetchItems,
  }
});