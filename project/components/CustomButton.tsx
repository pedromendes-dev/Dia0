import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native';
import { twMerge } from 'tailwind-merge';
import { LucideIcon } from 'lucide-react-native';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  icon?: React.ReactNode;
  style?: string;
  disabled?: boolean;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  loading = false,
  icon,
  style = '',
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      className={twMerge(
        'flex-row items-center justify-center rounded-lg px-6 py-3 bg-primary-600 dark:bg-primary-400',
        disabled ? 'opacity-50' : '',
        style
      )}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <>
          {icon && <View className="mr-2">{icon}</View>}
          <Text className="text-white text-base font-semibold dark:text-black">
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};
