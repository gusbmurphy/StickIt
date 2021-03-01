import {ExerciseGroup, FocusArea} from '../types';

const areas = [
  new FocusArea('Speed & Agility', [
    new ExerciseGroup('Hand Speed'),
    new ExerciseGroup('Foot Speed'),
    new ExerciseGroup('Rudiments'),
  ]),
  new FocusArea('Creativity & Improvisation', [
    new ExerciseGroup('Using Space'),
    new ExerciseGroup('Melodic Embelishment'),
  ]),
  new FocusArea('Style & Vocabulary', [
    new ExerciseGroup('Max Roach Patterns'),
    new ExerciseGroup('Verbs'),
    new ExerciseGroup('Nouns'),
  ]),
  new FocusArea('Precision & Timekeeping', [
    new ExerciseGroup('Playing Slow'),
    new ExerciseGroup('Hours & Minutes'),
    new ExerciseGroup('Military Time'),
  ]),
];

export default areas;
