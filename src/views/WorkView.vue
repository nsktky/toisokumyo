
<template>
  <v-app id="inspire" class="work">
    <v-main class="grey lighten-3">
      <v-container>
        <v-col
          v-for="item in works" :key="item.src"
        >
          <v-card  height="80vh" style="margin: 1rem">
              <!-- itemsから表示するデータを取り出す -->
              <a v-bind:href="item.url">
                <v-img :src="item.imageUrl" height="80vh"></v-img>
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
        const workRef = firebase.firestore().collection("works").orderBy("createdAt", "desc")
        const snapshot = await workRef.get()
        console.log(snapshot)

        snapshot.forEach(doc => {
          console.log(doc.data())
          this.works.push(doc.data())
        })
      },
      data: () => ({
        works: [
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