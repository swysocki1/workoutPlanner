import * as moment from 'moment';
import {Exercise} from '../exercise/exercise.model'


export class Workout {
    _id: string;
    name: string;
    description: string;
    exercises: Exercise[];
    owner: string; 
    color: string;
    sharedWith: Shared[];
    isShared: boolean = false;
}

export class Shared {
    id: string
    username: string;
}
