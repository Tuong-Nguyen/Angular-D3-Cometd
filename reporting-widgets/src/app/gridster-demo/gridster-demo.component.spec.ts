import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridsterDemoComponent } from './gridster-demo.component';

describe('GridsterDemoComponent', () => {
  let component: GridsterDemoComponent;
  let fixture: ComponentFixture<GridsterDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridsterDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridsterDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
