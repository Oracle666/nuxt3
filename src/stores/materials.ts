import { defineStore } from 'pinia';
import type Material from '~/types/material';

export const useMaterialsStore = defineStore('materialsStore', () => {
  const materials: Ref<Array<Material>> = ref([]);

  async function fetchMaterials() {
    materials.value = await $fetch('materials.json');
  }

  return {
    materials,
    fetchMaterials
  }
});