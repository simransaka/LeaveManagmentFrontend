import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { SignupComponent } from './signup/signup.component';
import { AllEmployeesComponent } from './all-employees/all-employees.component';
import { UserLeaveBalanceComponent } from './user-leave-balance/user-leave-balance.component';
import { LeaveRequestComponent } from './leave-request/leave-request.component';
import { MyLeavesComponent } from './my-leaves/my-leaves.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ApproveLeavesComponent } from './approve-leaves/approve-leaves.component';
import { CompanyLeavePolicyComponent } from './company-leave-policy/company-leave-policy.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AttendanceComponent } from './attendance/attendance.component';


export const routes: Routes = [
    {
        path: 'leave/request', component : LeaveRequestComponent
    },
    {
        path: 'login', component : LoginComponent
    },
    {
        path: 'user/dashboard/:emailId', component : UserDashboardComponent
    },
    {
        path: 'admin/dashboard/:emailId', component : AdminDashboardComponent
    },
    {
        path: '', component : HomePageComponent
    },
    {
        path: 'home', component : HomePageComponent
    },
    {
        path: 'signup', component: SignupComponent
    },
    {
        path: 'allEmployees', component: AllEmployeesComponent
    },
    {
        path: 'leaveBalance/:emailId', component: UserLeaveBalanceComponent
    },
    {
        path: 'allLeaves/:emailId', component: MyLeavesComponent
    },
    {
        path: "change/password", component: ChangePasswordComponent
    },
    {
        path: "approveLeaves", component: ApproveLeavesComponent
    },
    {
        path: "leave/policy", component:CompanyLeavePolicyComponent
    },
    {
        path: "attendance", component: AttendanceComponent
    }
];
