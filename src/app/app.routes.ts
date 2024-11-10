import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ReservationsPageComponent } from './pages/reservations-page/reservations-page.component';
import { AccomdationsPageComponent } from './pages/accomdations-page/accomdations-page.component';
import { MenuOptionsComponent } from './pages/menu-options/menu-options.component';
import { DayOutComponent } from './pages/day-out/day-out.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { PaymentPageComponent } from './pages/payment-page/payment-page.component';
import { CheckOutComponent } from './pages/check-out/check-out.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'accomadations',
        component: AccomdationsPageComponent
    },
    {
        path: 'reservations',
        component: ReservationsPageComponent
    },
    {
        path: 'menuoptions',
        component: MenuOptionsComponent
    },
    {
        path: 'dayout',
        component: DayOutComponent
    },
    {
        path: 'getstarted',
        component: SignUpComponent
    },
    {
        path: 'register',
        component: RegistrationComponent
    },
    {
        path: 'payment-page',
        component: PaymentPageComponent
    },
    {
        path: 'check-out',
        component: CheckOutComponent
    },
    {
        path: 'notifications',
        component: NotificationsComponent
    },
    {
        path: 'about',
        component: AboutUsComponent
    }
];
