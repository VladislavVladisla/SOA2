<template>
  <v-app>
    <v-app-bar
      app
      color="black"
      dark
    >
      <div class="d-flex align-center">
        <span class="mr-2">Tarasenko Vladislav P34111</span>
      </div>

      <v-spacer></v-spacer>

<!--      <v-btn-->
<!--        href="https://vk.com/v_trsnk"-->
<!--        target="_blank"-->
<!--        text-->
<!--      >-->
<!--        <span class="mr-2">follow me</span>-->
<!--        <v-icon>mdi-open-in-new</v-icon>-->
<!--      </v-btn>-->
    </v-app-bar>

    <v-main style="background: black">
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
