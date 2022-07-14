import React, {useCallback} from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Company, NavParamMap} from '../types';
import {Text, TouchableOpacity, View} from 'react-native';

export const CompanyItem = (props: Company) => {
  const {name} = props;
  const {navigate} = useNavigation<NavigationProp<NavParamMap>>();

  return (
    <TouchableOpacity
      onPress={useCallback(() => navigate('Profile', props), [])}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 16,
        }}>
        <Text>{name}</Text>
        <Text>{'>'}</Text>
      </View>
    </TouchableOpacity>
  );
};
