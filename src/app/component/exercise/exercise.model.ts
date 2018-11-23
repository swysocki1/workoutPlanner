import * as moment from 'moment';

export class Exercise {
  _id: string;
  name: string;
  description: string;
  sets: number;
  reps: number;
  weights: Weight[];
}

export class Weight {
  _id: string;
  dayId: string;
  weight: number;
}

