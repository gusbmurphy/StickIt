import {v4 as uuid} from 'uuid';
import {ExerciseGroup} from './exercise-group';

export class FocusArea {
  name: string;
  id: string;
  exerciseGroups: ExerciseGroup[];

  constructor(name: string, exerciseGroups: ExerciseGroup[] = []) {
    this.name = name;
    this.id = uuid();
    this.exerciseGroups = exerciseGroups;
  }
}
