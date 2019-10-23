import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdabasQueryComponent } from './adabas-query.component';

describe('AdabasQueryComponent', () => {
  let component: AdabasQueryComponent;
  let fixture: ComponentFixture<AdabasQueryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdabasQueryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdabasQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
