import {v4 as uuid} from 'uuid';
import {Exercise} from './exercise';

export class ExerciseGroup {
  name: string;
  id: string;
  exercises: Exercise[];

  constructor(name: string, exercises: Exercise[] = []) {
    this.name = name;
    this.id = uuid();
    this.exercises = exercises;
  }
}
