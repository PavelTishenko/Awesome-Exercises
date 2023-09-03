import React from 'react';
import { StyleSheet } from 'react-native';
import { StyleProp, View, ViewStyle } from 'react-native';
import {
  Button,
  TextInput,
  TextInputProps,
  useTheme,
} from 'react-native-paper';

import FormItem from '../FormItem/FormItem';
import { Select } from '../Select';
import { useExercisesForm } from './ExercisesForm.hook';

const MARGIN_BOTTOM_CARD = 30;

type ExercisesFormProps = {
  containerStyle?: StyleProp<ViewStyle>;
} & TextInputProps;

const ExercisesForm = (props: ExercisesFormProps) => {
  const { containerStyle } = props;
  const {
    control,
    isDirty,
    isDataLoading,
    selectMusclesOptions,
    selectTypeOptions,
    selectDifficultyOptions,
    getExercises,
  } = useExercisesForm();
  const theme = useTheme();

  return (
    <View style={containerStyle}>
      <View style={styles.marginBottomView}>
        <FormItem
          name="exerciseName"
          control={control}
          render={({ field, fieldState }) => (
            <TextInput
              {...field}
              testID="FORM_NAME_INPUT"
              onBlur={field.onBlur}
              onChangeText={text => {
                field.onChange(text);
              }}
              disabled={isDataLoading}
              placeholder="Enter exercise name"
              placeholderTextColor={theme.colors.outlineVariant}
              error={!!fieldState.error}
            />
          )}
        />
      </View>
      <View style={styles.marginBottomView}>
        <FormItem
          name="type"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              testId="TYPE_TEST_ID"
              placeholder="Select exercise type"
              value={field.value as string}
              disabled={isDataLoading}
              onChange={field.onChange}
              options={selectTypeOptions}
            />
          )}
        />
      </View>
      <View style={styles.marginBottomView}>
        <FormItem
          name="muscle"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              placeholder="Select muscle type"
              value={field.value as string}
              disabled={isDataLoading}
              onChange={field.onChange}
              options={selectMusclesOptions}
            />
          )}
        />
      </View>
      <View style={styles.marginBottomView}>
        <FormItem
          name="difficulty"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              placeholder="Select difficulty type"
              value={field.value as string}
              disabled={isDataLoading}
              onChange={field.onChange}
              options={selectDifficultyOptions}
            />
          )}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={getExercises}
          disabled={!isDirty || isDataLoading}
          contentStyle={styles.button}
          loading={isDataLoading}>
          Search
        </Button>
      </View>
    </View>
  );
};

export default ExercisesForm;

const styles = StyleSheet.create({
  marginBottomView: {
    marginBottom: MARGIN_BOTTOM_CARD,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  button: {
    paddingVertical: 15,
    width: '100%',
  },
});
