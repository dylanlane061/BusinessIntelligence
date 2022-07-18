import {useEffect, useState} from 'react';
import {Appearance} from 'react-native';

export const useAppearance = () => {
  const [preferences, setPreferences] =
    useState<Appearance.AppearancePreferences>({
      colorScheme: Appearance.getColorScheme(),
    });

  useEffect(() => {
    const sub = Appearance.addChangeListener(setPreferences);
    return sub.remove;
  }, []);

  return preferences;
};

export const useColorScheme = () => {
  const appearance = useAppearance();
  return appearance.colorScheme;
};

export const useColorSchemeSelect = (config: {dark: any; light: any}) => {
  const colorScheme = useColorScheme();
  const key = colorScheme || 'light';
  return config[key];
};
