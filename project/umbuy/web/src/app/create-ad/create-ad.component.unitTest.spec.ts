import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '../auth/auth.service';
import { CreateAdComponent } from './create-ad.component';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/throw';
import { Advertisement } from '../api/advertisement';
import { User } from '../api/user';
import { HttpClient } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AdvertisementService } from '../services/advertisement.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('CreateAdComponent', () => {
  let component: CreateAdComponent;
  let fixture: ComponentFixture<CreateAdComponent>;
  let router: Router;
  let service: AdvertisementService;
  let authService: AuthService;
  let newAd;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterModule, FormsModule, RouterTestingModule],
      declarations: [ CreateAdComponent ],
      providers: [AdvertisementService, AuthService, User, Advertisement, HttpClient, HttpHandler]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAdComponent);
    service = TestBed.get(AdvertisementService);
    router = TestBed.get(Router);
    authService = TestBed.get(authService);
    component = new CreateAdComponent(service, router, authService);
    newAd = { 
      "userId": 'auth0|5a8cfd24f5c8213cb27d5ec2', 
      "title": 'luffy', 
      "description": 'test', 
      "price": 23.14,
      "imageUrl": 'https://s3.amazonaws.com/kyleteam6best/default.jpg',
      "category": ' test'
    };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call server to save the changes when an advertisement is created', () => {
    // arrange
    let spy = spyOn(service, 'createAd').and.callFake(ad => {
      return Observable.empty();
    });

    // act
    component.createAd();

    // assert
    expect(spy).toHaveBeenCalled();
  });
  

  it ('should fail when given empty parameters for advertisement input fields', () => {
   
    component.activateSubmit();

    expect(component.createAdSuccess).toBeFalsy();
    expect(component.validAdMsg).toContain('fill');
  });

  
  it ('should succeed when given valid parameters for advertisement input fields', () => {
    component.title = 'somethign';
    component.description = 'test';
    component.price = 20;
    component.category = 'test';

    component.activateSubmit();

    expect(component.createAdSuccess).toBeTruthy();
    expect(component.validAdMsg).toBe('');
  });


  //TODO UNIT TESTS FOR
  // backToHomePage
  // uploadFile
  // previewFile
  // validateFile
});
