import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AddComponent } from './add.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { BusinessUnitService } from '../../services/business-unit.service';
import { AdalService } from 'adal-angular4';
import { Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { NotificationsService } from 'angular2-notifications';

class BusinessUnitServiceStub {
  createBusinessUnit(formData: any) {
    return of({});
  }
  searchBUUser(buHead: any) {}
  getBUGroups() {}
}

class RouterStub {
  navigate(url: string) {
    return url;
  }
}

class ActivatedRouteStub {
  public data = of({
    resolveBUGroup: {
      value: {
        name: 'BUgroup'
      }
    }
  });
}

class NotificationsServiceStub {
  success(text: any) {
    return text;
  }
  error(text: any) {
    return text;
  }
}

fdescribe('AddComponent', () => {
  let component: AddComponent;
  let fixture: ComponentFixture<AddComponent>;
  let _businessUnitService: BusinessUnitService;
  let _router: Router;
  let _notificationService: NotificationsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      declarations: [AddComponent],
      providers: [
        { provide: BusinessUnitService, useClass: BusinessUnitServiceStub }, //Usevalue if it is hardcoded data
        AdalService,
        { provide: Router, useClass: RouterStub },
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        { provide: NotificationsService, useClass: NotificationsServiceStub }
      ]
    }).compileComponents();
    _businessUnitService = TestBed.get(BusinessUnitService);
    _router = TestBed.get(Router);
    _notificationService = TestBed.get(NotificationsService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    //for commonly used variables and values declare here
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get business unit groups', () => {
    let data = {
      name: 'business unit groups'
    };
    spyOn(_businessUnitService, 'getBUGroups').and.returnValue(of(data));
    component.getBUGroup();
    expect(component.testCaseVariable).toBe(true);
  });

  it('should create new business unit', () => {
    let data = {
      name: 'businessTest'
    };
    spyOn(_businessUnitService, 'createBusinessUnit').and.returnValue(of(data));
    spyOn(_router, 'navigate');
    spyOn(_notificationService, 'success');
    let formData = {
      id: 0,
      name: '',
      shortName: '',
      description: '',
      owner: '',
      modifiedDate: '',
      createdDate: '',
      userGroup: '',
      createdBy: '',
      modifiedBy: '',
      imgData: ''
    };
    let notificationSuccessMessage = 'Business Unit Created Successfully';
    component.createBusinessUnit(formData);
    expect(_notificationService.success).toHaveBeenCalledWith(
      notificationSuccessMessage
    );
    expect(_router.navigate).toHaveBeenCalled();
  });
});
