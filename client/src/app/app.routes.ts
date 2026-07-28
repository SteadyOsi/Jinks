import { Routes } from '@angular/router';
import { Layout } from './layout/layout';
import { Login } from './pages/login/login';
import { Conversations } from './pages/conversations/conversations';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
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
