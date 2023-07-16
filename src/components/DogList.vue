<template>
  <div class="dog-container">
    <ul v-if="!loading" class="dog-list" ref="dogList">
      <li v-for="(breed, index) in dogData" :key="index" class="dog-item">
        <router-link :to="`/dog/${breed.name}`">
          <div class="dog-image-container">
            <img :src="breed.image" :alt="breed.name" class="dog-image" />
          </div>
          <span>{{ breed.name }}</span>
        </router-link>
      </li>
    </ul>
    <div v-else>
      Loading...
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();

    onMounted(() => {
      store.dispatch('fetchDogData');
    });

    const dogData = computed(() => store.getters.getDogData);
    const loading = computed(() => store.getters.isLoading);

    return {
      dogData,
      loading
    };
  }
};
</script>
<style>
.dog-container {
  display: flex;
  justify-content: center;
}

.dog-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.dog-item {
  width: 20%;
  max-width: 200px;
  margin: 10px;
  text-align: center;
}

.dog-image-container {
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  position: relative;
  overflow: hidden;
}

.dog-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>

