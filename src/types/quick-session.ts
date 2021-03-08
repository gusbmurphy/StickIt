import {Exercise} from './exercise';

export type QuickSession = {
  exercises: Exercise[];
  exerciseDurations: {exerciseId: string; duration: number}[];
};
