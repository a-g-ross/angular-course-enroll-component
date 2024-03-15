import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BaseService } from './base.service';
import { IClass } from '../../models/class.model';
// temp data serve/collection
import scheduleData from './tempdata/class-schedule.json';

@Injectable({
  providedIn: 'root',
})
export class ClassService extends BaseService {
  private classScheduleUrl = `${this.API_URL}/api/courses/<course_id>/schedule`;

  constructor(private httpClient: HttpClient) {
    super();
  }

  public getScheduledClasses(courseId: number): Observable<IClass[]> {
    // const url = `${this.scheduleUrl.replace('<course_id>', `${courseId}`)}`;
    // return this.httpClient.get(url, this.httpOptions) as Observable<IClass[]>;

    return of(scheduleData as IClass[]);
  }
}
