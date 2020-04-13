import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Person } from '../models/person.model';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { MainService } from '../services/main/main.service';
import { AnalyticsFirebase } from '@ionic-native/analytics-firebase';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.page.html',
  styleUrls: ['./personal-info.page.scss']
})
export class PersonalInfoPage implements OnInit {
  public nameSurname: string;
  public address: string;
  public personalInfoForm: FormGroup;
  public showBack: boolean = false;
  constructor(
    public translate: TranslateService,
    public formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    public mainService: MainService) {

    this.personalInfoForm = this.formBuilder.group({
      nameSurname: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(80), Validators.minLength(2)])),
      address: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(250), Validators.minLength(2)]))
    })


  }

  ngOnInit() {
    this.mainService.getPersonData().then((data: Person) => {
      if (data) {
        this.personalInfoForm.setValue({ nameSurname: data.nameSurname, address: data.address })
        this.showBack = true;
      }
    })
  }

  onSave(value: Person) {
    this.mainService.setPersonData(value).then(async () => {
      AnalyticsFirebase.logEvent('Personal_Info_Saved').finally(() => {
        this.modalCtrl.dismiss({
          'dismissed': true
        });
      })
    })
  }

  onBack() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

}
