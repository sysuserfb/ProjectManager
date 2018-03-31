import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from './detail/detail.component'
import { LoginComponent } from './user/login/login.component'
import { RegisterComponent } from './user/register/register.component'
import { MenuComponent } from './menu/menu.component';
import{ProjListComponent} from './proj-list/proj-list.component';

const detailRoutes: Routes=[
  // {path:':id/member',component:MembersComponent},
  // {path:':id/status',component:StatusComponent},
  // {path:':id/review',component:ReviewComponent},
  // {path:':id',redirectTo:':id/member',pathMatch:'full'}
  ];

const mainRoutes:Routes=[
  {path:'list',component:ProjListComponent},//todo
  {path:'detail/:id',component:DetailComponent,children:detailRoutes},
  {path:'',redirectTo:'list',pathMatch:'full'}
  ];

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'main', component: MenuComponent ,children:mainRoutes},
  { path: '', redirectTo: 'main',pathMatch:'full' }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(appRoutes,{ enableTracing: true } // <-- debugging purposes only
  )],
})
export class AppRoutingModule { }
