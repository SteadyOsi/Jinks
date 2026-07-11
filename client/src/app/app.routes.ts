import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Conversations } from './pages/conversations/conversations';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'conversations',
    component: Conversations,
  },
  {
    path: 'login',
    component: Login,
  },
];
