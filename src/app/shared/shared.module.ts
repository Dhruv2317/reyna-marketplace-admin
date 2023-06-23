import { NgModule, NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule,CurrencyPipe } from '@angular/common';
import { NgxMaskModule } from 'ngx-mask'
import { Toastr } from '../services/toastr.service';
import { Helper } from '../services/helper.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BlockUIModule } from 'ng-block-ui';
import { DataTablesModule } from 'angular-datatables';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatInputModule} from '@angular/material/input';
import { PipesModule } from 'src/app/pipes/pipes.module'
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  declarations: [],
  imports: [
  CommonModule,
    PipesModule,
    NgxMaskModule.forRoot(),
    BlockUIModule.forRoot({
      message:'Loading...'
    }),
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    FormsModule, 
    DataTablesModule,
    NgxPaginationModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  providers: [
    Toastr,
    Helper,
    BsModalService,
    CurrencyPipe
  ],
  exports: [
    CommonModule,
    NgxMaskModule,
    FormsModule,
    ReactiveFormsModule,
    BlockUIModule,
    DataTablesModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSelectModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatInputModule,
    NgxPaginationModule,
    BsDatepickerModule,
    PipesModule,
    TabsModule,
    ModalModule
  ],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
