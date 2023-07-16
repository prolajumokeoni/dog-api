<template>
  <div class="home">
   <DogDetails />
  </div>
</template>

<script>
import DogDetails from '@/components/DogDetails.vue'

export default {
  name: 'details',
  components: {
    DogDetails,
  }
}
</script>
