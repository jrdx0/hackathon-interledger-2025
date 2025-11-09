<template>
  <form @submit.prevent="onSubmit" class="form">
    <!-- Campos -->
    <TextInput v-model="email" label="Correo" placeholder="username" type="string" />
    <TextInput v-model="password" label="Contraseña" placeholder="********" type="password" />

    <!-- Botón principal -->
    <PrimaryButton>Iniciar Sesión</PrimaryButton>

    <!-- Enlaces inferiores -->
    <p style="text-align: center; margin-top: 10px">
      <a href="#" style="color: #555">¿Olvidaste tu contraseña?</a>
    </p>
    <p style="text-align: center; font-size: 14px; color: #666">
      ¿No tienes cuenta?
      <a href="#" style="color: #059669">Regístrate</a>
    </p>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TextInput from './TextInput.vue'
import PrimaryButton from './PrimaryButton.vue'
import { api } from '@/common/api'
import { useRouter } from 'vue-router'

const router = useRouter()

const email = ref('')
const password = ref('')

function onSubmit() {
  console.log(email.value, password.value)
  api
    .post('/login', {
      username: email.value,
      password: password.value,
    })
    .then((response) => {
      console.log(response)
      localStorage.setItem('SESSION_TOKEN', response.data.token)
      router.push({ name: 'TransferTransaction' })
    })
}

function loginWithGoogle() {
  console.log('Login con Google')
}

function loginWithFacebook() {
  console.log('Login con Facebook')
}
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
