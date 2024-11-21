<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

router.push('/estates')
</script>

<template>
  <main>
    <RouterView />
  </main>
</template>
