<template>
  <div class="home">
    <h1>Dog API</h1>
    <DogList />
  </div>
</template>

<script>
import DogList from '@/components/DogList.vue'

export default {
  name: 'HomeView',
  components: {
    DogList
  }
}
</script>
