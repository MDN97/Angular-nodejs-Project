import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddDataComponent } from './components/add-data/add-data.component';
import { ListDataComponent } from './components/list-data/list-data.component';
import { EditDataComponent } from './components/edit-data/edit-data.component';
import { DataFilterPipe } from './pipes/data-filter.pipe';
import { NavbarComponent } from './navbar/navbar.component';
import { AddReservationsComponent } from './components/add-reservations/add-reservations.component';
import { EditCarsComponent } from './components/edit-reservations/edit-reservations.component';
import { ListReservationsComponent } from './components/list-reservations/list-reservations.component';
import { CarFilterPipe } from './pipes/car-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AddDataComponent,
    ListDataComponent,
    EditDataComponent,
    DataFilterPipe,
    CarFilterPipe,
    NavbarComponent,
    NavbarComponent,
    AddReservationsComponent,
    EditCarsComponent,
    ListReservationsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
