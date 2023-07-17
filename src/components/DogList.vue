<template>
  <div class="dog-container">
    <input v-model="searchTerm" type="search" placeholder="Search by Breed name" />

    <div v-if="!loading">
      <div class="dog-list">
        <div v-for="(breed, index) in filteredDogData" :key="index" class="dog-item">
          <router-link :to="`/dog/${breed.name}`">
            <div class="dog-image-container">
              <img :src="breed.image" :alt="breed.name" class="dog-image" />
            </div>
            <span>{{ breed.name }}</span>
          </router-link>
        </div>
      </div>
      <div v-if="filteredDogData.length === 0">
        <h3>No dog with this breed name found.</h3>
      </div>
    </div>

    <div v-else>
      Loading...
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
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.dog-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
