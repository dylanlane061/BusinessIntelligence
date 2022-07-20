import * as React from 'react';
import {NavigationContainer, RouteProp, Theme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {
  useColorSchemeSelect,
  NavDarkTheme,
  NavLightTheme,
  useAppTheme,
} from '~theme';
import {NavParamMap} from '~types';
import {Home, Profile} from '~screens';
import {WatchIndicator} from '~features/watchlist';

const MainNavigator = createStackNavigator<NavParamMap>();

const ProfileNavOptions = ({
  route,
}: {
  route: RouteProp<NavParamMap, 'Profile'>;
}) => ({
  headerRight: () => <WatchIndicator company={route.params} />,
});

export const RootNavigator = () => {
  const {colors, spacing} = useAppTheme();

  const NavTheme = useColorSchemeSelect<Theme>({
    light: NavLightTheme,
    dark: NavDarkTheme,
  });

  return (
    <NavigationContainer theme={NavTheme}>
      <MainNavigator.Navigator
        screenOptions={{
          headerTitle: '',
          headerBackTitleVisible: false,
          headerLeftContainerStyle: {
            left: spacing.medium,
          },
          headerRightContainerStyle: {
            right: spacing.large,
          },
          headerStyle: {
            backgroundColor: colors.transparent,
          },
        }}>
        <MainNavigator.Screen name="Home" component={Home} />
        <MainNavigator.Screen
          name="Profile"
          component={Profile}
          options={ProfileNavOptions}
        />
      </MainNavigator.Navigator>
    </NavigationContainer>
  );
};
