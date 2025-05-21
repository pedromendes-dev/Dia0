import { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  ScrollView,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search as SearchIcon, MapPin, Calendar, Filter } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';

import { colors } from '@/constants/theme';
import { EventCard } from '@/components/EventCard';
import { categories, events } from '@/data/mockData';
import { CategoryPill } from '@/components/CategoryPill';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeCategory, setActiveCategory] = useState('all');
  
  const popularSearches = [
    'Concerts', 'Tech Conference', 'Art Exhibition', 'Theater', 'Workshop'
  ];

  const filterOptions = [
    { id: 'all', label: 'All', icon: null },
    { id: 'location', label: 'Location', icon: MapPin },
    { id: 'date', label: 'Date', icon: Calendar },
  ];

  const filteredEvents = events.filter(event => {
    if (searchQuery === '') return true;
    return event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           event.location.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.title}>Search</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color={colors.neutral[700]} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputWrapper}>
          <SearchIcon size={20} color={colors.neutral[500]} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search events, venues, artists..."
            placeholderTextColor={colors.neutral[500]}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterContainer}
        >
          {filterOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.filterOption,
                activeFilter === option.id && styles.activeFilterOption
              ]}
              onPress={() => setActiveFilter(option.id)}
            >
              {option.icon && (
                <option.icon 
                  size={16} 
                  color={activeFilter === option.id ? colors.primary[600] : colors.neutral[600]} 
                  style={styles.filterIcon}
                />
              )}
              <Text 
                style={[
                  styles.filterText,
                  activeFilter === option.id && styles.activeFilterText
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.categoriesContainer}
      >
        <CategoryPill
          label="All"
          id="all"
          isActive={activeCategory === 'all'}
          onPress={(id) => setActiveCategory(id)}
        />
        {categories.map((category) => (
          <CategoryPill
            key={category.id}
            label={category.name}
            id={category.id}
            isActive={activeCategory === category.id}
            onPress={(id) => setActiveCategory(id)}
          />
        ))}
      </ScrollView>

      {searchQuery === '' ? (
        <View style={styles.popularContainer}>
          <Text style={styles.sectionTitle}>Popular Searches</Text>
          <View style={styles.popularTags}>
            {popularSearches.map((search, index) => (
              <TouchableOpacity 
                key={index}
                style={styles.tagButton}
                onPress={() => setSearchQuery(search)}
              >
                <Text style={styles.tagText}>{search}</Text>
              </TouchableOpacity>
            ))}
          </View>
          
          <Text style={[styles.sectionTitle, styles.recentTitle]}>Recent Searches</Text>
          <Text style={styles.emptyText}>No recent searches</Text>
        </View>
      ) : (
        <ScrollView style={styles.resultsContainer}>
          <Text style={styles.resultsText}>
            {filteredEvents.length} {filteredEvents.length === 1 ? 'result' : 'results'} found
          </Text>
          <View style={styles.eventsList}>
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </View>
        </ScrollView>
      )}
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
    paddingTop: 8,
    paddingBottom: 16,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    color: colors.neutral[900],
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.neutral[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    paddingHorizontal: 24,
  },
  searchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.neutral[100],
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: colors.neutral[900],
  },
  filterContainer: {
    flexDirection: 'row',
    paddingTop: 16,
    paddingBottom: 8,
  },
  filterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: colors.neutral[100],
    marginRight: 8,
  },
  activeFilterOption: {
    backgroundColor: colors.primary[100],
  },
  filterIcon: {
    marginRight: 4,
  },
  filterText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: colors.neutral[600],
  },
  activeFilterText: {
    color: colors.primary[600],
  },
  categoriesContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  popularContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 8,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: colors.neutral[900],
    marginBottom: 16,
  },
  popularTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  tagButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.neutral[100],
  },
  tagText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: colors.neutral[700],
  },
  recentTitle: {
    marginTop: 32,
  },
  emptyText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.neutral[500],
    textAlign: 'center',
    marginTop: 16,
  },
  resultsContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  resultsText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: colors.neutral[600],
    marginBottom: 16,
  },
  eventsList: {
    gap: 16,
    paddingBottom: 100,
  },
});