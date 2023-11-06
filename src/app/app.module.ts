import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { MaterialModule } from 'src/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';

import { EventService } from './data/event-service';
import { EventlistComponent } from './eventlist/eventlist.component';
import { EventaddComponent } from './eventadd/eventadd.component';
import { EventeditComponent } from './eventedit/eventedit.component';
import { UserlistComponent } from './userlist/userlist.component';
import { EventdialogComponent } from './eventdialog/eventdialog.component';
import { LogoutComponent } from './logout/logout.component';
import { EventdialogeditComponent } from './eventdialogedit/eventdialogedit.component';

import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    EventlistComponent,
    EventaddComponent,
    EventeditComponent,
    UserlistComponent,
    EventdialogComponent,
    LogoutComponent,
    EventdialogeditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot()
  ],
  providers: [EventService],
  bootstrap: [AppComponent]
})
export class AppModule { }
