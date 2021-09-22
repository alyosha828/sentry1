<template>
  <v-app>

    <AppBar></AppBar>
    <NavigationDrawer></NavigationDrawer>
    <v-main>
      <v-container fluid>
        

        <router-view></router-view>
        <v-footer>
          Sentry 21.8.0.dev0

        </v-footer>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import NavigationDrawer from '@/components/NavigationDrawer'
import AppBar from '@/components/AppBar'
export default {
  name: 'App',
  components : {
    NavigationDrawer,
    AppBar,
  },

  data: () => ({
    //
  }),
};
</script>
