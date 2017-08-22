import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarchartFormComponent } from './barchart-form.component';

describe('BarchartFormComponent', () => {
  let component: BarchartFormComponent;
  let fixture: ComponentFixture<BarchartFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarchartFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarchartFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
