import React, {useCallback} from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import {APP_COLORS} from '../theme';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  chip: {
    padding: 8,
    borderRadius: 8,
    marginHorizontal: 16,
  },
});

export type Chip = {id: number; value: string | number; label: string};

type FilterChipProps = {
  chips: Chip[];
  selected: Chip;
  onSelect: (chip: Chip) => void;
  style?: StyleProp<ViewStyle>;
};

export const FilterChips = (props: FilterChipProps) => {
  const {chips, selected, onSelect, style} = props;

  return (
    <View style={[styles.container, style]}>
      {chips.map(chip => (
        <Pressable
          key={chip.id}
          onPress={useCallback(() => onSelect(chip), [])}
          style={[
            styles.chip,
            {
              backgroundColor:
                chip.id === selected.id ? APP_COLORS.highlight : undefined,
            },
          ]}>
          <Text>{chip.label}</Text>
        </Pressable>
      ))}
    </View>
  );
};
