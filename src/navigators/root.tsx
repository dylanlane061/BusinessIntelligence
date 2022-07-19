import * as React from 'react';
import {NavigationContainer, Theme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {WatchIndicator} from '../features/watchlist/components';
import {Home, Profile} from '../screens';
import {NavParamMap} from '../types';
import {
  useColorSchemeSelect,
  useColorTheme,
  NavDarkTheme,
  NavLightTheme,
} from '../theme';

const MainNavigator = createStackNavigator<NavParamMap>();

export const RootNavigator = () => {
  const NavTheme = useColorSchemeSelect<Theme>({
    light: NavLightTheme,
    dark: NavDarkTheme,
  });

  const colors = useColorTheme();

  return (
    <NavigationContainer theme={NavTheme}>
      <MainNavigator.Navigator
        screenOptions={{
          headerTitle: '',
          headerBackTitleVisible: false,
          headerStyle: {backgroundColor: colors.transparent},
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
