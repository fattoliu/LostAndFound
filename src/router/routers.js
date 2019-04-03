import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'

export default [ {
        path: '/home',
        name: 'home',
        component: Home
    },
    {
        path: '/',
        name: 'login',
        component: Login
        // component: () => import('@/views/Login.vue')
    }
]
