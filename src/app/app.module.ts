import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from "ngx-toastr";

import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './shared/login/login.component';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AgentComponent } from './Admin/Components/agent/agent.component';
import { AgentSanghamComponent } from './Admin/agent-sangham/agent-sangham.component';
import { SanghamComponent } from './Admin/Components/sangham/sangham.component';
import { CustomerComponent } from './Admin/Components/customer/customer.component';
import { CustomerSanghamComponent } from './Admin/customer-sangham/customer-sangham.component';
import { SanghamDepositsComponent } from './Admin/Components/sangham-deposits/sangham-deposits.component';
import { SanghamDepositsWithdrawsComponent } from './Admin/sangham-deposits-withdraws/sangham-deposits-withdraws.component';
import { ViewCustomerComponent } from './Admin/Components/view-customer/view-customer.component';
import { InterestComponent } from './Admin/Components/interest/interest.component';
import { SanghamRecoveryComponent } from './Admin/Components/sangham-recovery/sangham-recovery.component';



@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    AgentComponent,
    AgentSanghamComponent,
    SanghamComponent,
    CustomerComponent,
    CustomerSanghamComponent,
    SanghamDepositsComponent,
    SanghamDepositsWithdrawsComponent,
    ViewCustomerComponent,
    InterestComponent,
    SanghamRecoveryComponent,


  ],
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes,{
      useHash: true
    }),
    SidebarModule,
    NavbarModule,
    ToastrModule.forRoot(),
    FooterModule,
    FixedPluginModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
