import {Component, Input} from '@angular/core';
import {CalendarDay} from '../calendar.model';
import {ModalService} from '../../modal/modal.service';
import {Workout} from '../../workout/workout.model';
import {ModalComponent} from "../../modal/modal.component";





@Component({
  selector: 'calendar-day',
  templateUrl: './day.html',
  styles: [`
    .day {
      opacity: .25;
      height: 0;
      padding-bottom: 100%;
    }
    .day.valid-month {
      opacity: 1;
    }
    .workout {
      margin: 5px;
    }
    .breakfast, .lunch, .dinner, .snack { }
  `]
})
export class DayComponent {
  @Input() day: CalendarDay;
  @Input() workouts: Array<Workout>;;
  @Input() modal: ModalComponent;

  constructor() {}

  
  show(workout: Workout) {
    
    var html = 
    `
    <div class='card'>
      <div class='card-header text-white' style='background-color: ${workout.color};'>
        <h2>${workout.name}</h2>
        <h4>${workout.description}</h4>
      </div>
      <div class='card-body bg-light'>
      <table class='table'>
    `;
    
  
    var count = 1;
    var temp;
    workout.exercises.forEach((exercise) => {
      if (count == 4) {
        count = 1;
        html +=`
          <td>
            <div>
              <p>${exercise.name}</p>
              <p>${exercise.sets} X ${exercise.reps}</p>
            </div>
          </td>
        </tr>
        `;
     

      }
      else if (count == 1) {
        html +=`
        <tr>
          <td>
            <div>
              <p>${exercise.name}</p>
              <p>${exercise.sets} X ${exercise.reps}</p>
            </div>
          </td>
        `;
        
        count++;
      }
      else {
        html +=`
        <td>
          <div>
            <p>${exercise.name}</p>
            <p>${exercise.sets} X ${exercise.reps}</p>
          </div>
        </td>
        `;
        
        count ++;
      }

    }) 

    html += "</table></div></div>";

    this.modal.show(html);

    
  }

  hide() {
    this.modal.hide();
  }

  
  
}
