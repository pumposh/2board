<template>
  <div class="table-container">
    <div class="header">
      <div>
        <h2 class="header-title">Recent Users</h2>
        <p class="header-info">
          Fetched {{ users?.length }} users in {{ duration }}ms
        </p>
      </div>
      <button class="refresh-button" @click="refreshPage">
        Refresh Page
      </button>
    </div>
    <div>
      <div
        v-for="user in users"
        :key="user.id"
        class="user-row"
      >
        <div class="user-info">
          <img
            :src="user.image"
            :alt="user.name"
            class="user-image"
          />
          <div>
            <p class="user-name">{{ user?.name }}</p>
            <p class="user-email">{{ user?.email }}</p>
          </div>
        </div>
        <p class="user-time">{{ timeAgo(user?.createdAt) }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '~/assets/scss/Table.scss';
</style>

<script>
export default {
  props: {
    users: {
      type: Array,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
  },
  methods: {
    timeAgo(timestamp) {
      if (!timestamp) return 'never';
      return `${ms(Date.now() - new Date(timestamp).getTime())} ago`;
    },
    refreshPage() {
      location.reload();
    },
  },
}
</script>