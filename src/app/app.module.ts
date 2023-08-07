import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AlertComponent } from './_components';
import { HomeComponent } from './home';
import { ErrorInterceptor, JwtInterceptor, fakeBackendProvider } from './_helpers';
import { ContentListComponent } from './content-list/content-list.component';
import { CommonModule } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NewsOfKeywordComponent } from './news-of-keyword/news-of-keyword.component';
import { MatDividerModule } from '@angular/material/divider';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { ShowListNewsComponent } from './show-list-news/show-list-news.component';
import { FilterPipe } from 'shared/filter.pipe';
import { HelperService } from './_helpers/helper.service';
import {PoupMessageComponent} from "./poup-message/poup-message.component";
import {MatDialogModule} from "@angular/material/dialog";
import { MatCardModule } from '@angular/material/card';
import { NgxPaginationModule } from 'ngx-pagination';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { ShowListGgComponent } from './show-list-gg/show-list-gg.component';
import { SaveNewsComponent } from './save-news/save-news.component';
const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'right',
      distance: 12
    },
    vertical: {
      position: 'top',
      distance: 12,
      gap: 10
    }
  },
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};
@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatRadioModule,
    MatButtonModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatSortModule,
    MatDividerModule,
    MatCheckboxModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatCardModule,
    NgxPaginationModule,
    NotifierModule.withConfig(customNotifierOptions)
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AlertComponent,
    HomeComponent,
    ContentListComponent,
    NewsOfKeywordComponent,
    ShowListNewsComponent,
    FilterPipe,
    PoupMessageComponent,
    ShowListGgComponent,
    SaveNewsComponent,

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    // provider used to create fake backend
    fakeBackendProvider,
    HelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
