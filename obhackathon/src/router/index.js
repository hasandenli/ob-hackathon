import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/components/Home.vue'
import Questionnaire from '../components/Questionnaire.vue'
import MatchesList from '../components/Matches.vue'
import Profile from '../components/Profile.vue'
import MyProfile from '../components/MyProfile.vue'
import SignUp from '../components/SignUp.vue'
import LoginForm from '../components/Login.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/questionnaire',
    name: 'Questionnaire',
    component: Questionnaire
  },
  {
    path: '/matches',
    name: 'MatchesList',
    component: MatchesList
  },
  {
    path: '/profile/:id',
    name: 'Profile',
    component: Profile,
    props: true
  },
  {
    path: '/profile',
    name: 'MyProfile',
    component: MyProfile
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/login',
    name: 'LoginForm',
    component: LoginForm
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 