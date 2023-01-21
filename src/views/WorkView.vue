
<template>
  <v-app id="inspire" class="work">
    <v-main class="grey lighten-3">
      <v-container>
        <v-col
          v-for="item in works" :key="item.src"
        >
          <v-card  height="80vh">
              <!-- itemsから表示するデータを取り出す -->
              <a v-bind:href="item.url">
                <v-img :src="item" height="80vh"></v-img>
              </a>
              {{ item.title }}
          </v-card>
        </v-col>
      </v-container>
      <div style="margin: 1rem" class="text-h5">
        <a href="https://neort.io/@IWD3ncMyhLhqMb7dInMwosr9Yw92">more</a>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import firebase from "@/firebase/firebase"
  export default {
      async created() {
        const workRef = firebase.firestore().collection("works")
        const snapshot = await workRef.get()
        console.log(snapshot)

        snapshot.forEach(doc => {
          console.log(doc.data())
          this.works.push(doc.data())
        })
      },
      data: () => ({
    //   画像のpath,タイトル,NEORTのリンク.画像はassetsに格納しているためsrcにrequire()で渡す.
      works: [
        // {src: require('@/assets/images/art1.jpg'),
        //  title: 'フレームワーク',
        //  url: 'https://neort.io/art/cbd87g43p9f2v73urnfg?index=0&origin=user_profile'},
        // {src: require('@/assets/images/art2.jpg'),
        //  title: '規定',
        //  url: 'https://neort.io/art/cb8k5p43p9f2v73ur4lg?index=7&origin=user_profile'},
        // {src: require('@/assets/images/art3.jpg'),
        //  title: 'REM',
        //  url: 'https://neort.io/art/c6o9dl43p9f1mfrqjvpg?index=228&origin=user_profile'},
        
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