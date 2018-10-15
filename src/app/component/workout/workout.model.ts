import * as moment from 'moment';
import {Exercise} from '../exercise/exercise.model'


export class Workout {
    id: string;
    name: string;
    description: string;
    exercises: Array<Exercise>;
    owner: string; 
}
