import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataDomoticListComponent } from './data-domotic-list.component';

describe('DataDomoticListComponent', () => {
  let component: DataDomoticListComponent;
  let fixture: ComponentFixture<DataDomoticListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataDomoticListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataDomoticListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
