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
      :loading="loading"
      buttonIcon="fa-solid fa-window-restore"
      @submit="takeScreenshot"
    />
    <div class="Screenshot__image" ref="imageContainer">
      <!-- <img v-if="fileUrl" :src="fileUrl" alt="Screenshot" /> -->
    </div>
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

useHead({
  title: '2Board - Screenshot',
  meta: [
    { name: 'description', content: 'Take a screenshot of a website.' },
  ],
})

useSeoMeta({
  title: 'Screenshot',
  description: 'Take a screenshot of a website.',
})

const url = ref("https://www.google.com");
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
  const response = await $fetch(`/api/screenshot`, {
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
      console.log("blob:", blob);
      file.value = file.value ?? new File([blob], "screenshot.png", { type: "image/png" });
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
