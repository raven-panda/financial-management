import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SidemenuComponent } from './shared/components/sidemenu/sidemenu.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { ChartComponent } from './shared/components/chart/chart.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalboxComponent } from './shared/components/modalbox/modalbox.component'


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SidemenuComponent,
    ChartComponent,
    ModalboxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatSidenavModule,
    HighchartsChartModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
