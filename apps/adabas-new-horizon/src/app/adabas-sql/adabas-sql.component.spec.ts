import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdabasSqlComponent } from './adabas-sql.component';

describe('AdabasSqlComponent', () => {
  let component: AdabasSqlComponent;
  let fixture: ComponentFixture<AdabasSqlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdabasSqlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdabasSqlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
