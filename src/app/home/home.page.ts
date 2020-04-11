import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SMS } from '@ionic-native/sms/ngx';
import { MenuController, AlertController, ModalController, Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { Person } from '../models/person.model';
import { PersonalInfoPage } from '../personal-info/personal-info.page';
import { AnalyticsFirebase } from '@ionic-native/analytics-firebase';
import { AppComponent } from '../app.component';
import { ShowImagePage } from '../images/show-image/show-image.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],

})
export class HomePage {

  public title: string = environment.appName;
  public alertMsgs: any;
  constructor(private sms: SMS,
    private menu: MenuController,
    private translate: TranslateService,
    private storage: Storage,
    private alertController: AlertController,
    private modalController: ModalController,
    private platform: Platform,
    private appComp: AppComponent
  ) {
    AnalyticsFirebase.setCurrentScreen('home')
      .then(() => console.log('View successfully tracked'))
      .catch(err => console.log('Error tracking view:', err));

    this.platform.backButton.subscribe(() => {
      navigator['app'].exitApp();
    })

    /*this.storage.get('personalData').then(data=>{
      if(!data){
        this.onOpenPersonalSettings();
      }
    }) */
  }

  public openMenu() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  public send(code: number) {
    this.storage.get('personalData').then((data: Person) => {
      if (!data) {
        this.onOpenPersonalSettings();
      }
      this.sms.send('13033', code + ' ' + data.nameSurname + ' ' + data.address, { android: { intent: "INTENT" } }).then(() => {
        //this.presentAlert(true).then(() => { })
      }).catch(err => {
        this.presentAlert(false).then(() => { })
      })
    })
  }

  async presentAlert(status: boolean) {
    this.translate.getTranslation(this.translate.currentLang).subscribe(async (data) => {
      this.alertMsgs = data;
      const alert = await this.alertController.create({
        header: (status ? this.alertMsgs.sendAlert.successTitle : this.alertMsgs.sendAlert.errorTitle),
        message: (status ? this.alertMsgs.sendAlert.msgSuccess : this.alertMsgs.sendAlert.errorMsg),
        buttons: ['OK']
      });

      await alert.present();
    })
  }

  async onOpenPersonalSettings() {
    const modal = await this.modalController.create({
      component: PersonalInfoPage
    });
    return await modal.present();
  }

  async onShowImage() {
    this.storage.get('imagePermit').then(async (data) => {
      if (!data) {
        this.appComp.onOpenEditImages();
      } else {
       //emfanish eikonas
        this.presentImageModal()

      }
    })
  }

  async presentImageModal() {    
    const modal = await this.modalController.create({
      component: ShowImagePage,
      swipeToClose: true
    });
    return await modal.present();
  }
}
