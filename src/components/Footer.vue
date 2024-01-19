<script setup>

</script>

<template>
  <div class="container_footer">

  </div>
</template>

<style scoped>
.container_footer {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100px;
    bottom: 0;
    background: #FFBA53;
}

@media (max-width: 768px) {
    .container_footer {
        width: 100%;
        height: 70px;
    }
}
</style>