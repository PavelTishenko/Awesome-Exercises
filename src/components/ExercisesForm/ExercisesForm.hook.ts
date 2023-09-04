import { useCallback, useMemo } from 'react';
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
} from '@/types';
import { selectOptions } from '@/utils/selectUtils';

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
      }
    },
    [trigger],
  );

  const selectTypeOptions = useMemo(() => selectOptions(ExercisesType), []);

  const selectMusclesOptions = useMemo(
    () => selectOptions(ExercisesMusclesMap),
    [],
  );

  const selectDifficultyOptions = useMemo(
    () => selectOptions(ExercisesDifficultyMap),
    [],
  );

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
