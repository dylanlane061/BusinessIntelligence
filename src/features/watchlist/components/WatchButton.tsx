import React from 'react';
import {StyleProp, StyleSheet, Text, ViewStyle} from 'react-native';

import {Company} from '~types';
import {useColorTheme} from '~theme';
import {Button} from '~components';
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
    <Button
      style={[styles.base, style, {backgroundColor: bgColor}]}
      onPress={onPress}>
      <Text>{watching ? 'Stop Watching' : 'Start Watching'}</Text>
    </Button>
  );
};

const styles = StyleSheet.create({
  base: {
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  pressed: {opacity: 0.5},
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
