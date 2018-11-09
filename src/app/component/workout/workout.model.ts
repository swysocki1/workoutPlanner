import * as moment from 'moment';
import {Exercise} from '../exercise/exercise.model'


export class Workout {
    _id: string;
    name: string;
    description: string;
    exercises: Exercise[];
    owner: string; 
    color: string;
    sharedWith: string[];
    isShared: boolean = false;
}
