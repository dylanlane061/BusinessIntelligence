import React from 'react';
import {Pressable, StyleProp, StyleSheet, Text, ViewStyle} from 'react-native';
import {APP_COLORS} from '../../../theme';
import {useWatchlist} from '../context';
import {Company} from '../../../types';
import {getContrastColor} from '../../../utils/colors';

const styles = StyleSheet.create({
  base: {
    padding: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  pressed: {opacity: 0.5},
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

type WatchButtonProps = {
  company: Company;
  style?: StyleProp<ViewStyle>;
};

export const WatchButton = (props: WatchButtonProps) => {
  const {company, style} = props;

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

  const bgColor = watching ? APP_COLORS.negative : APP_COLORS.positive;

  return (
    <Pressable
      style={({pressed}) => [
        styles.base,
        style,
        {backgroundColor: bgColor},
        pressed && styles.pressed,
      ]}
      onPress={onPress}>
      <Text style={[styles.text]}>
        {watching ? 'Stop Watching' : 'Start Watching'}
      </Text>
    </Pressable>
  );
};
