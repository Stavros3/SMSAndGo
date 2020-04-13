import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Person } from 'src/app/models/person.model';
import { AnalyticsFirebase } from '@ionic-native/analytics-firebase';

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
}
