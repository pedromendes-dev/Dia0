import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import {
  ArrowLeft,
  Share2,
  Heart,
  MapPin,
  Calendar,
  Clock,
  User,
  DollarSign,
  Plus,
  Minus,
  ChevronRight,
} from 'lucide-react-native';

import { colors } from '@/constants/theme';
import { events } from '@/data/mockData';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function EventDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);

  // Find the event in our mock data
  const event = events.find((e) => e.id === id) || events[0];

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: event.image }}
            style={styles.coverImage}
            resizeMode="cover"
          />
          <LinearGradient
            colors={['rgba(0,0,0,0.5)', 'transparent', 'rgba(0,0,0,0.7)']}
            style={styles.imageGradient}
          />
          <SafeAreaView style={styles.imageHeader}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <ArrowLeft size={24} color={colors.neutral[50]} />
            </TouchableOpacity>
            <View style={styles.headerActions}>
              <TouchableOpacity style={styles.iconButton}>
                <Share2 size={24} color={colors.neutral[50]} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => setLiked(!liked)}
              >
                <Heart
                  size={24}
                  color={liked ? colors.error[500] : colors.neutral[50]}
                  fill={liked ? colors.error[500] : 'transparent'}
                />
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.categoryChip}>
            <Text style={styles.categoryText}>{event.category}</Text>
          </View>
          <Text style={styles.title}>{event.title}</Text>

          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <MapPin size={16} color={colors.primary[600]} />
              <Text style={styles.infoText}>{event.location}</Text>
            </View>
            <View style={styles.infoItem}>
              <Calendar size={16} color={colors.primary[600]} />
              <Text style={styles.infoText}>{event.date}</Text>
            </View>
            <View style={styles.infoItem}>
              <Clock size={16} color={colors.primary[600]} />
              <Text style={styles.infoText}>{event.time}</Text>
            </View>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <User size={16} color={colors.neutral[800]} />
              <Text style={styles.statText}>
                {event.attendees} {event.attendees === 1 ? 'pessoa' : 'pessoas'}{' '}
                indo
              </Text>
            </View>
            <View style={styles.statItem}>
              <DollarSign size={16} color={colors.neutral[800]} />
              <Text style={styles.statText}>
                {event.isFree ? 'Grátis' : `R$${event.price}`}
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Sobre o Evento</Text>
            <Text style={styles.description}>{event.description}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Organizer</Text>
            <TouchableOpacity style={styles.organizerCard}>
              <Image
                source={{ uri: event.organizer.image }}
                style={styles.organizerImage}
              />
              <View style={styles.organizerInfo}>
                <Text style={styles.organizerName}>{event.organizer.name}</Text>
                <Text style={styles.organizerRole}>{event.organizer.role}</Text>
              </View>
              <ChevronRight size={20} color={colors.neutral[400]} />
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Location</Text>
            <View style={styles.mapContainer}>
              <Image
                source={{
                  uri: 'https://images.pexels.com/photos/2760847/pexels-photo-2760847.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
                }}
                style={styles.mapImage}
              />
              <View style={styles.mapContent}>
                <Text style={styles.locationName}>{event.venueName}</Text>
                <Text style={styles.locationAddress}>{event.location}</Text>
                <TouchableOpacity style={styles.directionsButton}>
                  <Text style={styles.directionsText}>Get Directions</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Preço</Text>
          <Text style={styles.priceValue}>
            {event.isFree ? 'Grátis' : `R$${event.price}`}
          </Text>
        </View>

        <View style={styles.ticketActions}>
          {!event.isFree && (
            <View style={styles.quantitySelector}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => quantity > 1 && setQuantity(quantity - 1)}
              >
                <Minus size={16} color={colors.neutral[700]} />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => setQuantity(quantity + 1)}
              >
                <Plus size={16} color={colors.neutral[700]} />
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity style={styles.bookButton}>
            <Text style={styles.bookButtonText}>
              {event.isFree ? 'Registrar Agora' : 'Reservar Agora'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral[50],
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    height: 300,
    width: SCREEN_WIDTH,
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  imageGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  imageHeader: {
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerActions: {
    flexDirection: 'row',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: colors.neutral[50],
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 100,
  },
  categoryChip: {
    backgroundColor: colors.primary[100],
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  categoryText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: colors.primary[700],
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: colors.neutral[900],
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 8,
  },
  infoText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.neutral[700],
    marginLeft: 6,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.neutral[100],
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: colors.neutral[800],
    marginLeft: 8,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: colors.neutral[900],
    marginBottom: 12,
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: colors.neutral[700],
    lineHeight: 24,
  },
  organizerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.neutral[100],
    borderRadius: 12,
    padding: 16,
  },
  organizerImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  organizerInfo: {
    flex: 1,
    marginLeft: 16,
  },
  organizerName: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: colors.neutral[900],
    marginBottom: 4,
  },
  organizerRole: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.neutral[600],
  },
  mapContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: colors.neutral[100],
  },
  mapImage: {
    width: '100%',
    height: 150,
  },
  mapContent: {
    padding: 16,
  },
  locationName: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: colors.neutral[900],
    marginBottom: 4,
  },
  locationAddress: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.neutral[600],
    marginBottom: 12,
  },
  directionsButton: {
    backgroundColor: colors.neutral[200],
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  directionsText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: colors.neutral[800],
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.neutral[50],
    borderTopWidth: 1,
    borderTopColor: colors.neutral[200],
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 32,
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceContainer: {
    flex: 1,
  },
  priceLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: colors.neutral[600],
    marginBottom: 4,
  },
  priceValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: colors.neutral[900],
  },
  ticketActions: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    backgroundColor: colors.neutral[100],
    borderRadius: 20,
    paddingHorizontal: 8,
  },
  quantityButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: colors.neutral[900],
    paddingHorizontal: 8,
  },
  bookButton: {
    backgroundColor: colors.primary[600],
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  bookButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: colors.neutral[50],
  },
});
