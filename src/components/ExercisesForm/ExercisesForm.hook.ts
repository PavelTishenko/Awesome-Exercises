import { useCallback, useEffect, useMemo } from 'react';
import { Alert } from 'react-native';
import { type NavigationProp, useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { baseAPI } from '@/api/base.api';
import { yupResolver } from '@hookform/resolvers/yup';
import { RootStackParamList, Screens } from '@/navigation/RootNavigator';
import {
  ExercisesDifficultyMap,
  ExercisesMusclesMap,
  ExercisesType,
  SelectOption,
} from '@/types';

const EXERCISE_NAME_LENGTH = 30;

type FormValues = {
  exerciseName?: string | undefined;
  type?: string | undefined;
  muscle?: string | undefined;
  difficulty?: string | undefined;
};

const defaultValues: FormValues = {
  exerciseName: '',
  type: '',
  muscle: '',
  difficulty: '',
};

export const useExercisesForm = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [trigger, { data = [], isLoading, isFetching, isSuccess }] =
    baseAPI.endpoints.getExercises.useLazyQuery();

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        exerciseName: yup
          .string()
          .max(
            EXERCISE_NAME_LENGTH,
            `Exercise name should have max ${EXERCISE_NAME_LENGTH} characters`,
          ),
      }),
    [],
  );

  const { control, handleSubmit, formState, watch, reset, getValues } =
    useForm<FormValues>({
      defaultValues: defaultValues,
      resolver: yupResolver(validationSchema),
      mode: 'onSubmit',
    });

  useEffect(() => {
    if (data.length >= 1 && isSuccess) {
      navigation.navigate(Screens.RESULT, { params: data });
      reset();
    }
  }, [data, navigation]);

  const { errors, dirtyFields, isDirty } = formState;
  const isDataLoading = isLoading || isFetching;

  const handleSearchOnPress = useCallback(
    async (formData: FormValues) => {
      try {
        const res = await trigger(formData);

        if (!('data' in res) && !('error' in res)) {
          Alert.alert('Nop', 'There is no such exercises');
        }

        if ('error' in res) {
          Alert.alert('Something goes wrong', 'Please try later');
        }
      } catch (e) {
        Alert.alert('Something goes wrong', e as string);
        console.log(e);
      }
    },
    [trigger],
  );

  const selectTypeOptions = useMemo(() => {
    return Object.values(ExercisesType).map(
      (type): SelectOption => ({
        value: ExercisesType[type],
        label:
          ExercisesType[type].charAt(0).toUpperCase() +
          ExercisesType[type].slice(1),
      }),
    );
  }, []);

  const selectMusclesOptions = useMemo(() => {
    return Object.values(ExercisesMusclesMap).map(
      (type): SelectOption => ({
        value: ExercisesMusclesMap[type],
        label:
          ExercisesMusclesMap[type].charAt(0).toUpperCase() +
          ExercisesMusclesMap[type].slice(1),
      }),
    );
  }, []);

  const selectDifficultyOptions = useMemo(() => {
    return Object.values(ExercisesDifficultyMap).map(
      (type): SelectOption => ({
        value: ExercisesDifficultyMap[type],
        label:
          ExercisesDifficultyMap[type].charAt(0).toUpperCase() +
          ExercisesDifficultyMap[type].slice(1),
      }),
    );
  }, []);

  return {
    selectTypeOptions,
    selectMusclesOptions,
    selectDifficultyOptions,
    control,
    errors,
    isDirty,
    dirtyFields,
    exerciseData: data,
    isDataLoading,
    isSuccess,
    getExercises: handleSubmit(handleSearchOnPress),
  };
};