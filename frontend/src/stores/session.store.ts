import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useNavigatorStore = defineStore('navigatorStore', () => {
  const active = ref<boolean>(localStorage.getItem('sidebarActive') == 't')

  const nombre = ref<string>('')
  const apellidoPaterno = ref<string>('')
  const apellidoMaterno = ref<string>('')
  const email = ref<string>('')
  const permisos = ref<string[]>([])

  watch(active, (value) => {
    localStorage.setItem('sidebarActive', value ? 't' : 'f')
  })

  const hasPermission = (required: string[]): boolean => {
    if (permisos.value.includes('GLOBAL')) return true

    if (required.length == 0) return true

    return required.some((perm) => permisos.value.includes(perm))
  }

  return {
    active,
    nombre,
    apellidoPaterno,
    apellidoMaterno,
    email,
    permisos,
    hasPermission,
  }
})
