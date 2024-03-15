import { Component, Input, OnInit } from '@angular/core';
import { ClassService } from '../../services/api/class.service';
import { CommonModule } from '@angular/common';
import { Class, ClassDate } from '../../models/class.model';
import { CourseSaveButtonComponent } from '../course-save-button/course-save-button.component';
import { Subject, takeUntil } from 'rxjs';
import moment from 'moment';
import 'moment-timezone';

@Component({
  selector: 'app-class-enroll',
  standalone: true,
  imports: [CommonModule, CourseSaveButtonComponent],
  providers: [ClassService],
  templateUrl: './class-enroll.component.html',
  styleUrl: './class-enroll.component.scss',
})
export class ClassEnrollComponent implements OnInit {
  @Input() courseId: number = 0;

  // PRIVATE VARS
  private _destroyed$: Subject<void> = new Subject();

  constructor(private classService: ClassService) {}

  // PUBLIC VARS
  public classes: Class[] = [];
  public selectedClassId = 0;

  // PUBLIC FUNCS
  public getClassDayTitle(dates: ClassDate[]): string {
    if (dates.length === 1) {
      // return single date
      return moment(dates[0].startDateTime).format('dddd, MMMM D');
    } else {
      // return multiple days
      const day1 = moment(dates[0].startDateTime);
      const day2 = moment(dates[1].startDateTime);
      let datesString = `${day1.format('MMMM D')}`;
      // check if dates are in the same month
      if (day1.get('M') === day2.get('M')) {
        datesString += ` & ${day2.format('D')}`;
      } else {
        datesString += ` & ${day2.format('MMMM D')}`;
      }
      return `${day1.format('dddd')} & ${day2.format('dddd')}, ${datesString}`;
    }
  }

  public getClassDateTime(dates: ClassDate[]) {
    // return datetime from first day (remove minutes if on the hour)
    const dayStart = moment(dates[0].startDateTime)
      .format('h:mm a')
      .replace(/(:00)/g, '');
    const dayEnd = moment(dates[0].endDateTime)
      .format('h:mm a')
      .replace(/(:00)/g, '');

    return `${dayStart} - ${dayEnd}`;
  }

  public getTimezoneCity(tz: string) {
    return tz.split('/')[1].replace('_', ' ');
  }

  public getClassPriceUntil(date: Date): string {
    return moment(date).format('MMMM D');
  }

  public setSelectedClass(classId: number) {
    this.selectedClassId = classId;
  }

  // NG FUNCS
  ngOnDestroy() {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  ngOnInit() {
    // set default timezone
    moment.tz.setDefault('America/New_York');

    // get scheduled classes
    this.classService
      .getScheduledClasses(this.courseId)
      .pipe(takeUntil(this._destroyed$))
      .subscribe(
        (response) => {
          this.classes = response.map((c) => {
            return new Class({
              id: c?.id,
              timeZone: c?.location?.timezone,
              pricingAmount: c?.pricing?.amount,
              pricingCurrency: c?.pricing?.currency,
              priceValidUntil: new Date(c?.pricing?.valid_until * 1000),
              instructorName: c?.instructors[0].first_name ?? '',
              instructorImage: c?.instructors[0]?.portrait_image ?? '',
              dates: c.dates.map(
                (x) =>
                  new ClassDate({
                    // convert unix timestamp to datetime (unix * 1000)
                    startDateTime: new Date(x[0] * 1000),
                    endDateTime: new Date(x[1] * 1000),
                  })
              ),
            });
          });
        },
        () => {
          // error
        }
      );
  }
}
