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
import {Company, NavParamMap} from '../types';
import {Avatar} from './Avatar';

const styles = StyleSheet.create({
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoColumn: {
    marginLeft: 8,
  },
  pressedStyle: {
    opacity: 0.5,
  },
});

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

export const CompanyItem = memo((props: CompanyItemProps) => {
  const {company, style} = props;

  const {navigate} = useNavigation<NavigationProp<NavParamMap>>();

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
          <Text>{company.name}</Text>
          <Text>
            {company.location.address}, {company.location.city}
          </Text>
        </View>
      </View>

      <Text>{'>'}</Text>
    </Pressable>
  );
}, propsAreEqual);
