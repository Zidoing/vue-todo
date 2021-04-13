import Vue from 'vue'

const app = new Vue({
  template: '<div> this is content  {{text}}</div>',
  data: {
    text: 'text'
  }
})

app.$mount('#root')


