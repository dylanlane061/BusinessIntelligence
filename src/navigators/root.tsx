import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {Home} from '../screens/Home';
import {Profile} from '../screens/Profile';
import {NavParamMap} from '../types';
import {NavDarkTheme, NavLightTheme} from '../theme';
import {useColorSchemeSelect} from '../hooks/appearance';
import {WatchIndicator} from '../features/watchlist/components/WatchStatus';

const MainNavigator = createStackNavigator<NavParamMap>();

export const RootNavigator = () => {
  const NavTheme = useColorSchemeSelect({
    light: NavLightTheme,
    dark: NavDarkTheme,
  });

  return (
    <NavigationContainer theme={NavTheme}>
      <MainNavigator.Navigator
        screenOptions={{
          headerBackTitleVisible: false,
          headerTitle: '',
          headerStyle: {backgroundColor: 'transparent'},
        }}>
        <MainNavigator.Screen name="Home" component={Home} />
        <MainNavigator.Screen
          name="Profile"
          component={Profile}
          options={({route}) => ({
            headerRight: () => (
              <WatchIndicator
                company={route.params}
                style={{marginRight: 16}}
              />
            ),
          })}
        />
      </MainNavigator.Navigator>
    </NavigationContainer>
  );
};
