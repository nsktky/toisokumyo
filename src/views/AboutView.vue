<template>
  <v-card
    class="about"
    color="#ffffff80"
    align-content="center"
  >
    <v-container>
      <v-row dense>
        <v-col cols="12" v-for="item in profile" :key="item.id">
          <v-card
            color="#385F73"
            dark
          >
            <v-card-title class="text-h5">
              {{ item.title }}
            </v-card-title>
            <v-card-subtitle>
              {{ item.text }}
            </v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
  export default {
      data: () => ({
      profile: [
        {id: 1,
          title: 'Name',
          text: 'Ayame takuya（文目卓弥）',},
        {id: 2,
          title: 'Profile',
          text: `GenerativeArtist, \n
                  actor/飛ぶ劇場, \n
                  Stuffed Artists`,},
        {id: 3,
          title: 'Skill',
          text: `p5.js, \n
                  creativecoding, \n
                  generativeart, \n
                  vue.js, \n
                  vuetify, \n
                  Vue Router, \n
                  firebase, \n
                  動画制作`,},
      ]
    }),
  }
</script>

<style>
.about {
  width: 100%;
  margin: 3rem auto;
  padding: 0 auto;
  position: absolute;
  white-space: pre-line;
}
</style>
