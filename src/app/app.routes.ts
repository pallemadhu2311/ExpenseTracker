import { Routes } from '@angular/router';
import { ExpensesComponent } from './home/expenses/expenses.component';
import { AddExpensesComponent } from './home/add-expenses/add-expenses.component';
import { SummaryComponent } from './home/summary/summary.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

export const routes: Routes = [
  // { path: '', redirectTo: '/home/addexpenses', pathMatch: 'full' },
  {
    path:'login',component:LoginComponent
  },
  {
    path:'signup',component:SignupComponent
  },
  {
    path: 'home/expenses', component: ExpensesComponent
  },
  {
    path: 'home/addexpenses', component: AddExpensesComponent
  },
  {
    path: 'home/summary', component: SummaryComponent
  },


];
