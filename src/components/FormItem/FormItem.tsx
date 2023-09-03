import {
  type ControllerProps,
  type FieldPath,
  type FieldValues,
  useController,
  type UseControllerReturn,
} from 'react-hook-form';
import React, { type ReactElement } from 'react';
import { View } from 'react-native';
import { HelperText } from 'react-native-paper';

const FormItem = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: Omit<ControllerProps<TFieldValues, TName>, 'render'> & {
    hideError?: boolean;
    render: (field: UseControllerReturn<TFieldValues, TName>) => ReactElement;
  },
) => {
  const { hideError, name, control, render } = props;
  const controllerProps = useController<TFieldValues, TName>({ name, control });
  const {
    fieldState: { error },
  } = controllerProps;
  const isError = !!error;

  return (
    <View>
      {render(controllerProps)}
      {isError && !hideError && (
        <HelperText testID="HELPER_TEXT_ERROR" type="error">
          {error?.message}
        </HelperText>
      )}
    </View>
  );
};

export default FormItem;
