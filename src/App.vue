<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view/>
</template>
<script setup>
// import { login } from '@/api/try.js'
import { onMounted } from 'vue'
onMounted(()=>{
  // login();
})
</script>
<style>

</style>
