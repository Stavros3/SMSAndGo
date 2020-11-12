import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SMS } from '@ionic-native/sms/ngx';
import { MenuController, AlertController, ModalController, Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Person } from '../models/person.model';
import { PersonalInfoPage } from '../personal-info/personal-info.page';
import { AnalyticsFirebase } from '@ionic-native/analytics-firebase';
import { AppComponent } from '../app.component';
import { MainService } from '../services/main/main.service';
import { Router } from '@angular/router';
//import { FirebaseAnalytics } from '@ionic-native/firebase-analytics/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],

})
export class HomePage {

  public title: string = environment.appName;
  public alertMsgs: any;
  public country: string = '';
  constructor(private sms: SMS,
    private menu: MenuController,
    private translate: TranslateService,
    private alertController: AlertController,
    private modalController: ModalController,
    private appComp: AppComponent,
    private mainService: MainService,
    private router: Router,
    //private firebaseAnalytics: FirebaseAnalytics
  ) {
    AnalyticsFirebase.setCurrentScreen('home')      
  }

  ionViewWillEnter() {    
    this.country = this.mainService.getCoutnry();    
  }

  public openMenu() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  public send(code: number) {
    let smsNumber: string;
    this.mainService.getPersonData().then((data: Person) => {
      if (!data) {
        this.onOpenPersonalSettings();
        
        return;
      }

      AnalyticsFirebase.logEvent('SMS_Sended', { sendCode: code })

        if (this.country == 'gr') {
          smsNumber = '13033';
        } else {
          smsNumber = '8998';
        }
        this.sms.send(smsNumber, code + ' ' + data.nameSurname + ' ' + data.address, { android: { intent: "INTENT" } }).then(() => {
          this.mainService.addStat(code);
          //this.presentAlert(true).then(() => { })
        }).catch(err => {
          this.mainService.addStat(code);
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
    this.mainService.getImage().then(async (data) => {
      if (!data) {
        this.appComp.onOpenEditImages();
      } else {
        //emfanish eikonas
        AnalyticsFirebase.logEvent('Show_Image',{})
          this.router.navigate(['/showimage']);
        
      }
    })
  }
}
