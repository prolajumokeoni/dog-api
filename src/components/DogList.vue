<template>
  <div class="dog-container">
    <ul v-if="!loading" class="dog-list" ref="dogList">
      <li v-for="(breed, index) in dogData" :key="index" class="dog-item">
        <router-link :to="`/dog/${breed.name}`">
          <div class="dog-image-container">
            <img :src="breed.image" :alt="breed.name" ref="dogImages" class="dog-image" />
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

    onMounted(() => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            observer.unobserve(img);
          }
        });
      });

      const dogImages = Array.from(document.querySelectorAll('[ref="dogImages"]'));
      dogImages.forEach((img) => {
        observer.observe(img);
      });
    });

    return {
      dogData,
      loading
    };
  }
};
</script>
