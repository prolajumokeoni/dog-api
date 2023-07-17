<template>
  <div class="dog-container">
    <input v-model="searchTerm" type="search" placeholder="Search by Breed name" />

    <div v-if="!loading">
      <div class="dog-list">
        <div v-for="(breed, index) in filteredDogData" :key="index" class="dog-item">
          <router-link :to="`/dog/${breed.name}`">
            <div class="dog-image-container">
              <img :src="breed.image" :alt="breed.name" class="dog-image" />
              <div class="breed-name">{{ breed.name }}</div> <!-- Display breed name on the image -->
            </div>
          </router-link>
        </div>
      </div>
      <div v-if="filteredDogData.length === 0">
        <h3>No dog with this breed name found.</h3>
      </div>
    </div>

    <div class="loader-container" v-else>
      <div class="loader"></div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
export default {
  setup() {
    const store = useStore();
    const searchTerm = ref('');

    onMounted(() => {
      store.dispatch('fetchDogData');
    });

    const dogData = computed(() => store.getters.getDogData);
    const loading = computed(() => store.getters.isLoading);

    const filteredDogData = computed(() => {
      if (!searchTerm.value) {
        return dogData.value;
      }

      return dogData.value.filter((breed) =>
        breed.name.toLowerCase().includes(searchTerm.value.toLowerCase())
      );
    });

    return {
      searchTerm,
      filteredDogData,
      loading
    };
  }
};
</script>

<style>
.dog-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.dog-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.dog-item {
  width: 200px;
  margin: 10px;
  text-align: center;
}

.dog-image-container {
  position: relative; 
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.dog-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.breed-name {
  position: absolute;
  bottom: 10px; 
  left: 10px; 
  padding: 5px;
  background-color: rgba(0, 0, 0, 0.7); 
  color: #12a1cf; 
  font-size: 30px;
  font-family: 'Chicle', cursive;
}

input {
  height: 50px;
  width: 400px;
  border: none;
  margin: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.input-btn {
  border: none;
  height: 50px;
}

input:focus {
  outline: none !important;
  border: 1px solid #12a1cf;
}

.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20vh;
}

.loader {
  border: 4px solid rgba(0, 0, 0, 0.3);
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
