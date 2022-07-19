import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {Company} from '~types';
import {Pulse} from '~components';
import {useColorTheme} from '~theme';
import {useWatchlist} from '../context';

type WatchIndicatorProps = {
  company: Company;
  style?: StyleProp<ViewStyle>;
};

export const WatchIndicator = (props: WatchIndicatorProps) => {
  const {company, style} = props;

  const watchlist = useWatchlist();
  const colors = useColorTheme();

  const watching = !!watchlist.companies.find(
    record => record.id === company.id,
  );

  return watching ? (
    <Pulse active={watching} size={75} color={colors.highlight} style={style}>
      <Animated.View entering={FadeIn} exiting={FadeOut}>
        <Icon name="visibility" color={colors.text} size={16} />
      </Animated.View>
    </Pulse>
  ) : null;
};
