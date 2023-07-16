<template>
  <div v-if="loading">Loading...</div>
  <div v-else>
    <h2>{{ breed }}</h2>
    <img :src="dogData.image" :alt="breed" />
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    const route = useRoute();
    const breed = route.params.breed;

    onMounted(() => {
      store.dispatch('fetchDogData');
    });

    const dogData = computed(() => {
      const dogs = store.getters.getDogData;
      return dogs.find((dog) => dog.name === breed) || null;
    });

    const loading = computed(() => store.getters.isLoading);

    return {
      breed,
      dogData,
      loading
    };
  }
};
</script>

 
