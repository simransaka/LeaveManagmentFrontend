import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyLeavePolicyComponent } from './company-leave-policy.component';

describe('CompanyLeavePolicyComponent', () => {
  let component: CompanyLeavePolicyComponent;
  let fixture: ComponentFixture<CompanyLeavePolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyLeavePolicyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyLeavePolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
