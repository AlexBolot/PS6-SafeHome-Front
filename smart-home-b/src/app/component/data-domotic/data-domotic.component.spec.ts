import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataDomoticComponent } from './data-domotic.component';

describe('DataDomoticComponent', () => {
  let component: DataDomoticComponent;
  let fixture: ComponentFixture<DataDomoticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataDomoticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataDomoticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
