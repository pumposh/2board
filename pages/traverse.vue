<template>
  <div>
    <h3>
      <i class="fa-solid fa-camera"></i>
      Traverse
    </h3>
    <div class="Screenshot__image-container" ref="imageContainer">
    </div>
    <UiTwoInput
      v-model="url" 
      fullWidth
      placeholder="Enter URL to screenshot"
      :loading="loading"
      buttonIcon="fa-solid fa-chevron-right"
      @submit="takeScreenshot"
    />
    <Chat
      class="Screenshot__chat"
      :disabled="!fileUrl"
    />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  name: 'Traverse',
  navIcon: 'fa-solid fa-window-restore',
})

useHead({
  title: '2Board - Traverse',
  meta: [
    { name: 'description', content: 'Traverse the web with 2Board.' },
  ],
})

useSeoMeta({
  title: 'Traverse',
  description: 'Traverse the web with 2Board.',
})

const url = ref("https://www.evergy.com");
const loading = ref<boolean>(false);
const file = ref<File | null>(null);
const fileUrl = computed(() =>
  file.value ? (URL || webkitURL).createObjectURL(file.value) : null
);

const imageContainer = ref<HTMLDivElement | null>(null);

watch(fileUrl, (newUrl) => {
  console.log("fileUrl changed:", newUrl);
});

const takeScreenshot = async () => {
  if (!url.value) return;
  loading.value = true;
  await $fetch(`/api/screenshot`, {
    query: { url: url.value },
    responseType: 'blob',
    onRequestError: (error) => {
      console.error("Request Error:", error);
    },
    onResponseError: (error) => {
      console.error("Response Error:", error);
    },
    onResponse: (response) => {
      const blob = response.response._data;
      file.value = new File([blob], "screenshot.png", { type: "image/png" });
      // Create a download link for the screenshot
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(file.value);
      downloadLink.download = 'screenshot.png';
      
      // Trigger the download
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      // Clean up the object URL
      URL.revokeObjectURL(downloadLink.href);
      const image = new Image();
      image.src = URL.createObjectURL(file.value);
      image.style.width = '-webkit-fill-available';
      image.style.borderRadius = '0 0 var(--tb-border-radius) var(--tb-border-radius)';
      // image.style.objectFit = 'contain';
      image.onload = () => {
        loading.value = false;
      };
      imageContainer.value?.appendChild(image);
    },
  });
  loading.value = false;
};
</script>

<style scoped lang="scss">
.Screenshot__image-container {
  max-width: 100%;
  height: 30dvw;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  overflow: scroll;
  scrollbar-width: none;
  border-radius: var(--tb-border-radius);
  min-height: 200px;
  margin: 2rem 8px 1.5rem;
  outline: 8px solid var(--button-bg);
  background-color: var(--input-bg);
  transition: all 0.2s ease-in-out;
  &:not(:has(img)) {
    &:after {
      content: 'Perform a search to begin';
      text-align: center;
      height: 100%;
      margin: 0 50px;
      color: var(--input-color-placeholder);
      text-transform: uppercase;
      font-weight: 700;
      letter-spacing: 0.05em;
      opacity: 0.5;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
.Screenshot__chat {
  margin-top: 1rem;
}
</style>
