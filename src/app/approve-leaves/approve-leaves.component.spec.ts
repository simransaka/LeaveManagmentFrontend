import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveLeavesComponent } from './approve-leaves.component';

describe('ApproveLeavesComponent', () => {
  let component: ApproveLeavesComponent;
  let fixture: ComponentFixture<ApproveLeavesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApproveLeavesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApproveLeavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
