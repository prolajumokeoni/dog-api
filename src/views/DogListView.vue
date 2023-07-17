<template>
  <div class="home">
    <nav>
      <img :src="logo" alt="logo" class="logo" />
      <h1>FIND YOUR DOG BREED!</h1>
    </nav>
    <DogList />
  </div>
</template>

<script>
import DogList from '@/components/DogList.vue'
import logo from '@/assets/logo.svg'
export default {
  name: 'HomeView',
  components: {
    DogList
  },data() {
    return {
      logo: logo,
    };
  }
}
</script>


<style>
nav {
  display: flex;
  justify-content: center;
  align-items: center;
}
.logo {
  width: 50px;
  height: 50px;
}
h1 {
  color: #12a1cf;
  text-align: center;
  margin: 20px;
  font-size: 50px;
  font-family: 'Chicle', cursive;
}

</style>