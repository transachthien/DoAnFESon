import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
const accountModule = () => import('../../account/account.module').then(x => x.AccountModule);
const usersModule = () => import('../../users/users.module').then(x => x.UsersModule);
import { AuthGuard } from 'app/_helpers';
import { LoginComponent } from 'app/account/login.component';
import { RegisterComponent } from 'app/account/register.component';
import { ContentListComponent } from 'app/content-list/content-list.component';
import { NewsOfKeywordComponent } from 'app/news-of-keyword/news-of-keyword.component';
import { ShowListNewsComponent } from 'app/show-list-news/show-list-news.component';
import {ShowListGgComponent} from "../../show-list-gg/show-list-gg.component";
import {SaveNewsComponent} from "../../save-news/save-news.component";

export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    { path: 'login', component: LoginComponent },
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'table-list',     component: TableListComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    { path: 'users', loadChildren: usersModule, canActivate: [AuthGuard] },
    { path: 'list-content',        component: ContentListComponent },
    { path: 'news-of-keyword',        component: SaveNewsComponent},
    { path: 'show-list-news',        component: ShowListNewsComponent},
    { path: 'show-list-gg',        component: ShowListGgComponent},

    // { path: 'account', children: [
    //     { path: 'login', component: LoginComponent },
    //     { path: 'register', component: RegisterComponent }
    // ] },
    { path: 'register', component: RegisterComponent }
];
