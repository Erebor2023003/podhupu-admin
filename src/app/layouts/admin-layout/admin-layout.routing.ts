import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { TableComponent } from '../../pages/table/table.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';
import { AgentComponent } from 'app/Admin/Components/agent/agent.component';
import { AgentSanghamComponent } from 'app/Admin/agent-sangham/agent-sangham.component';
import { SanghamComponent } from 'app/Admin/Components/sangham/sangham.component';
import { CustomerComponent } from 'app/Admin/Components/customer/customer.component';
import { CustomerSanghamComponent } from 'app/Admin/customer-sangham/customer-sangham.component';
import { SanghamDepositsComponent } from 'app/Admin/Components/sangham-deposits/sangham-deposits.component';
import { SanghamDepositsWithdrawsComponent } from 'app/Admin/sangham-deposits-withdraws/sangham-deposits-withdraws.component';
import { ViewCustomerComponent } from 'app/Admin/Components/view-customer/view-customer.component';
import { InterestComponent } from 'app/Admin/Components/interest/interest.component';
import { SanghamRecoveryComponent } from 'app/Admin/Components/sangham-recovery/sangham-recovery.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'agent',component:AgentComponent},
    { path: 'agent-sangham',component:AgentSanghamComponent},
    { path: 'sangham-deposits-withdraws',component:SanghamDepositsWithdrawsComponent},
    { path: 'customer-sangham',component:CustomerSanghamComponent},
    { path: 'sangham-deposits',component:SanghamDepositsComponent},
    { path: 'sangham',component:SanghamComponent},
    { path: 'customer',component:CustomerComponent},
    { path: 'view-customer',component:ViewCustomerComponent},
    { path: 'sangham-recovery',component:SanghamRecoveryComponent},
    { path: 'interest',component:InterestComponent},

    


    { path: 'dashboard', component: DashboardComponent },
    { path: 'user',           component: UserComponent },
    { path: 'table',          component: TableComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent }
];
