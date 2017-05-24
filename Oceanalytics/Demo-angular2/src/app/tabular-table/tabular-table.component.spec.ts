import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabularTableComponent } from './tabular-table.component';

xdescribe('TabularTableComponent', () => {
  let component: TabularTableComponent;
  let fixture: ComponentFixture<TabularTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabularTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabularTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
