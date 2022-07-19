import React, {memo} from 'react';
import {
  Pressable,
  PressableStateCallbackType,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {Avatar} from './Avatar';
import {Company, NavParamMap} from '~types';
import {AppTheme, useStylesForAppTheme} from '~theme';

type CompanyItemProps = {
  company: Company;
  style?: StyleProp<ViewStyle>;
};

export const propsAreEqual = (
  prev: CompanyItemProps,
  next: CompanyItemProps,
) => {
  return prev.style === next.style && prev.company.id === next.company.id;
};

/**
 * @description
 * Renders company row with avatar, name, and address.
 * Navigates to profile on press.
 */
export const CompanyItem = memo((props: CompanyItemProps) => {
  const {company, style} = props;

  const {navigate} = useNavigation<NavigationProp<NavParamMap>>();
  const styles = useStylesForAppTheme(createStyles);

  const determineStyle = ({pressed}: PressableStateCallbackType) => [
    styles.itemRow,
    style,
    pressed && styles.pressedStyle,
  ];

  const onPress = () => navigate('Profile', company);

  return (
    <Pressable style={determineStyle} onPress={onPress}>
      <View style={styles.infoRow}>
        <Avatar name={company.name} size={40} />

        <View style={styles.infoColumn}>
          <Text style={styles.name}>{company.name}</Text>
          <Text style={styles.address}>
            {company.location.address}, {company.location.city}
          </Text>
        </View>
      </View>

      <Icon name="chevron-right" style={styles.drilldownIcon} />
    </Pressable>
  );
}, propsAreEqual);

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    itemRow: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: theme.spacing.medium,
      justifyContent: 'space-between',
    },
    infoRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    infoColumn: {
      marginLeft: theme.spacing.medium,
    },
    name: {marginBottom: theme.spacing.tiny, color: theme.colors.text},
    address: {color: theme.colors.text},
    drilldownIcon: {fontSize: 24, color: theme.colors.text},
    pressedStyle: {
      opacity: 0.5,
    },
  });
