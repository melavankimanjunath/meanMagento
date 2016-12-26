import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule} from '@angular/http';

import { AppComponent }  from './app.component';
// import { CustomersComponent } from './customers/customers.component';
import { CategoryComponent }     from './category/category.component';
import { app_routing } from './app.routing';
//import { DataService } from './shared/services/data.service';
import { HomeComponent }     from './home/home.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule, ReactiveFormsModule, HttpModule, app_routing ],
  declarations: [ AppComponent,HomeComponent,CategoryComponent ],
  providers:    [ ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }