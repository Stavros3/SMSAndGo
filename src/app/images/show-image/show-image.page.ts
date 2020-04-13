import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ModalController } from '@ionic/angular';

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
    private modalCtrl:ModalController) {
      
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

  onBack() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
}
