import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Person } from 'src/app/models/person.model';
import { AnalyticsFirebase } from '@ionic-native/analytics-firebase';
import { Stats, StatsItem } from 'src/app/models/Stats.model';
import * as moment from 'moment';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  private country: string;
  private lang: string;
  constructor(private storage: Storage,
    public translate: TranslateService) { }

  saveImage(data: any): Promise<any> {
    return this.storage.set('imagePermit', data);
  }

  getImage(): Promise<any> {
    return this.storage.get('imagePermit');
  }

  crearImage(): Promise<void> {
    AnalyticsFirebase.logEvent('Image_Deleted');
    return this.storage.remove('imagePermit');
  }

  getDefauldLang() {
    return this.lang;
  } 

  setDefauldLang(data: string): Promise<any> {
    AnalyticsFirebase.logEvent('Language_Change', { lang: data });
    this.lang = data;
    return this.storage.set('langDefault', data);
  }

  getPersonData(): Promise<Person> {
    return this.storage.get('personalData');
  }

  setPersonData(data: Person): Promise<Person> {
    this.country = data.country;    
    return this.storage.set('personalData', data);
  }

  clearAll(): Promise<void> {
    AnalyticsFirebase.logEvent('Clear_All_Data')
    return this.storage.clear();
  }

  async addStat(code: number) {
    let lang: string = this.translate.currentLang;
    moment.locale(lang);
    let stats: Stats[] = [];
    let date = moment().format('L');
    let time = moment().format('LTS');
    await this.storage.get('stats').then((data: Stats[]) => {

      if (data) {
        stats = data;
        let dateIndex = data.findIndex(element => element.date == date);
        if (dateIndex != -1) {
          stats[dateIndex].items.push(new StatsItem(code, time));
        } else {
          stats.push(new Stats(date, [new StatsItem(code, time)]))
        }
      } else {
        stats.push(new Stats(date, [new StatsItem(code, time)]))
      }

    });

    await this.storage.set('stats', stats).then(data => {
    });
  }

  getStats(): Promise<any> {
    return this.storage.get('stats');
  }

  clearStats(): Promise<void> {
    return this.storage.remove('stats');
  }

  async init() {
    await this.storage.get('personalData').then( async(data: Person) => {
      if (data) {
        if(data.nameSurname && !data.country){
          await this.storage.set('personalData',new Person(data.nameSurname,data.address,'gr'))
          this.country = 'gr';
        } else {
          this.country = data.country;
        }
      } else {
        this.country = 'gr';
      }      
    })
    await this.storage.get('langDefault').then(data => {
      
      if(data){
        this.translate.setDefaultLang(data);
        this.translate.currentLang = data;
      } else {
        this.translate.setDefaultLang('el');
        this.translate.currentLang = 'el';
      }
      this.lang = this.translate.currentLang;
    })
  }

  getCoutnry() {
    return (this.country ? this.country : 'gr');
  }

  setCountry(value:string){
    this.country = value;
  }

}
