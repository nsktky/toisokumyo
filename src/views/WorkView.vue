
<template>
  <v-app id="inspire" class="work">
    <v-main class="grey lighten-3">
      <v-container>
        <v-row justify="center" align-content="center">
            <!-- v-forでimagesの各要素をitemに格納 -->
          <v-col
            v-for="item in images" :key="item.src"
          >
            <v-card  height="80vh">
                <!-- itemsから表示するデータを取り出す -->
                <a v-bind:href="item.link">
                  <v-img :src="item" height="80vh"></v-img>
                </a>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  export default {
      data: () => ({
    //   画像のpath,タイトル,NEORTのリンク.画像はassetsに格納しているためsrcにrequire()で渡す.
      images: [
        {src: require('@/assets/images/art1.jpg'),
         title: 'フレームワーク',
         link: 'https://neort.io/art/cbd87g43p9f2v73urnfg?index=0&origin=user_profile'},
        {src: require('@/assets/images/art2.jpg'),
         title: '規定',
         link: 'https://neort.io/art/cb8k5p43p9f2v73ur4lg?index=7&origin=user_profile'},
        {src: require('@/assets/images/art3.jpg'),
         title: 'REM',
         link: 'https://neort.io/art/c6o9dl43p9f1mfrqjvpg?index=228&origin=user_profile'},
        
      ]
    }),
  }
</script>

<style>
.work{
  height: 90vh;
  width: 100%;
  margin-top: 1rem;
  padding: auto;
  position: absolute;
}
.frame {
  margin: 0 auto;
  margin-top: 1rem
}
</style>