import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DomoticItemComponent } from './domotic-item.component';

describe('DomoticItemComponent', () => {
  let component: DomoticItemComponent;
  let fixture: ComponentFixture<DomoticItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DomoticItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DomoticItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
