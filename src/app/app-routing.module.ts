import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { EventlistComponent } from './eventlist/eventlist.component';
import { EventaddComponent } from './eventadd/eventadd.component';
import { EventeditComponent } from './eventedit/eventedit.component';
import { UserlistComponent } from './userlist/userlist.component';
import { LogoutComponent } from './logout/logout.component';
import { ShowcredComponent } from './showcred/showcred.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'eventlist',component:EventlistComponent},
  {path:'eventadd',component:EventaddComponent},
  {path:'eventedit',component:EventeditComponent},
  {path:'userlist',component:UserlistComponent},
  {path:'logout',component:LogoutComponent},
  {path:'showcred',component:ShowcredComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }