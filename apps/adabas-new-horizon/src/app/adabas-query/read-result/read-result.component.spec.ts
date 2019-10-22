import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadResultComponent } from './read-result.component';

describe('ReadResultComponent', () => {
  let component: ReadResultComponent;
  let fixture: ComponentFixture<ReadResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
