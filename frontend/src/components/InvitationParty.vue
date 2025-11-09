<template>
  <div></div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { api } from '@/common/api'
import { useRoute } from 'vue-router'

const route = useRoute()

onMounted(() => {
  console.log('Hola')

  api.get(`/party/invitation/${route.params.id}`).then((response) => {
    console.log(response.data)
  })
})
</script>
