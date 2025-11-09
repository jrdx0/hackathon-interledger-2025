<template>
  <form @submit.prevent="onSubmit" class="form">
    <TextInput v-model="email" label="Correo" placeholder="TuCorreo@Gmail.com" type="email" />
    <TextInput v-model="password" label="Contraseña" placeholder="********" type="password" />

    <PrimaryButton>Iniciar Sesión</PrimaryButton>

    <SectionDivider label="Continuar con" />

    <SocialButton label="Google" @click="onSocial('Google')" />
    <SocialButton label="Facebook" @click="onSocial('Facebook')" />

    <p style="text-align:center; margin-top:10px;">
      <a href="#" style="color:#555;">¿Olvidaste tu contraseña?</a>
    </p>
    <p style="text-align:center; font-size:14px; color:#666;">
      ¿No tienes cuenta?
      <a href="#" style="color:#059669;">Regístrate</a>
    </p>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TextInput from './TextInput.vue'
import PrimaryButton from './PrimaryButton.vue'
import SectionDivider from './SectionDivider.vue'
import SocialButton from './SocialButton.vue'

const email = ref('')
const password = ref('')

function onSubmit() {
  console.log('Correo:', email.value)
  console.log('Contraseña:', password.value)
}

function onSocial(provider) {
  console.log('Login con', provider)
}
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
