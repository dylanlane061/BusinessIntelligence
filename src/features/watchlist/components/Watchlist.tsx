import React, {useState} from 'react';
import {
  LayoutAnimation,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {AppTheme, useStylesForAppTheme} from '../../../theme';
import {WatchlistChartEntryData} from '../../../types';
import {CompanyItem} from '../../../components';
import {useWatchlist} from '../context';
import {WatchlistBarGraph} from './WatchlistBarGraph';

type WatchlistProps = {
  style?: StyleProp<ViewStyle>;
};

export const Watchlist = (props: WatchlistProps) => {
  const {style} = props;

  const watchlist = useWatchlist();
  const [expanded, setExpanded] = useState(true);
  const [highlighted, setHighlighted] = useState<WatchlistChartEntryData>();
  const styles = useStylesForAppTheme(createStyles);

  const watchCount = watchlist.companies.length;

  const onToggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.infoContainer}>
        <View style={styles.row}>
          <Text style={styles.title}>Watchlist ({watchCount})</Text>

          {!!watchCount && (
            <TouchableOpacity onPress={onToggle}>
              <Icon
                name={expanded ? 'expand-less' : 'expand-more'}
                style={styles.toggleIcon}
              />
            </TouchableOpacity>
          )}
        </View>

        {!watchCount && (
          <Text style={styles.watchPrompt}>Start watching some companies!</Text>
        )}
      </View>

      {!!watchCount && expanded && (
        <>
          <WatchlistBarGraph
            style={styles.graph}
            onEntrySelect={setHighlighted}
          />

          {watchlist.companies.map(company => (
            <CompanyItem
              key={company.id}
              company={company}
              style={[highlighted?.id === company.id && styles.highlightedItem]}
            />
          ))}
        </>
      )}
    </View>
  );
};

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      borderBottomWidth: 1,
      paddingBottom: theme.spacing.large,
      marginBottom: theme.spacing.large,
      borderBottomColor: theme.colors.line,
      backgroundColor: theme.colors.background,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    infoContainer: {
      paddingHorizontal: theme.spacing.medium,
    },
    title: {
      fontSize: 24,
      fontWeight: '500',
      color: theme.colors.text,
    },
    watchPrompt: {
      color: theme.colors.text,
      marginTop: theme.spacing.tiny,
    },
    toggleIcon: {
      color: theme.colors.text,
      fontSize: 24,
    },
    highlightedItem: {
      backgroundColor: theme.colors.highlight,
    },
    graph: {height: 200},
  });
