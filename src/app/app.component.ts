import { Component } from '@angular/core';

import { Platform, AlertController, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TranslateService } from '@ngx-translate/core';
import { PersonalInfoPage } from './personal-info/personal-info.page';
import { ImagesPage } from './images/images.page';
import { MainService } from './services/main/main.service';
import { AnalyticsFirebase } from '@ionic-native/analytics-firebase';
import { Router } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';

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
    //public modalController: ModalController,
    public alertController: AlertController,
    public mainService: MainService,
    private router: Router,
    private menu: MenuController
  ) {
    this.mainService.getDefauldLang().then(data => {
      if (data) {
        this.translate.setDefaultLang(data);
        this.translate.currentLang = data;
        this.translate.currentLang = data;
      } else {
        this.translate.setDefaultLang('el');
        this.mainService.setDefauldLang('el');
        this.translate.currentLang = 'el';
      }
    }).catch(() => {
      this.translate.setDefaultLang('el');
      this.mainService.setDefauldLang('el');
      this.translate.currentLang = 'el';
    })
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      this.platform.backButton.subscribe(async () => {
        if (this.router.isActive('/home', true) && this.router.url === '/home') {
          navigator['app'].exitApp();
        }
      });
      await AnalyticsFirebase.setMinimumSessionDuration(500).catch(() => {
        AnalyticsFirebase.resetAnalyticsData()
      })
      await AnalyticsFirebase.logEvent(AnalyticsFirebase.DEFAULT_EVENTS.APP_OPEN).catch(() => {
        AnalyticsFirebase.resetAnalyticsData()
      })
      /* this.mainService.getDefauldLang().then(data => {
        if (data) {
          this.translate.setDefaultLang(data);
          this.translate.currentLang = data;
          this.translate.currentLang = data;
        } else {
          this.translate.setDefaultLang('el');
          this.mainService.setDefauldLang('el');
          this.translate.currentLang = 'el';
        }
      }).catch(() => {
        this.translate.setDefaultLang('el');
        this.mainService.setDefauldLang('el');
        this.translate.currentLang = 'el';
      }) */
      this.statusBar.show();
      this.splashScreen.hide();
    })
  }
  ionViewDidLeave() {
  }

  useLanguage(language: string) {
    this.mainService.setDefauldLang(language).then(data => {
      this.translate.use(language);
      this.translate.currentLang = language;
    })
  }

  onOpenPersonalSettings() {
    this.menu.close();
    this.router.navigate(['editpersonalsettings'])
    /* const modal = await this.modalController.create({
      component: PersonalInfoPage
    });
    AnalyticsFirebase.logEvent('Open_Edit_Personal_Data')
    return await modal.present(); */
  }

  onOpenEditImages() {
    this.menu.close();
    this.router.navigate(['editimage'])
    /* const modal = await this.modalController.create({
      component: ImagesPage
    });
    AnalyticsFirebase.logEvent('Open_Edit_Image')
    return await modal.present(); */
  }

  onOpenStats() {
    this.menu.close();
    this.router.navigate(['stats'])
  }

  clearAppData() {
    this.mainService.clearAll();
  }
}
