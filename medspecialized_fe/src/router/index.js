import { createRouter, createWebHistory } from 'vue-router';
import AdminDashboard from '../views/AdminDashboard.vue'; // Make sure path is correct
import Login from '../views/Login.vue'; // Make sure path is correct
import UpdateUser from '../views/UdateUser.vue'; // Make sure path is correct



const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: AdminDashboard,
  },
  {
    path: '/users/edit/:id',  // Define the route to capture the user ID
    name: 'edit-user',
    component: UpdateUser,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
