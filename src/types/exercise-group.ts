import {v4 as uuid} from 'uuid';
import {Exercise} from './exercise';

export class ExerciseGroup {
  name: string;
  id: string;
  private _exercises: Exercise[];

  constructor(name: string, exercises?: Exercise[]) {
    this.name = name;
    this.id = uuid();
    if (exercises) {
      exercises.forEach((exercise) => {
        exercise.parentGroupId = this.id;
      });
      this._exercises = exercises;
    } else {
      this._exercises = [];
    }
  }

  get exercises() {
    return this._exercises;
  }

  addExercise(newExercise: Exercise) {
    newExercise.parentGroupId = this.id;
    this._exercises.push(newExercise);
  }
}
