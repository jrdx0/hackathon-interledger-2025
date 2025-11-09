<template>
  <AuthLayout>
    <div class="bg-white max-w-[700px] min-w-[400px] rounded-2xl shadow-lg p-6">
      <div>
        <h1 class="text-[10px] text-center font-bold py-7 text-gray-700">
          UNDEFINED - COMMUNITY TECH
        </h1>
      </div>

      <h2 class="text-center text-[32px] font-bold text-[#23988c] leading-tight">
        Welcome
      </h2>
      <h3 class="text-center text-gray-500 text-[14px] mb-6">
        Sign in to continue
      </h3>
      <LoginForm />
    </div>

  </AuthLayout>
</template>

<script setup lang="ts">
import AuthLayout from '../components/AuthLayout.vue'
import LoginForm from '../components/LoginForm.vue'
</script>
