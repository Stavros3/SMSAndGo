import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ImagesPageRoutingModule } from './images-routing.module';

import { ImagesPage } from './images.page';
import { TranslateModule } from '@ngx-translate/core';
import { Camera } from '@ionic-native/camera/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImagesPageRoutingModule,
    TranslateModule.forChild(),
  ],
  declarations: [ImagesPage],
  providers:[Camera]
})
export class ImagesPageModule {}
