import { Component, Input, OnInit } from '@angular/core';
import { ProfileService } from '../../services/api/profile.service';

@Component({
  selector: 'app-course-save-button',
  standalone: true,
  providers: [ProfileService],
  templateUrl: './course-save-button.component.html',
  styleUrl: './course-save-button.component.scss',
})
export class CourseSaveButtonComponent implements OnInit {
  @Input() courseId: number;

  // PRIVATE VARS

  // PUBLIC VARS
  public isSaved = false;

  constructor(private profileService: ProfileService) {}

  // PRIVATE FUNCS
  private setSavedCourse(savedCourseIds: number[]) {
    this.isSaved = savedCourseIds.indexOf(this.courseId) >= 0;
  }
  private updateSavedCourses(toBeSaved: boolean) {
    if (toBeSaved) {
      this.profileService.saveCourse(this.courseId).subscribe(
        (savedCourseIds: number[]) => {
          this.setSavedCourse(savedCourseIds);
        },
        () => {
          // error
        }
      );
    } else {
      this.profileService.removeCourse(this.courseId).subscribe(
        (savedCourseIds: number[]) => {
          this.setSavedCourse(savedCourseIds);
        },
        () => {
          // error
        }
      );
    }
  }

  // PUBLIC FUNCS
  public toggleSavedCourse() {
    this.updateSavedCourses(!this.isSaved);
  }

  // NG DECLARES
  ngOnInit() {
    // get saved courses
    this.profileService.getSavedCourses().subscribe(
      (savedCourseIds: number[]) => {
        this.setSavedCourse(savedCourseIds);
      },
      () => {
        // error
      }
    );
  }
}
