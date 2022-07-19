import React from 'react';
import {Pressable, StyleProp, StyleSheet, Text, ViewStyle} from 'react-native';

import {Company} from '../../../types';
import {useColorTheme} from '../../../theme';
import {useWatchlist} from '../context';

type WatchButtonProps = {
  company: Company;
  style?: StyleProp<ViewStyle>;
};

export const WatchButton = (props: WatchButtonProps) => {
  const {company, style} = props;

  const colors = useColorTheme();
  const watchlist = useWatchlist();

  const watching = !!watchlist.companies.find(
    record => record.id === company.id,
  );

  const onPress = () => {
    if (watching) {
      watchlist.remove(company.id);
      return;
    }

    watchlist.add(company);
  };

  const bgColor = watching ? colors.negative : colors.positive;

  return (
    <Pressable
      style={({pressed}) => [
        styles.base,
        style,
        {backgroundColor: bgColor},
        pressed && styles.pressed,
      ]}
      onPress={onPress}>
      <Text style={styles.text}>
        {watching ? 'Stop Watching' : 'Start Watching'}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    padding: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  pressed: {opacity: 0.5},
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
