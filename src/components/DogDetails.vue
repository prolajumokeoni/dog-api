<template>
  <div v-if="loading" class="loader-container">
    <div class="loader"></div>
  </div>
  <main v-else>
    <h1>{{ breed }}</h1>
    
    <img :src="getTransformedUrl(dogData.image, selectedFilter)" :alt="breed" class="details-image"/>
    
    <div>
      <button @click="applyFilter('cartoonify')">Cartoonify</button>
      <button @click="applyFilter('grayscale')">Grayscale</button>
      <button @click="applyFilter('sepia')">Sepia</button>
      <button @click="resetFilter">Reset</button>
    </div>
  </main>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    const route = useRoute();
    const breed = route.params.breed;
    const selectedFilter = ref(null); 

    onMounted(() => {
      store.dispatch('fetchDogData');
    });

    const dogData = computed(() => {
      const dogs = store.getters.getDogData;
      return dogs.find((dog) => dog.name === breed) || null;
    });

    const loading = computed(() => store.getters.isLoading);

    const cloudinaryConfig = {
      cloudName: 'dfum4zfrp',
      transformations: {
        cartoonify: 'e_cartoonify',
        grayscale: 'e_grayscale',
        sepia: 'e_sepia',
      },
    };

    const getTransformedUrl = (imageUrl, filter) => {
      if (filter && cloudinaryConfig.transformations[filter]) {
        return `https://res.cloudinary.com/${cloudinaryConfig.cloudName}/image/upload/${cloudinaryConfig.transformations[filter]}/${imageUrl}`;
      } else {
        return imageUrl;
      }
    };

    const applyFilter = (filter) => {
      selectedFilter.value = filter;
    };

    const resetFilter = () => {
      selectedFilter.value = null;
    };

    return {
      breed,
      dogData,
      loading,
      selectedFilter,
      getTransformedUrl,
      applyFilter,
      resetFilter,
    };
  },
};
</script>

<style>
main {
  margin: 0 auto;
  width: 30%;
}
.details-image {
  height: 350px;
  width: 500px;
}
Button {
  background-color:  #008CBA;
  border: none;
  color: white;
  padding: 15px 30px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  margin: 4px 5px;
  cursor: pointer;
  font-size: 16px;
  font-family: 'Chicle', cursive;

}
</style>
