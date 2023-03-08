<template>
  <div id="lxd_paipai">
    <Nav />
    <CenterBD class="centerBD" />
  </div>
</template>

<script>
import Nav from "@/components/Nav"
import CenterBD from "@/components/CenterBD"
export default {
  name: 'Lxd_ΠΠ_Website',
  components: {
    Nav,
    CenterBD,
  }
}
</script>

<style scoped lang="css">
  #lxd_paipai{
    width: 100vw;
    height: 100vh;
    background-color: #000000;
  }
  .centerBD{
    margin-top:40px
  }
</style>
