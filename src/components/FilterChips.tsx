import React from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {Button} from './Button';
import {AppTheme, useStylesForAppTheme} from '~theme';
import {getContrastColor} from '~utils';

export type Chip = {id: number; value: string | number; label: string};

type ChipProps = {
  chip: Chip;
  selected: boolean;
  onPress: (chip: Chip) => void;
  style?: StyleProp<ViewStyle>;
};

export const Chip = (props: ChipProps) => {
  const {chip, onPress, style} = props;

  const onChipPress = () => {
    onPress(chip);
  };

  return (
    <Button key={chip.id} style={[style]} onPress={onChipPress}>
      <Text>{chip.label}</Text>
    </Button>
  );
};

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

  const renderChip = (chip: Chip) => {
    const isSelected = chip.id === selected.id;
    return (
      <Chip
        key={chip.id}
        chip={chip}
        onPress={onSelect}
        selected={isSelected}
        style={[styles.chip, isSelected && styles.selected]}
      />
    );
  };

  return <View style={[styles.container, style]}>{chips.map(renderChip)}</View>;
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
      paddingVertical: theme.spacing.small,
      paddingHorizontal: theme.spacing.small,
      marginHorizontal: theme.spacing.large,
      backgroundColor: theme.colors.background,
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
