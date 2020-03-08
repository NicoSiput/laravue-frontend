<template>
  <div class="home">
    <HeaderNico />
    <HeroSlider />
    <WomenBanner />
    <InstaNico />
    <PartnerNico />
    <FooterNico />
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import HeaderNico from "@/components/HeaderNico.vue";
import HeroSlider from "@/components/HeroSlider.vue";
import WomenBanner from "@/components/WomenBanner.vue";
import InstaNico from "@/components/InstaNico.vue";
import PartnerNico from "@/components/PartnerNico.vue";
import FooterNico from "@/components/FooterNico.vue";

export default {
  name: "Home",
  components: {
    HeaderNico,
    HeroSlider,
    WomenBanner,
    InstaNico,
    PartnerNico,
    FooterNico
  }
};
</script>
