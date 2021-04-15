import Todo from '../views/todo/todo.vue'
import Login from '../views/login/login.vue'

export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    path: '/app',
    props: true,
    // component: Todo,

    components:{
      default: Todo,
      a: Login
    },

    name: 'app',
    meta: {
      title: 'this is app',
      description: 'addddd'
    },
    children: [
      {
        path: 'test',
        component: Login
      }
    ]
  },
  {
    path: '/login',
    // component: Login
    components: {
      default: Login,
      a: Todo
    }
  }, {
    path: '/login/exact',
    component: Login
  }
]
