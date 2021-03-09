import {ExerciseGroup, QuickSession} from '../../../types';

export function createSession(
  duration: number,
  group: ExerciseGroup,
): QuickSession {
  const individualDuration = Math.floor(duration / group.exercises.length);
  let session: QuickSession = {
    exercises: [],
    exerciseDurations: [],
  };

  for (let i = 0; i < group.exercises.length; i++) {
    session.exercises.push(group.exercises[i]);
    const exerciseDuration = {
      exerciseId: session.exercises[i].id,
      duration:
        duration - individualDuration < individualDuration
          ? duration
          : individualDuration,
    };
    session.exerciseDurations.push(exerciseDuration);
    duration -= exerciseDuration.duration;
  }

  return session;
}
