<template>
  <div class="App">
    <FirebaseVerification />
  </div>
</template>

<style lang="scss">
.App {
  overflow: hidden;
}
</style>

<script setup lang="ts">
definePageMeta({
  name: 'Home',
  navName: 'Home',
  navIcon: 'fa-solid fa-house',
})

onMounted(() => {
  const { $firebase } = useNuxtApp()
  console.log("Firebase app initialized:", $firebase.app)
  if ($firebase.analytics) {
    console.log("Firebase analytics initialized")
  } else {
    console.log("Firebase analytics not initialized (this is normal on server-side)")
  }
})
</script>