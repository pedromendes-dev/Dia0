import React from 'react';
import { View, Text, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';

interface AnimatedCardProps {
  title: string;
  description: string;
  image: string;
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({
  title,
  description,
  image,
}) => {
  return (
    <Animatable.View
      animation="fadeInUp"
      duration={800}
      className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-4 mb-4 flex-row items-center"
    >
      <Image source={{ uri: image }} className="w-16 h-16 rounded-lg mr-4" />
      <View className="flex-1">
        <Text className="text-lg font-bold text-neutral-900 dark:text-white mb-1">
          {title}
        </Text>
        <Text className="text-neutral-600 dark:text-neutral-300">
          {description}
        </Text>
      </View>
    </Animatable.View>
  );
};
