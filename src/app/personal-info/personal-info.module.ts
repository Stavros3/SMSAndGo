import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersonalInfoPageRoutingModule } from './personal-info-routing.module';

import { PersonalInfoPage } from './personal-info.page';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PersonalInfoPageRoutingModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
    }),
    ReactiveFormsModule
  ],
  declarations: [PersonalInfoPage]
})
export class PersonalInfoPageModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}