import { View, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { colors } from '@/constants/theme';

interface ToggleButtonProps {
  isEnabled: boolean;
  onToggle: () => void;
}

export function ToggleButton({ isEnabled, onToggle }: ToggleButtonProps) {
  const translateX = useRef(new Animated.Value(isEnabled ? 20 : 0)).current;
  
  useEffect(() => {
    Animated.spring(translateX, {
      toValue: isEnabled ? 20 : 0,
      useNativeDriver: true,
      friction: 8,
    }).start();
  }, [isEnabled, translateX]);
  
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onToggle}
      style={[
        styles.container,
        {
          backgroundColor: isEnabled ? colors.primary[600] : colors.neutral[300],
        },
      ]}
    >
      <Animated.View
        style={[
          styles.circle,
          {
            transform: [{ translateX }],
          },
        ]}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 44,
    height: 24,
    borderRadius: 12,
    paddingHorizontal: 2,
    justifyContent: 'center',
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.neutral[50],
  },
});