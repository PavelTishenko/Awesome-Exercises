import React, { forwardRef, Ref, useCallback, useMemo, useState } from 'react';
import { MD3Theme, useTheme } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Platform, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { RefCallBack } from 'react-hook-form';

type Option = {
  label: string;
  value: string;
};

type Props = {
  options: Option[];
  value: string;
  onChange: () => void;
  ref?: Ref<any>;
  testId?: string;
  inputTestId?: string;
  placeholder?: string;
  disabled?: boolean;
};

const CHEVRON_MARGINS = Platform.select({
  ios: 20,
  android: 18,
});

const Select = forwardRef((props: Props, ref: Ref<any>) => {
  const {
    value,
    options,
    placeholder,
    testId,
    inputTestId,
    disabled = false,
    onChange,
  } = props;
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();

  const PickerIcon = useCallback(() => {
    return (
      <View style={styles.chevron}>
        <Icon name={isOpen ? 'chevron-up' : 'chevron-down'} size={13} />
      </View>
    );
  }, [isOpen]);

  const inputStyles = useMemo(
    () => ({
      borderBottomWidth: isOpen ? 2 : 1,
      borderBottomColor: isOpen
        ? theme.colors.primary
        : theme.colors.onSurfaceDisabled,
      backgroundColor: theme.colors.surfaceVariant,
      color: theme.colors.shadow,
      fontSize: 16,
    }),
    [isOpen, theme],
  );

  return (
    <RNPickerSelect
      ref={ref}
      items={options}
      value={value}
      touchableWrapperProps={{ testID: testId }}
      textInputProps={{ testID: inputTestId }}
      // @ts-ignore
      // ignore because of issues with ts Icon on lib side
      Icon={PickerIcon}
      pickerProps={{
        testID: 'PICKER',
        mode: 'dialog',
      }}
      disabled={disabled}
      useNativeAndroidPickerStyle={false}
      fixAndroidTouchableBug
      placeholder={{ value: '', label: placeholder }}
      onOpen={() => setIsOpen(true)}
      onClose={() => setIsOpen(false)}
      onValueChange={onChange}
      style={{
        iconContainer: {
          marginRight: 12,
        },
        inputIOS: {
          ...styles.input,
          ...inputStyles,
        },
        inputAndroid: {
          ...styles.input,
          ...inputStyles,
        },
      }}
    />
  );
});

export default Select;

const styles = StyleSheet.create({
  input: {
    height: 55,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  chevron: {
    top: CHEVRON_MARGINS,
  },
});
