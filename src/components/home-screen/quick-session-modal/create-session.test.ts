import {Exercise, ExerciseGroup} from '../../../types';
import {randomIntFromInterval} from '../../../util/random-int-from-interval';
import {createSession} from './create-session';

const testGroup = new ExerciseGroup('group', [
  new Exercise('ex1'),
  new Exercise('ex2'),
  new Exercise('ex3'),
  new Exercise('ex4'),
  new Exercise('ex5'),
  new Exercise('ex6'),
  new Exercise('ex7'),
  new Exercise('ex8'),
]);

describe('createSession function', () => {
  test('it returns a QuickSession with the correct total duration across its exercises', () => {
    const totalDuration = randomIntFromInterval(20, 60);
    const session = createSession(totalDuration, testGroup);
    const sessionDuration = session.exerciseDurations
      .map((d) => d.duration)
      .reduce((p, c) => {
        return p + c;
      }, 0);

    expect(sessionDuration).toBe<number>(totalDuration);
  });

  test.todo(
    'the returned session will not add more exercises than a number that will allow each exercise to be at least 5 minutes long',
  );
});
