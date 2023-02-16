import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatListModule } from '@angular/material/list';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HcisToolbarComponent } from './hcis-toolbar/hcis-toolbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { HcisFooterComponent } from './hcis-footer/hcis-footer.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { EReaderComponent } from './e-reader/e-reader.component';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule, Routes } from '@angular/router';
import { ThesisSearchComponent } from './thesis-search/thesis-search.component';
import { PersonalDataComponent } from './personal-data/personal-data.component';
import { LoginPopupComponent } from './login-popup/login-popup.component';
import { MatRippleModule } from '@angular/material/core';
import { HcisHeaderComponent } from './hcis-header/hcis-header.component';
import { LoginComponent } from './login/login.component';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';

const routes: Routes = [
  { path: 'e-reader', component: EReaderComponent },
  { path: '', component: AnnouncementsComponent },
  { path: 'personal-data', component: PersonalDataComponent },
  { path: 'thesis-search', component: ThesisSearchComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HcisToolbarComponent,
    HcisFooterComponent,
    AnnouncementsComponent,
    EReaderComponent,
    ThesisSearchComponent,
    PersonalDataComponent,
    LoginPopupComponent,
    HcisHeaderComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    MatCardModule,
    MatProgressBarModule,
    MatInputModule,
    FormsModule,
    MatRippleModule,
    HttpClientModule,
    AppRoutingModule,
    MatSelectModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
