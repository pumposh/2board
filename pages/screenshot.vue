<template>
  <div>
    <h1>Screenshot Test</h1>
    <input v-model="url" placeholder="Enter URL to screenshot" />
    <button @click="takeScreenshot">Take Screenshot</button>
    <img v-if="fileUrl" :src="fileUrl" alt="Screenshot" />
    <Chat />
  </div>
</template>

<script setup lang="ts">
import { useFetch } from "nuxt/app";
import { ref, computed } from "vue";
import Chat from "../components/chat.vue";
const url = ref("https://www.google.com");
const file = ref<File | null>(null);
const fileUrl = computed(() =>
  file.value ? URL.createObjectURL(file.value) : null
);

const takeScreenshot = async () => {
  if (!url.value) return;
  useFetch(`/api/screenshot`, {
    query: { url: url.value },
    onRequestError: (error) => {
      console.error("Request Error:", error);
    },
    onResponseError: (error) => {
      console.error("Response Error:", error);
    },
    onResponse: (response) => {
      const blob = response.response._data;
      blob.fileName = "screenshot.png";
      blob.lastModifiedDate = Date.now();
      blob.contentType = "image/png";
      file.value = blob;
    },
  });
};
</script>

<style scoped lang="scss">
img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
