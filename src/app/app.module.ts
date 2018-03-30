import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';

import { NgZorroAntdModule }from 'ng-zorro-antd';
import { ProjListComponent } from './proj-list/proj-list.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ProjListComponent
  ],
  imports: [
    BrowserModule,
    NgZorroAntdModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
