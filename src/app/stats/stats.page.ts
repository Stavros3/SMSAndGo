import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MainService } from '../services/main/main.service';
import { Stats, StatsItem } from '../models/Stats.model';
import { Location } from '@angular/common';
import { AlertController } from '@ionic/angular';
import { AnalyticsFirebase } from '@ionic-native/analytics-firebase';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss'],
})
export class StatsPage implements OnInit {
  public stats: Stats[] = [];
  public country:string = 'gr';
  constructor(public translate: TranslateService,
    public main: MainService,
    private location: Location,
    public alertController: AlertController) {
      AnalyticsFirebase.setCurrentScreen('view_stats')
      this.country = this.main.getCoutnry();
  }

  async ngOnInit() {
    await this.main.getStats().then((data: Stats[]) => {
      if(data){
        this.stats = data.reverse();
        data.forEach((data, index) => {
          this.stats[index].items = data.items.reverse()
        })
      }
    });
  }

  async onDelete() {    
    
    this.translate.getTranslation(this.translate.currentLang).subscribe(async (data) => {
      
      const alert = await this.alertController.create({
        header: data.clearData.title,
        buttons: [{
          text: data.yes,
          handler: async () => {
            await this.main.clearStats()
            this.stats=[];
          }
        },
        {
          text: data.no,
          handler: () => {
            
          }
        }]
      });
      await alert.present();
    })
  }

  onBack() {
    this.location.back();
  }
}
