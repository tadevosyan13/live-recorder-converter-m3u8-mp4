import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideojsRecordComponent } from './videojs-record.component';

describe('VideojsRecordComponent', () => {
  let component: VideojsRecordComponent;
  let fixture: ComponentFixture<VideojsRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideojsRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideojsRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
