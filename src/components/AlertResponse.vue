<template>
  <div
    v-show="statusShowAlert"
    class="alert-settings"
  >
    <div v-if="alertStatus.status === 200">
      <v-alert
        title="Выполнено"
        type="success"
      />
    </div>
    <div v-else-if="alertStatus.status === 404">
      <v-alert
        title="Ошибка, повторите попытку позже"
        type="error"
      />
    </div>
    <div v-else>
      <v-alert
        title="Ошибка сервера"
        type="error"
      />
    </div>
  </div>

</template>
<script setup>
import { ref, watch } from 'vue'

const statusShowAlert = ref(false)

const props = defineProps({
  alertStatus: {
    type: Object,
  }
})

watch(props, () => {
  statusShowAlert.value = true
  setTimeout(()=>{
    statusShowAlert.value = false
  },2000)
})

</script>
<style lang="scss">
.alert-settings{
  position: fixed;
  left: 50%;
  top: 5%;
  transform: translate(-50%, 0);
  z-index: 20
}
</style>