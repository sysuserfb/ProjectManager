import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './menu/menu.component';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgZorroAntdModule, NzMessageService }from 'ng-zorro-antd';
import { AppComponent } from './app.component';
import { ProjListComponent } from './proj-list/proj-list.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { DetailComponent } from './detail/detail.component';
import { AppRoutingModule } from './/app-routing.module';
import { HttpService } from './utils/http/http.service';
import { AllListComponent } from './all-list/all-list.component';
import { MessageService } from './utils/message/message.service';
import { SystemMessageComponent } from './system-message/system-message.component';
import { NewProductComponent } from './new-product/new-product.component';
import { NewVersionComponent } from './new-version/new-version.component';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ProjListComponent,
    LoginComponent,
    RegisterComponent,
    DetailComponent,
    AllListComponent,
    SystemMessageComponent,
    NewProductComponent,
    NewVersionComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule ,
    HttpModule,
    BrowserAnimationsModule,
    NgZorroAntdModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    HttpClient,
    HttpService,
    NzMessageService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
