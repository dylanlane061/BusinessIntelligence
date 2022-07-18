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

import {WatchlistChartEntryData} from '../../../types';
import {useWatchlist} from '../context';
import {CompanyItem} from '../../../components/CompanyItem';
import {WatchlistBarGraph} from './WatchlistBarGraph';

const styles = StyleSheet.create({
  container: {
    paddingBottom: 15,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoContainer: {
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
  },
  watchPrompt: {
    marginTop: 4,
  },
  highlightedItem: {
    backgroundColor: 'lightblue',
  },
});

type WatchlistProps = {
  style?: StyleProp<ViewStyle>;
};

export const Watchlist = (props: WatchlistProps) => {
  const {style} = props;

  const watchlist = useWatchlist();
  const [expanded, setExpanded] = useState(true);
  const [highlighted, setHighlighted] = useState<WatchlistChartEntryData>();

  const onToggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  const watchCount = watchlist.companies.length;

  return (
    <View style={[styles.container, style]}>
      <View style={styles.infoContainer}>
        <View style={styles.row}>
          <Text style={styles.title}>Watchlist ({watchCount})</Text>
          {!!watchCount && (
            <TouchableOpacity onPress={onToggle}>
              <Text>Toggle</Text>
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
            style={{height: 200}}
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
