import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
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
    private storage: Storage,
    private modalCtrl: ModalController,
    private camera: Camera) { }

  ngOnInit() {
    this.storage.get('imagePermit').then((data) => {
      if (data) {
        this.imageExist = true;
      }
    })
  }

  onTakePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.storage.set('imagePermit', base64Image).then(() => {
        this.imageExist = true;
      }).catch(err=>{alert('Image did not saved on storage')})
    }, (err) => {
      // Handle error
    });
  }

  changeListener(imageInput: any) {
    const file:File =imageInput.files[0];
    
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
      this.storage.set('imagePermit', this.selectedFile.src).then(() => {
        this.imageExist = true;
      })
    })
    reader.readAsDataURL(file);

  }

  onBack() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  onDelete(){
    this.storage.remove('imagePermit').then(() => {
      this.imageExist = false;
    })
  }
}

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}