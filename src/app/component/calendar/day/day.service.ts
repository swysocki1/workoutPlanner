import {Injectable} from '@angular/core';
import {Day} from '../calendar.model';
import {Observable} from "rxjs";
import * as moment from 'moment';
import { ExternalRequestsService } from '../../../../services/externalRequests.service';

@Injectable()
export class DayService {
    constructor(private er: ExternalRequestsService) { }

    getWorkoutsForDay(userId, date): Observable<Object>{
        return this.er.getWorkoutsForDay(userId, date);
    }

    addWorkoutForDay(obj) {
        return this.er.addWorkoutForDay(obj);
    }

    deleteWorkoutForDay(obj) {
        //return this.er.deleteWorkoutForDay(obj);
    }

}