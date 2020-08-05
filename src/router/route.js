export const routes = [
    {
      path: '/aa',
      name: 'AA',
      component: () => import('../views/AA.vue')
    },
    {
      path: '/main',
      name: 'Main',
      component: () => import('../views/Main.vue'),
      children:[
          {
            path: 'home',
            name: 'Home',
            component: () => import('../views/mainView/Home.vue'), 
          },
          {
            path: 'classify',
            name: 'Classify',
            component: () => import('../views/mainView/Classify.vue'), 
          },
          
          {
            path: 'ranking',
            name: 'Ranking',
            component: () => import('../views/mainView/Ranking.vue'), 
          },
          {
            path: 'search',
            name: 'Search',
            component: () => import('../views/mainView/Search.vue'), 
          },

          // {
          //   path:'/main',
          //   redirect:{
          //       name:'Home'
          //   }
          // },
         
      ]
    },
    {
      path: 'detail',
      name: 'Detail',
      component: () => import('../views/Detail.vue'), 
    },
    {
      path: '/bookdetail',
      name: 'BookDetail',
      component: () => import('../views/BookDetail.vue')
    },
    {
      path: '/recommend',
      name: 'Recommend',
      component: () => import('../views/Recommend.vue')
    },
    {
      path: '/result',
      name: 'Result',
      component: () => import('../views/Result.vue'), 
    },
    {
      path: '/read',
      name: 'Read',
      component: () => import('../views/Read.vue'), 
    },
    {
      path:'*',
      redirect:{
          name:'Home'
      }
    },

    
  ]