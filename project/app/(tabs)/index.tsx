import { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  Animated, 
  Dimensions, 
  FlatList 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bell, ChevronRight } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

import { colors } from '@/constants/theme';
import { EventCard } from '@/components/EventCard';
import { CategoryPill } from '@/components/CategoryPill';
import { featuredEvents, events, categories } from '@/data/mockData';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState('all');
  const scrollX = useRef(new Animated.Value(0)).current;

  const handleCategoryPress = (id: string) => {
    setActiveCategory(id);
  };

  const renderFeaturedItem = ({ item, index }: { item: any, index: number }) => {
    return (
      <TouchableOpacity 
        activeOpacity={0.9}
        style={[styles.featuredItem, { width: SCREEN_WIDTH - 48 }]}
        onPress={() => router.push(`/event/${item.id}`)}
      >
        <Image source={{ uri: item.image }} style={styles.featuredImage} />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.gradient}
        >
          <View style={styles.featuredContent}>
            <Text style={styles.featuredDate}>{item.date}</Text>
            <Text style={styles.featuredTitle}>{item.title}</Text>
            <View style={styles.featuredLocation}>
              <Text style={styles.featuredLocationText}>{item.location}</Text>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello, User</Text>
            <Text style={styles.subtitle}>Discover amazing events</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Bell size={24} color={colors.neutral[800]} />
          </TouchableOpacity>
        </View>

        <View style={styles.featuredContainer}>
          <Animated.FlatList
            data={featuredEvents}
            renderItem={renderFeaturedItem}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: true }
            )}
            contentContainerStyle={styles.featuredList}
          />

          <View style={styles.pagination}>
            {featuredEvents.map((_, i) => {
              const inputRange = [
                (i - 1) * (SCREEN_WIDTH - 48),
                i * (SCREEN_WIDTH - 48),
                (i + 1) * (SCREEN_WIDTH - 48),
              ];
              
              const dotWidth = scrollX.interpolate({
                inputRange,
                outputRange: [8, 16, 8],
                extrapolate: 'clamp',
              });
              
              const opacity = scrollX.interpolate({
                inputRange,
                outputRange: [0.3, 1, 0.3],
                extrapolate: 'clamp',
              });
              
              return (
                <Animated.View
                  key={i}
                  style={[
                    styles.dot,
                    { width: dotWidth, opacity },
                  ]}
                />
              );
            })}
          </View>
        </View>

        <View style={styles.categoriesContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          >
            <CategoryPill
              label="All"
              id="all"
              isActive={activeCategory === 'all'}
              onPress={handleCategoryPress}
            />
            {categories.map((category) => (
              <CategoryPill
                key={category.id}
                label={category.name}
                id={category.id}
                isActive={activeCategory === category.id}
                onPress={handleCategoryPress}
              />
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Events</Text>
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>See all</Text>
              <ChevronRight size={16} color={colors.primary[600]} />
            </TouchableOpacity>
          </View>

          <View style={styles.eventsList}>
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Events</Text>
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>See all</Text>
              <ChevronRight size={16} color={colors.primary[600]} />
            </TouchableOpacity>
          </View>

          <View style={styles.eventsList}>
            {events.slice(2, 5).map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral[50],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
  },
  greeting: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: colors.neutral[900],
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.neutral[600],
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.neutral[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
  featuredContainer: {
    marginTop: 16,
  },
  featuredList: {
    paddingHorizontal: 24,
  },
  featuredItem: {
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    marginRight: 16,
  },
  featuredImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '70%',
    justifyContent: 'flex-end',
    padding: 16,
  },
  featuredContent: {
    width: '100%',
  },
  featuredDate: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: colors.neutral[100],
    marginBottom: 4,
  },
  featuredTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: colors.neutral[50],
    marginBottom: 8,
  },
  featuredLocation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featuredLocationText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: colors.neutral[200],
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary[500],
    marginHorizontal: 4,
  },
  categoriesContainer: {
    marginTop: 24,
  },
  categoriesList: {
    paddingHorizontal: 24,
  },
  section: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: colors.neutral[900],
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: colors.primary[600],
    marginRight: 2,
  },
  eventsList: {
    gap: 16,
  },
});