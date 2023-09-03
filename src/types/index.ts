import {
  ExerciseMuscles,
  ExercisesDifficulty,
  ExerciseType,
} from '@/api/types.api';

export type SelectOption = {
  value: string;
  label: string;
};

export const ExercisesType: {
  [P in ExerciseType]: P;
} = {
  cardio: 'cardio',
  olympic_weightlifting: 'olympic_weightlifting',
  plyometrics: 'plyometrics',
  powerlifting: 'powerlifting',
  strength: 'strength',
  stretching: 'stretching',
  strongman: 'strongman',
};

export const ExercisesMusclesMap: {
  [P in ExerciseMuscles]: P;
} = {
  abdominals: 'abdominals',
  abductors: 'abductors',
  adductors: 'adductors',
  biceps: 'biceps',
  calves: 'calves',
  chest: 'chest',
  forearms: 'forearms',
  glutes: 'glutes',
  hamstrings: 'hamstrings',
  lats: 'lats',
  lower_back: 'lower_back',
  middle_back: 'middle_back',
  neck: 'neck',
  quadriceps: 'quadriceps',
  traps: 'traps',
  triceps: 'triceps',
};

export const ExercisesDifficultyMap: {
  [P in ExercisesDifficulty]: P;
} = {
  beginner: 'beginner',
  intermediate: 'intermediate',
  expert: 'expert',
};
