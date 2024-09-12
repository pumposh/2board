<template>
  <main class="main">
    <a href="https://vercel.com" class="deploy-button">
      Deploy your own to Vercel
    </a>
    <h1 class="title">Postgres on Vercel</h1>
    <Table :users="data?.users" :duration="data?.duration" />
    <div class="description">
      Simple hello world demo of
      <a href="https://vercel.com/postgres" class="vercel-link">
        Vercel Postgres
      </a>
      <div class="flex items-center justify-center my-2">
        <span>Built with</span>
        <a href="https://nuxt.com/docs" class="nuxt-link">
          <img src="/nuxt.svg" class="nuxt-logo" />
          <p>Nuxt</p>
        </a>
        .
      </div>
    </div>
    <div class="footer">
      <a href="https://vercel.com">
        <img
          src="/vercel.svg"
          alt="Vercel Logo"
          class="vercel-logo"
          width="100"
          height="24"
        />
      </a>
      <a
        href="https://github.com/vercel/examples/tree/main/storage/postgres-nuxt"
        class="source-link"
      >
        <img src="/github.svg" alt="GitHub Logo" class="github-logo" />
        <p class="source-text">Source</p>
      </a>
    </div>
  </main>
</template>

<style lang="scss">
@import '~/assets/scss/index.scss';
</style>

<script setup>
const { data } = useFetch('/api/get-users')
</script>
