import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '@/constants/theme';

interface CategoryPillProps {
  label: string;
  id: string;
  isActive: boolean;
  onPress: (id: string) => void;
}

export function CategoryPill({ label, id, isActive, onPress }: CategoryPillProps) {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        isActive ? styles.activeContainer : styles.inactiveContainer,
      ]}
      onPress={() => onPress(id)}
    >
      <Text
        style={[
          styles.text,
          isActive ? styles.activeText : styles.inactiveText,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  activeContainer: {
    backgroundColor: colors.primary[600],
  },
  inactiveContainer: {
    backgroundColor: colors.neutral[100],
  },
  text: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  activeText: {
    color: colors.neutral[50],
  },
  inactiveText: {
    color: colors.neutral[700],
  },
});