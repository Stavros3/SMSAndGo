import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { Person } from '../models/person.model';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

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
    private storage: Storage,
    public formBuilder: FormBuilder,
    private modalCtrl:ModalController) {

    this.personalInfoForm = this.formBuilder.group({
      nameSurname: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(80), Validators.minLength(2)])),
      address: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(250), Validators.minLength(2)]))
    })


  }

  ngOnInit() {
    this.storage.get('personalData').then((data: Person) => {
      if (data) {
        this.personalInfoForm.setValue({ nameSurname: data.nameSurname, address: data.address })
        this.showBack = true;
      }
    })
  }

  onSave(value: Person) {
    this.storage.set('personalData', value).then(async () => {
      this.modalCtrl.dismiss({
        'dismissed': true
      });
    })
  }

  onBack() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

}
