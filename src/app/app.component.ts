import { Component, Inject } from '@angular/core';

import { Platform, AlertController, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TranslateService } from '@ngx-translate/core';
import { MainService } from './services/main/main.service';
import { AnalyticsFirebase } from '@ionic-native/analytics-firebase';
import { Router } from '@angular/router';
import { Market } from '@ionic-native/market/ngx';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public selectLang: string = 'el';
  constructor(
    public platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public translate: TranslateService,
    public alertController: AlertController,
    public mainService: MainService,
    private router: Router,
    private menu: MenuController,
    private market: Market,
    @Inject(DOCUMENT) private document: Document
  ) {
    //this.translate.setDefaultLang('el');
    //this.translate.currentLang = this.mainService.getDefauldLang();  
    this.selectLang = this.mainService.getDefauldLang();
    
    if (this.selectLang == 'ar') {
        this.document.documentElement.dir = 'rtl';
      } else {
        this.document.documentElement.dir = 'ltr';
      }
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.platform.backButton.subscribe(() => {
        if (this.router.isActive('/home', true) && this.router.url === '/home') {
          navigator['app'].exitApp();
        }
      });
      AnalyticsFirebase.setMinimumSessionDuration(500).catch(() => {
        //AnalyticsFirebase.resetAnalyticsData()
      })
      AnalyticsFirebase.logEvent(AnalyticsFirebase.DEFAULT_EVENTS.APP_OPEN).catch(() => {
        //AnalyticsFirebase.resetAnalyticsData()
      })
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
      
      if (language == 'ar') {
        this.document.documentElement.dir = 'rtl';
      } else {
        this.document.documentElement.dir = 'ltr';
      }
    })
  }

  onOpenPersonalSettings() {
    this.menu.close();
    this.router.navigate(['editpersonalsettings'])
  }

  onOpenEditImages() {
    this.menu.close();
    this.router.navigate(['editimage'])
  }

  onOpenStats() {
    this.menu.close();
    this.router.navigate(['stats'])
  }

  clearAppData() {
    this.mainService.clearAll();
  }

  onRateApp() {
    AnalyticsFirebase.logEvent('Rate_us').catch(() => {
    })
    this.market.open('io.smsngo.starter');
  }
/* <p>
          <a href="https://progressnet.gr/" target="_system" >ProgressNet.gr</a> for publish on App Store 
        </p> */
  async specialThnx() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Special Thanks',
      subHeader: '',
      message: `
        <p>
          KAMEL ZEINEDDIN (kkamelzain@gmail.com) for Arab translation
        </p>
      `,
      buttons: ['OK']
    });

    await alert.present();
  }

  test(t: string) {
    console.log(t);
    
  }
}
