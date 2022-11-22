<script>
import NavbarScreen from "./components/NavbarScreen.vue";
import SideBarScreen from "./components/SidebarScreen.vue";
import FooterScreen from "./components/FooterScreen.vue";

export default {
  components: {
    NavbarScreen,
    SideBarScreen,
    FooterScreen,
  },
  data() {
    return {
      activeIndex: -1,
    };
  },
};
</script>

<template>
  <div class="w-full">
    <div class="flex flex-row">
      <div class="basis-1/12 relative z-30">
        <SideBarScreen v-model:activeIndex="activeIndex" />
      </div>
      <div class="basis-11/12 relative w-11/12">
        <div class="fixed top-0 right-0 bg-white my-4 mr-4 shadow-md rounded-md z-20" style="width: 89.666667%;">
          <NavbarScreen />
        </div>
        <div class="mr-3 ml-3.5 bg__light mt-24 shadow-xl rounded-md z-10" style="width: 97.666667%;">
          <RouterView></RouterView>
        </div>
        <div class="mr-3 ml-3.5 bg__light mt-4 shadow-xl rounded-md z-10" style="width: 97.666667%;">
          <FooterScreen />
        </div>
      </div>
    </div>
  </div>
</template>

<style>

</style>
