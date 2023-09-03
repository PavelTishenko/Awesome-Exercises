export type ExerciseType =
  | 'cardio'
  | 'olympic_weightlifting'
  | 'plyometrics'
  | 'powerlifting'
  | 'strength'
  | 'stretching'
  | 'strongman';

export type ExerciseMuscles =
  | 'abdominals'
  | 'abductors'
  | 'adductors'
  | 'biceps'
  | 'calves'
  | 'chest'
  | 'forearms'
  | 'glutes'
  | 'hamstrings'
  | 'lats'
  | 'lower_back'
  | 'middle_back'
  | 'neck'
  | 'quadriceps'
  | 'traps'
  | 'triceps';

export type ExercisesDifficulty = 'beginner' | 'intermediate' | 'expert';

export type Response = {
  difficulty?: string;
  equipment?: string;
  instructions?: string;
  muscle?: string;
  name?: string;
  type?: string;
};

export type Exercise = {
  name?: string;
  type?: string;
  muscle?: string;
  difficulty?: string;
} & Response;
