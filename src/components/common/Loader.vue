<template>
  <div class="loader">
    <div class="image_block">
      <img :src="getImg('wave.svg')" alt="" title="" class="img1" />
      <img :src="getImg('f.svg')" alt="" title="" class="img2" />
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    getImg() {
      return (src) => {
        if (src) {
          return require(`../../assets/images/${src}`);
        } 
       
      };
    },
  }
};
</script>

<style>
</style>