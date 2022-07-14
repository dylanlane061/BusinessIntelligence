import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {QueryClient, QueryClientProvider} from 'react-query';
import {Businesses} from './screens/Businesses';
import {BusinessDetail} from './screens/BusinessDetail';
import {NavParamMap} from './types';

const MainNavigator = createStackNavigator<NavParamMap>();

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <MainNavigator.Navigator
          screenOptions={{
            headerBackTitleVisible: false,
          }}>
          <MainNavigator.Screen name="Home" component={Businesses} />
          <MainNavigator.Screen name="Profile" component={BusinessDetail} />
        </MainNavigator.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
};
