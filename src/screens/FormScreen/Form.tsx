import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { SvgXml } from 'react-native-svg';

import gantl from '@/assets/svg/gantl';
import { ExercisesForm } from '@/components/ExercisesForm';

const Form = () => {
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <SvgXml
          testID="FORM_ICON"
          xml={gantl}
          height={200}
          width={200}
          fill={theme.colors.onPrimaryContainer}
        />
      </View>
      <View style={styles.form} testID="FORM_CONTAINER">
        <ExercisesForm
          containerStyle={{ flex: 1, marginHorizontal: 10, marginTop: 10 }}
        />
      </View>
    </View>
  );
};

export default Form;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  icon: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  form: {
    flex: 0.7,
    marginBottom: 20,
  },
});
