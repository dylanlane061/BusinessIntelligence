import React from 'react';
import {Text} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {NavParamMap} from '../types';

export const BusinessDetail = () => {
  const route = useRoute<RouteProp<NavParamMap, 'Profile'>>();

  const {name, location, revenue} = route.params;

  return (
    <>
      <Text style={{fontSize: 24}}>{name}</Text>
      <Text style={{fontSize: 16}}>
        {location.address}, {location.city}
      </Text>

      {revenue.map(record => (
        <Text key={record.seq}>{record.value}</Text>
      ))}
    </>
  );
};
