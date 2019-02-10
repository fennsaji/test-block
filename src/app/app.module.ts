import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from './app.component';
import { RouterModule } from "@angular/router";
import { OrderDataComponent } from './order-data/order-data.component';
import { GenKeysComponent } from './gen-keys/gen-keys.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AddOrderComponent } from './add-order/add-order.component';

@NgModule({
  declarations: [
    AppComponent,
    OrderDataComponent,
    GenKeysComponent,
    AuthenticationComponent,
    HomeComponent,
    NavbarComponent,
    AddOrderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {path: 'orderdata', component: OrderDataComponent},
      {path: 'genkey', component: GenKeysComponent},
      {path: 'auth', component: AuthenticationComponent},
      {path: 'addorder', component: AddOrderComponent},
      {path: '', component: HomeComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
