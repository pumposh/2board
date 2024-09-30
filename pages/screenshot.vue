<template>
  <div>
    <h3>
      <i class="fa-solid fa-camera"></i>
      Screenshot
    </h3>
    <UiTwoInput
      v-model="url" 
      fullWidth
      placeholder="Enter URL to screenshot"
      buttonIcon="fa-solid fa-window-restore"
      @submit="takeScreenshot"
    />
    <img v-if="fileUrl" :src="fileUrl" alt="Screenshot" />
    <Chat
      class="Screenshot__chat"
      :disabled="!fileUrl"
    />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  name: 'Screenshot',
  navIcon: 'fa-solid fa-window-restore',
})

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
      console.log(blob);
      file.value = blob;
    },
  });
};
</script>

<style scoped lang="scss">
img {
  width: 100%;
  height: 100%;
  border-radius: 0 0 var(--tb-border-radius) var(--tb-border-radius);
  object-fit: contain;
}
.Screenshot__chat {
  margin-top: 1rem;
}
</style>
