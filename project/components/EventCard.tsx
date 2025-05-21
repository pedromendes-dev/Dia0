import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Calendar, MapPin } from 'lucide-react-native';
import { router } from 'expo-router';
import { colors } from '@/constants/theme';

interface EventProps {
  event: {
    id: string;
    title: string;
    date: string;
    time: string;
    location: string;
    price: number;
    image: string;
    category: string;
    isFree: boolean;
  };
}

export function EventCard({ event }: EventProps) {
  return (
    <TouchableOpacity 
      style={styles.container}
      activeOpacity={0.9}
      onPress={() => router.push(`/event/${event.id}`)}
    >
      <Image source={{ uri: event.image }} style={styles.image} />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.categoryChip}>
            <Text style={styles.categoryText}>{event.category}</Text>
          </View>
          <Text style={styles.price}>
            {event.isFree ? 'Free' : `$${event.price}`}
          </Text>
        </View>
        
        <Text style={styles.title} numberOfLines={2}>{event.title}</Text>
        
        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Calendar size={14} color={colors.neutral[500]} />
            <Text style={styles.infoText}>{event.date}</Text>
          </View>
          
          <View style={styles.infoItem}>
            <MapPin size={14} color={colors.neutral[500]} />
            <Text style={styles.infoText} numberOfLines={1}>{event.location}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.neutral[100],
    borderRadius: 16,
    overflow: 'hidden',
    height: 120,
  },
  image: {
    width: 120,
    height: '100%',
  },
  content: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryChip: {
    backgroundColor: colors.primary[100],
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  categoryText: {
    fontFamily: 'Inter-Medium',
    fontSize: 10,
    color: colors.primary[700],
  },
  price: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: colors.neutral[900],
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: colors.neutral[900],
    marginBottom: 8,
  },
  infoContainer: {
    gap: 6,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  infoText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: colors.neutral[600],
    flex: 1,
  },
});