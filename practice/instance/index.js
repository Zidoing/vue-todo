import Vue from 'vue'

const app = new Vue({
  template: '<div> this is content  {{text}}</div>',
  data: {
    text: 'text'
  }
})

app.$mount('#root')

console.log(app.$data)
console.log(app.$props)
console.log(app.$refs)
console.log(app.$el)
console.log(typeof app.$el)
console.log(app.$options)

app.$options.render = (h) => {
  return h('div', {}, 'new render function')
}

app.$watch('text', (newText, oldText) => {
    console.log(newText)
    console.log(oldText)
  }
)
