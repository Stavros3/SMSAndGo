import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
//import { ModalController } from '@ionic/angular';
//import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MenuController } from '@ionic/angular';
import { AnalyticsFirebase } from '@ionic-native/analytics-firebase';

@Component({
  selector: 'app-show-image',
  templateUrl: './show-image.page.html',
  styleUrls: ['./show-image.page.scss'],
})
export class ShowImagePage implements OnInit {
  public slideOpts:any ={
    zoom:true,
    centeredSlides: true
  }
  public haveData:boolean = false;
  public imageData:any = '';

  constructor(private storage: Storage,
    //private modalCtrl:ModalController,
    private location: Location,
    private menu: MenuController
    ) {
      AnalyticsFirebase.setCurrentScreen('view_image')
     }

 async ngOnInit() {
    await this.storage.get('imagePermit').then( async (data) => {
      this.imageData = await data;
      if (this.imageData != ''){
        this.haveData = true;
      }
    })
  }

  onOpenImage(){
  
  }

  async onBack() {
    await this.menu.close()
    this.location.back();
    /* this.modalCtrl.dismiss({
      'dismissed': true
    }); */
  }
}
