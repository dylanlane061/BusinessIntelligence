import React, {useCallback} from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import {AppTheme, useStylesForAppTheme} from '../theme';
import {getContrastColor} from '../utils';

export type Chip = {id: number; value: string | number; label: string};

type FilterChipProps = {
  chips: Chip[];
  selected: Chip;
  onSelect: (chip: Chip) => void;
  style?: StyleProp<ViewStyle>;
};

/**
 * @description
 * Renders list of chips intended to be used as a filter.
 * Selected chip given will be highlighted.
 */
export const FilterChips = (props: FilterChipProps) => {
  const {chips, selected, onSelect, style} = props;

  const styles = useStylesForAppTheme(createStyles);

  return (
    <View style={[styles.container, style]}>
      {chips.map(chip => {
        const isSelected = chip.id === selected.id;
        return (
          <Pressable
            key={chip.id}
            onPress={useCallback(() => onSelect(chip), [])}
            style={[styles.chip, isSelected && styles.selected]}>
            <Text style={[styles.label, isSelected && styles.labelSelected]}>
              {chip.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    chip: {
      borderRadius: 8,
      padding: theme.spacing.small,
      marginHorizontal: theme.spacing.large,
    },
    selected: {
      backgroundColor: theme.colors.primary,
    },
    label: {
      color: theme.colors.text,
    },
    labelSelected: {
      color: getContrastColor(theme.colors.primary),
    },
  });
