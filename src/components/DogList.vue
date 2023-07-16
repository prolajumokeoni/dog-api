<template>
  <div>
    <ul v-if="!loading">
      <li v-for="(breed, index) in dogData" :key="index">
        <img :src="breed.image" :alt="breed.name" />
        <span>{{ breed.name }}</span>
      </li>
    </ul>
    <div v-else>
      Loading...
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const dogData = ref([]);
    const loading = ref(true);

    onMounted(async () => {
      try {
        const response = await fetch('https://dog.ceo/api/breeds/list/all');
        const responseData = await response.json();
        console.log(responseData)
        const breeds = Object.keys(responseData.message);

        const data = [];
        for (const breed of breeds) {
          const breedResponse = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
          const breedData = await breedResponse.json();
          const breedImage = breedData.message;

          data.push({ name: breed, image: breedImage });
        }

        dogData.value = data;
        loading.value = false;
      } catch (error) {
        console.error('Error fetching dog data:', error);
        loading.value = false;
      }
    });

    return {
      dogData,
      loading
    };
  }
};
</script>