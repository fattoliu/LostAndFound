import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import LostPublish from '@/views/LostPublish.vue'
import LostList from '@/views/LostList.vue'
import Settings from '@/views/Settings.vue'
import Details from '@/views/Details.vue'


export default [{
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    redirect: {
      name: 'lostList',
      params: {
        category: 0,
        status: 0,
        time: 0
      }
    },
    children: [{
        path: 'lostPublish',
        name: 'lostPublish',
        component: LostPublish
      },
      {
        path: 'lostList/:category/:status/:time',
        name: 'lostList',
        component: LostList
      }, {
        path: 'settings',
        name: 'settings',
        component: Settings
      }
    ]
  },
  {
    path: '/home/lostList/:code',
    name: 'lostDetails',
    component: Details
  }

]
