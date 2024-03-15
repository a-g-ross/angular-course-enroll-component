import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseSaveButtonComponent } from './course-save-button.component';

describe('CourseSaveButtonComponent', () => {
  let component: CourseSaveButtonComponent;
  let fixture: ComponentFixture<CourseSaveButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseSaveButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CourseSaveButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
