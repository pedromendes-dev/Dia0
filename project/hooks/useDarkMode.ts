import { useColorScheme } from 'react-native';

export function useDarkMode() {
  const colorScheme = useColorScheme();
  return colorScheme === 'dark';
}
