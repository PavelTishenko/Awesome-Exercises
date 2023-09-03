import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import { Card, MD3Theme, useTheme } from 'react-native-paper';

import { ExerciseType, Response } from '@/api/types.api';
import { Icon } from '@/components/Icon';
import { StyleSheet } from 'react-native';

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
      }),
    [],
  );

export const ListItem = ({ exercise }: Props) => {
  const theme = useTheme();
  const styles = useStyles(theme);

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
                  <Text style={styles.infoText}>Type: {exercise.type}</Text>
                  <Text style={styles.infoText}>
                    Equipment: {exercise.equipment}
                  </Text>
                  <Text style={styles.infoText}>Muscle: {exercise.muscle}</Text>
                </View>
                <Icon type={exercise.type as ExerciseType} />
              </View>
              <Text>Instructions: {exercise.instructions}</Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};
