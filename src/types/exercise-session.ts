import {Exercise} from './exercise';

export type ExerciseSession = {
  exercises: Exercise[];
  exerciseDurations: {exerciseId: string; duration: number}[];
};
