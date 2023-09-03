import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import uuid from 'react-native-uuid';

import { Response } from '@/api/types.api';
import { ListItem } from './ListItem/ListItem';

type Props = {
  items: Response[];
};

const List = ({ items }: Props) => {
  return (
    <ScrollView style={styles.scrollContainer}>
      {items.map(item => (
        <View key={`${item.name} - ${uuid.v4()}`}>
          <ListItem exercise={item} />
        </View>
      ))}
    </ScrollView>
  );
};

export default List;

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    marginTop: 2,
  },
});
