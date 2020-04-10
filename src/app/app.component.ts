import { Component } from '@angular/core';

import { Platform, ModalController, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { PersonalInfoPage } from './personal-info/personal-info.page';
import { ImagesPage } from './images/images.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public translate: TranslateService,
    private storage: Storage,
    public modalController: ModalController,
    public alertController: AlertController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.storage.get('langDefault').then(data => {
        if (data) {
          this.translate.setDefaultLang(data);
          this.translate.currentLang = data;
          this.translate.currentLang = data;
        } else {
          this.translate.setDefaultLang('el');
          this.storage.set('langDefault', 'el');
          this.translate.currentLang = 'el';
        }
      }).catch(() => {
        this.translate.setDefaultLang('el');
        this.storage.set('langDefault', 'el');
        this.translate.currentLang = 'el';
      })
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  ionViewDidLeave() {
  }
  useLanguage(language: string) {
    this.storage.set('langDefault', language).then(data => {
      this.translate.use(language);
      this.translate.currentLang = language;
    })
  }

  async onOpenPersonalSettings() {
    const modal = await this.modalController.create({
      component: PersonalInfoPage
    });
    return await modal.present();
  }
  
  
  clearAppData() {
    this.storage.clear();
  }
  
  async onOpenEditImages(){
    const modal = await this.modalController.create({
      component: ImagesPage
    });
    return await modal.present();

  }
}
