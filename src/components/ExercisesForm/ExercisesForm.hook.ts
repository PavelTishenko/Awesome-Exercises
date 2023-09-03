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
import { capitalizeFirstLetter } from '@/utils/textUtils';

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
  const [trigger, { isLoading, isFetching }] =
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

  const { control, handleSubmit, formState, reset } = useForm<FormValues>({
    defaultValues: defaultValues,
    resolver: yupResolver(validationSchema),
    mode: 'onSubmit',
  });

  const { isDirty } = formState;
  const isDataLoading = isLoading || isFetching;

  const handleSearchOnPress = useCallback(
    async (formData: FormValues) => {
      try {
        const res = await trigger(formData);

        if (res.data && res?.data?.length >= 1 && res.isSuccess) {
          navigation.navigate(Screens.RESULT, { params: res.data });
          reset();
        }

        if (res.data && res?.data?.length < 1 && !res.isError) {
          Alert.alert('Nop', 'There is no such exercises', [
            { text: 'OK', onPress: () => reset() },
          ]);
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
        label: capitalizeFirstLetter(ExercisesType[type]),
      }),
    );
  }, []);

  const selectMusclesOptions = useMemo(() => {
    return Object.values(ExercisesMusclesMap).map(
      (type): SelectOption => ({
        value: ExercisesMusclesMap[type],
        label: capitalizeFirstLetter(ExercisesMusclesMap[type]),
      }),
    );
  }, []);

  const selectDifficultyOptions = useMemo(() => {
    return Object.values(ExercisesDifficultyMap).map(
      (type): SelectOption => ({
        value: ExercisesDifficultyMap[type],
        label: capitalizeFirstLetter(ExercisesDifficultyMap[type]),
      }),
    );
  }, []);

  return {
    selectTypeOptions,
    selectMusclesOptions,
    selectDifficultyOptions,
    control,
    isDirty,
    isDataLoading,
    getExercises: handleSubmit(handleSearchOnPress),
  };
};
