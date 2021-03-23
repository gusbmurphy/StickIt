import {Exercise, ExerciseGroup, FocusArea} from '../types';
import {random} from 'faker';
import {randomIntFromInterval} from './random-int-from-interval';
import {ExerciseSession} from '../types/quick-session';

export function generateExercise() {
  return new Exercise(random.words(randomIntFromInterval(1, 3)));
}

export function generateExerciseGroup() {
  let exercises: Exercise[] = [];
  for (let i = 1; i <= randomIntFromInterval(3, 12); i++) {
    exercises.push(generateExercise());
  }

  return new ExerciseGroup(
    random.words(randomIntFromInterval(1, 4)),
    exercises,
  );
}

export function generateFocusArea() {
  let groups: ExerciseGroup[] = [];
  for (let i = 1; i <= randomIntFromInterval(3, 6); i++) {
    groups.push(generateExerciseGroup());
  }

  return new FocusArea(random.words(randomIntFromInterval(1, 3)), groups);
}

export function generateFocusAreas(numOfAreas: number) {
  let areas: FocusArea[] = [];
  for (let i = 1; i <= numOfAreas; i++) {
    areas.push(generateFocusArea());
  }

  return areas;
}

export function generateSession(): ExerciseSession {
  const group = generateExerciseGroup();

  const totalDuration = randomIntFromInterval(20, 60);
  const durations = group.exercises.map((exercise) => {
    return {
      exerciseId: exercise.id,
      duration: Math.floor(totalDuration / group.exercises.length),
    };
  });

  return {
    exercises: group.exercises,
    exerciseDurations: durations,
  };
}
