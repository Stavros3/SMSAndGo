import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Person } from 'src/app/models/person.model';
import { AnalyticsFirebase } from '@ionic-native/analytics-firebase';
import { Stats, StatsItem } from 'src/app/models/Stats.model';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private storage: Storage) { }

  saveImage(data: any): Promise<any> {
    return this.storage.set('imagePermit', data);
  }

  getImage(): Promise<any> {
    return this.storage.get('imagePermit');
  }

  async crearImage(): Promise<void> {
    await AnalyticsFirebase.logEvent('Image_Deleted');
    return this.storage.remove('imagePermit');
  }

  getDefauldLang(): Promise<any> {
    return this.storage.get('langDefault');
  }

  async setDefauldLang(data: string): Promise<any> {
    await AnalyticsFirebase.logEvent('Language_Change', { lang: data });
    return this.storage.set('langDefault', data);
  }

  getPersonData(): Promise<Person> {
    return this.storage.get('personalData');
  }

  setPersonData(data: Person): Promise<Person> {
    return this.storage.set('personalData', data);
  }

  async clearAll(): Promise<void> {
    await AnalyticsFirebase.logEvent('Clear_All_Data')
    return this.storage.clear();
  }

  async addStat(code: number) {
    let lang: string;
    await this.getDefauldLang().then(data => lang = data);
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
      console.log(data);
    });
  }

  getStats(): Promise<any> {
    return this.storage.get('stats');
  }

  clearStats(): Promise<void> {
    return this.storage.remove('stats');
  }
}
