import { Routes } from '@angular/router';
import { PublicPageComponent } from './public-page/public-page.component';
import { RestrictedPageComponent } from './restricted-page/restricted-page.component';
import { msalGuard } from './msal.guard';

export const routes: Routes = [
    {
        path:'',
        component:PublicPageComponent
    },
    {
        path:'public-page',
        component:PublicPageComponent
    },
    {
        path:'restricted-page',
        component:RestrictedPageComponent,
        canActivate:[msalGuard]
    },
];
