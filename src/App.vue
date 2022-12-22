<template>
  <div id="app">
    <nav>
      <div class="title">
        <h1>to_i_soku_myo</h1>
      </div>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/work">Work</router-link>
    </nav>
    <router-view/>
    <P5View />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #e8e8e8;
}

nav {
  padding: 1rem;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.title{
  margin-bottom: 1rem;
}
</style>

<script>
import P5View from '@/components/P5View'

export default {
  components: {
    P5View,
  },
}
</script>
