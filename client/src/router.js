import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/member-area',
      name: 'SignInRegister',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "member-area" */ './views/SignInRegister.vue')
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      meta: {
        authRequired: true
      },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "Dashboard" */ './views/Dashboard.vue'),
      children: [
        {
          path: '/dashboard/catalogue',
          name: 'MainCatalogue',
          meta: {
            authRequired: true
          },
          component: () => import(/* webpackChunkName: "MainCatalogue" */ './components/Catalogue.vue')
        },
        {
          path: '/dashboard/add-products',
          name: 'AddNewProducts',
          meta: {
            authRequired: true
          },
          component: () => import(/* webpackChunkName: "AddNewProductsNew" */ './components/AddProduct.vue')
        },
        {
          path: '/dashboard/add-brand',
          name: 'AddNewBrand',
          meta: {
            authRequired: true
          },
          component: () => import(/* webpackChunkName: "AddNewBrand" */ './components/AddBrand.vue')
        },
        {
          path: '/dashboard/add-address',
          name: 'DashboardAddAddress',
          meta: {
            authRequired: true
          },
          component: () => import(/* webpackChunkName: "DashboardAddAddress" */ './components/AddAddress.vue')
        },
        {
          path: '/dashboard/purchase-history',
          name: 'PurchaseHistory',
          meta: {
            authRequired: true
          },
          component: () => import(/* webpackChunkName: "PurchaseHistory" */ './views/PurchaseHistory.vue')
        },
      ]
    },
    {
      path: '/shop',
      name: 'ShopPage',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "ShopPage" */ './views/ShopPage.vue')
    },
    {
      path: '/product/:id/:name',
      name: 'ProductPage',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "ProductPage" */ './views/ProductPage.vue')
    },
    {
      path: '/check-out',
      name: 'CheckOutSummart',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "ProductPage" */ './views/CheckOut.vue')
    },
    {
      path: '/check-out-shipping-payment',
      name: 'ShippingPayment',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "ShippingPayment" */ './views/Shipping.vue')
    },
  ]
})

router.beforeEach((to, from, next) => {
  console.log('masuk before if')
  if (to.matched.some(record => record.meta.authRequired)) {
      if (!localStorage.getItem('token')) {
        console.log('masuk sini -1 if')
          next({
              path: '/member-area'
          });
      } else {
        console.log('masuk sini 1 if', to)
          next()
      }
  } else {
    console.log('masuk sini 2 if')
      next()
  }
})

export default router