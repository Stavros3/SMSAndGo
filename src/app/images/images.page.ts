import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { MainService } from '../services/main/main.service';
import { AnalyticsFirebase } from '@ionic-native/analytics-firebase';
//https://www.freecodecamp.org/news/how-to-make-image-upload-easy-with-angular-1ed14cb2773b/
@Component({
  selector: 'app-images',
  templateUrl: './images.page.html',
  styleUrls: ['./images.page.scss'],
})
export class ImagesPage implements OnInit {
  public imageExist: boolean = false;
  private selectedFile: ImageSnippet;
  constructor(public translate: TranslateService,
    private modalCtrl: ModalController,
    private camera: Camera,
    public mainService: MainService) { }

  ngOnInit() {
    this.mainService.getImage().then((data) => {
      if (data) {
        this.imageExist = true;
      }
    })
  }

  onTakePicture() {
    const options: CameraOptions = {
      quality: 65,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      AnalyticsFirebase.logEvent('Image_Saved_From_Camera').finally(() => {
        this.mainService.saveImage(base64Image).then(() => {
          this.imageExist = true;
        }).catch(err => { alert('Image did not saved on storage') })
      })
    }, (err) => {
      // Handle error
    });
  }

  changeListener(imageInput: any) {
    const file: File = imageInput.files[0];

    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
      AnalyticsFirebase.logEvent('Image_Saved_From_File').finally(() => {
        this.mainService.saveImage(this.selectedFile.src).then(() => {
          this.imageExist = true;
        })
      })
    })
    reader.readAsDataURL(file);

  }

  onBack() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  onDelete() {
    this.mainService.crearImage().then(() => {
      this.imageExist = false;
    })
  }
}

class ImageSnippet {
  constructor(public src: string, public file: File) { }
}