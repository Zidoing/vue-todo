<template>
  <div id="app">
    <div id="cover"></div>
    <Header></Header>
    <p>{{ fullName }} {{ counter }}</p>
    <router-link :to="{name:'app'}">app</router-link>
    <router-link to="/login">login</router-link>
    <transition name="fade">
      <router-view></router-view>
    </transition>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from './views/layout/header.vue'
import Footer from './views/layout/footer.jsx'
import { mapGetters, mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'app',
  components: {
    Header,
    Footer
  },
  data () {
    return {
      text: 'abssssc'
    }
  },
  mounted () {
    console.log(this.$store)
    let i = 1


    this.updateCountSync({
      num: 5,
      time: 2000
    })

    // setInterval(() => {
    //   this.$store.commit('updateCount', i++)
    // }, 1000)
  },
  computed: {
    ...mapState({
      counter: 'count'
    }),
    ...mapGetters(['fullName']),
    // fullName () {
    //   return this.$store.getters.fullName
    // },

  },
  methods: {
    ...mapActions(['updateCountSync']),
    ...mapMutations(['updateCount'])
  }
}
</script>

<style lang="stylus" scoped>
#app {
  position absolute
  left 0
  right 0
  top 0
  bottom 0

}

#cover {
  position absolute
  left 0
  top 0
  right 0
  bottom 0
  background-color #999
  opacity 0.9
  z-index -1
}
</style>
