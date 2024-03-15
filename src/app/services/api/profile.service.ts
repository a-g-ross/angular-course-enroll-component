import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

// temp data serve/collection
import savedCourseData from './tempdata/saved-courses.json';

@Injectable({
  providedIn: 'root',
})
export class ProfileService extends BaseService {
  private _classScheduleUrl = `${this.API_URL}/api/profile/saved/courses`;

  private _savedCourses: number[] = [];

  constructor(private httpClient: HttpClient) {
    super();
  }

  public getSavedCourses(): Observable<number[]> {
    // if saved return saved data
    if (this._savedCourses) {
      return of(this._savedCourses);
    }
    // get saved courses from api
    // const url = `${this._classScheduleUrl}`;
    // return this.httpClient.get(url, this.httpOptions) as Observable<number[]>;

    // temp result "fake" data
    const result = savedCourseData as number[];
    this._savedCourses = result;
    return of(result);
  }
  public saveCourse(courseId: number): Observable<number[]> {
    // add course to savedCourses
    this._savedCourses.push(courseId);
    // set saved course based on course id from api
    // const url = `${this._classScheduleUrl}/${courseId}`;
    // return this.httpClient.post('/assets/schedule.json', this._savedCourses, this.httpOptions) as Observable<number[]>;

    // temp return "fake" data
    return of(this._savedCourses);
  }
  public removeCourse(courseId: number): Observable<number[]> {
    const index = this._savedCourses.indexOf(courseId);
    if (index > -1) {
      this._savedCourses.splice(index, 1);
    }
    // remove saved course based on course id from api
    // const url = `${this._classScheduleUrl}/${courseId}`;
    // return this.httpClient.delete('/assets/schedule.json', this.httpOptions) as Observable<number[]>;

    // temp return "fake" data
    return of(this._savedCourses);
  }
}
