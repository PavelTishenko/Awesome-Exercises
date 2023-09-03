import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import { Card, MD3Theme, useTheme } from 'react-native-paper';

import { ExerciseType, Response } from '@/api/types.api';
import { Icon } from '@/components/Icon';
import { StyleSheet } from 'react-native';
import { capitalizeFirstLetter } from '@/utils/textUtils';

type Props = {
  exercise: Response;
};

const useStyles = (theme: MD3Theme) =>
  useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          marginHorizontal: 20,
          marginBottom: 20,
        },
        content: {
          flexDirection: 'row',
          alignItems: 'center',
        },
        contentHolder: {
          flex: 1,
        },
        title: {
          color: theme.colors.primary,
        },
        info: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        },
        infoText: {
          fontSize: 16,
        },
        subtitleTitle: {
          fontSize: 17,
          color: theme.colors.outline,
        },
        instructions: {
          fontSize: 17,
          color: theme.colors.primary,
        },
      }),
    [theme],
  );

export const ListItem = ({ exercise }: Props) => {
  const theme = useTheme();
  const styles = useStyles(theme);

  const capitalizedType = useMemo(() => capitalizeFirstLetter(exercise?.type as string), [exercise])
  const capitalizedEquipment = useMemo(() => capitalizeFirstLetter(exercise?.equipment as string), [exercise])
  const capitalizedMuscleType = useMemo(() => capitalizeFirstLetter(exercise?.muscle as string), [exercise])

  return (
    <View style={styles.container} testID="ITEM_CONTAINER_TEST_ID">
      <Card mode="elevated">
        <Card.Title
          title={exercise.name}
          titleStyle={styles.title}
          titleVariant="titleLarge"
        />
        <Card.Content>
          <View style={styles.content}>
            <View style={styles.contentHolder}>
              <View style={styles.info}>
                <View>
                  <Text style={styles.infoText}>
                    <Text style={styles.subtitleTitle}>Type: </Text>
                    {capitalizedType}
                  </Text>
                  <Text style={styles.infoText}>
                    <Text style={styles.subtitleTitle}>Equipment: </Text>
                    {capitalizedEquipment}
                  </Text>
                  <Text style={styles.infoText}>
                    <Text style={styles.subtitleTitle}>Muscle: </Text>
                    {capitalizedMuscleType}
                  </Text>
                </View>
                <Icon type={exercise.type as ExerciseType} />
              </View>
              <Text>
                <Text style={styles.instructions}>Instructions: </Text>
                {`${exercise.instructions ? exercise.instructions : 'No instructions'}`}
              </Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};
