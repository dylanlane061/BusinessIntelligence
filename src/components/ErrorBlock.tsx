import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {AppTheme, useStylesForAppTheme} from '~theme';
import {Button} from './Button';

type ErrorBlockProps = {
  title?: string;
  message: string;
  onRetry: () => void;
};

export const ErrorBlock = (props: ErrorBlockProps) => {
  const {title = 'Something went wrong!', message, onRetry} = props;
  const styles = useStylesForAppTheme(createStyles);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      <Button style={styles.button} onPress={onRetry}>
        <Text>Retry</Text>
      </Button>
    </View>
  );
};

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
    },
    title: {
      color: theme.colors.negative,
      fontWeight: '500',
      fontSize: 18,
    },
    message: {
      marginTop: theme.spacing.tiny,
      color: theme.colors.text,
      fontSize: 14,
    },
    button: {
      marginTop: theme.spacing.medium,
      backgroundColor: theme.colors.background,
      borderColor: theme.colors.line,
      borderWidth: 1,
    },
  });
