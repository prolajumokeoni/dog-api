<template>
  <div v-if="loading">Loading...</div>
  <div v-else>
    <h2>{{ breed }}</h2>
    <img :src="dogData.image" :alt="breed" />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    const breed = ref(route.params.breed);
    const dogData = ref(null);
    const loading = ref(true);

    onMounted(async () => {
      try {
        const breedResponse = await fetch(`https://dog.ceo/api/breed/${breed.value}/images/random`);
        const breedData = await breedResponse.json();
        const breedImage = breedData.message;

        dogData.value = { image: breedImage };
        loading.value = false;
      } catch (error) {
        console.error('Error fetching dog data:', error);
        loading.value = false;
      }
    });

    return {
      breed,
      dogData,
      loading
    };
  }
};
</script>