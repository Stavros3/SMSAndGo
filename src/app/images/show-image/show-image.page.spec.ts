import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ShowImagePage } from './show-image.page';

describe('ShowImagePage', () => {
  let component: ShowImagePage;
  let fixture: ComponentFixture<ShowImagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowImagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ShowImagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
