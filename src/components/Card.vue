<template>
  <div class="rounded overflow-hidden shadow-md">
    <div class="px-6 py-4">
      <div class="font-bold text-xl mb-3">{{ question }}</div>
      <p class="text-gray-700 text-lg mb-2">
        {{ $tc("poll.participants", users.length, { count: users.length }) }}
      </p>
      <p class="text-gray-700 text-base">{{ description }}</p>
    </div>
    <div class="flex justify-between flex-wrap px-6 py-4">
      <router-link
        v-if="users.includes(userId)"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full my-1 flex items-center justify-center"
        tag="button"
        :to="{
          name: isActive ? 'poll_show' : 'poll_result',
          params: { id: id }
        }"
      >
        <i class="material-icons mr-1">
          {{ isActive ? "how_to_vote" : "pie_chart" }}
        </i>
        {{ isActive ? $t("global.vote") : $t("global.results") }}
      </router-link>
      <button
        v-if="users.includes(userId)"
        class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded w-full my-1 flex items-center justify-center"
        @click.prevent="$emit('onShare', id)"
      >
        <i class="material-icons mr-1">share</i>
        {{ $t("global.share") }}
      </button>
      <button
        v-if="owner === userId"
        class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full my-1 flex items-center justify-center"
        @click.prevent="$emit('onToggleStatus', id)"
      >
        <i class="material-icons mr-1">lock_open</i>
        {{ isActive ? $t("global.close") : $t("global.reOpen") }}
      </button>

      <button
        v-if="users.includes(userId) === false"
        class="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded w-full my-1 flex items-center justify-center"
        @click.prevent="$emit('onJoin', id)"
      >
        <i class="material-icons mr-1">how_to_reg</i>
        {{ $t("global.join") }}
      </button>

      <button
        v-if="users.includes(userId) === true && owner !== userId"
        class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded w-full my-1 flex items-center justify-center"
        @click.prevent="$emit('onLeave', id)"
      >
        <i class="material-icons mr-1">remove_circle</i>
        {{ $t("global.leave") }}
      </button>

      <button
        v-if="owner === userId"
        class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full my-1 flex items-center justify-center"
        @click.prevent="$emit('onDelete', id)"
      >
        <i class="material-icons mr-1">delete</i>
        {{ $t("global.delete") }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    question: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    userId: {
      type: String,
      required: true
    },
    owner: {
      type: String,
      required: true
    },
    isActive: {
      type: Boolean,
      required: true
    },
    users: {
      type: Array,
      required: true
    }
  }
};
</script>

<style></style>
