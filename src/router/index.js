import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import Login from '@/components/pages/Login'
import Products from '@/components/Products'
import CustomerOrder from '@/components/CustomerOrders'
import CustomerCheckout from '@/components/CustomerCheckout'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '*',
      redirect: 'login',
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/admin',
      name: 'Dashboard',
      component: Dashboard,
      children: [{
        path: 'products',
        name: 'Products',
        component: Products,
        meta: {
          requiresAuth: true
        },
      }]
    },
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
      children: [{
          path: 'customer_orders',
          name: 'CustomerOrder',
          component: CustomerOrder,
        },
        {
          path: 'customer_checkout/:orderId',
          name: 'CustomerCheckout',
          component: CustomerCheckout,
        }
      ]
    },
  ]
})
