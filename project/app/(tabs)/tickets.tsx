import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ChevronRight,
  QrCode,
  Calendar,
  Clock,
  MapPin,
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

import { colors } from '@/constants/theme';
import { userTickets } from '@/data/mockData';

export default function TicketsScreen() {
  const upcomingTickets = userTickets.filter((ticket) => !ticket.isPast);
  const pastTickets = userTickets.filter((ticket) => ticket.isPast);

  const renderTicket = (ticket: any) => (
    <TouchableOpacity
      key={ticket.id}
      style={styles.ticketCard}
      activeOpacity={0.9}
    >
      <Image source={{ uri: ticket.eventImage }} style={styles.ticketImage} />
      <LinearGradient
        colors={['rgba(0,0,0,0.2)', 'rgba(0,0,0,0.5)']}
        style={styles.ticketGradient}
      />

      <View style={styles.ticketContent}>
        <View style={styles.ticketHeader}>
          <Text style={styles.ticketType}>{ticket.type}</Text>
          <View
            style={[
              styles.statusBadge,
              {
                backgroundColor: ticket.isPast
                  ? colors.neutral[200]
                  : colors.success[100],
              },
            ]}
          >
            <Text
              style={[
                styles.statusText,
                {
                  color: ticket.isPast
                    ? colors.neutral[700]
                    : colors.success[800],
                },
              ]}
            >
              {ticket.isPast ? 'Passado' : 'Ativo'}
            </Text>
          </View>
        </View>

        <Text style={styles.ticketTitle}>{ticket.eventTitle}</Text>

        <View style={styles.ticketDetails}>
          <View style={styles.detailRow}>
            <Calendar size={14} color={colors.neutral[200]} />
            <Text style={styles.detailText}>{ticket.date}</Text>
          </View>

          <View style={styles.detailRow}>
            <Clock size={14} color={colors.neutral[200]} />
            <Text style={styles.detailText}>{ticket.time}</Text>
          </View>

          <View style={styles.detailRow}>
            <MapPin size={14} color={colors.neutral[200]} />
            <Text style={styles.detailText}>{ticket.location}</Text>
          </View>
        </View>

        <View style={styles.ticketFooter}>
          <View style={styles.ticketPrice}>
            <Text style={styles.priceLabel}>Preço</Text>
            <Text style={styles.priceValue}>${ticket.price}</Text>
          </View>

          <TouchableOpacity style={styles.qrButton}>
            <QrCode size={20} color={colors.neutral[50]} />
            <Text style={styles.qrText}>Ver QR</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.title}>Meus Ingressos</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Próximos</Text>
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>Ver todos</Text>
              <ChevronRight size={16} color={colors.primary[600]} />
            </TouchableOpacity>
          </View>

          {upcomingTickets.length > 0 ? (
            <View style={styles.ticketsList}>
              {upcomingTickets.map(renderTicket)}
            </View>
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>Nenhum ingresso futuro</Text>
            </View>
          )}
        </View>

        <View style={[styles.section, styles.pastSection]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Eventos Passados</Text>
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>Ver todos</Text>
              <ChevronRight size={16} color={colors.primary[600]} />
            </TouchableOpacity>
          </View>

          {pastTickets.length > 0 ? (
            <View style={styles.ticketsList}>
              {pastTickets.map(renderTicket)}
            </View>
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>Nenhum ingresso passado</Text>
            </View>
          )}
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
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 16,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    color: colors.neutral[900],
  },
  section: {
    paddingHorizontal: 24,
    paddingTop: 8,
  },
  pastSection: {
    marginTop: 24,
    paddingBottom: 100,
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
  ticketsList: {
    gap: 16,
  },
  ticketCard: {
    borderRadius: 16,
    overflow: 'hidden',
    height: 240,
  },
  ticketImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  ticketGradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  ticketContent: {
    padding: 16,
    flex: 1,
    justifyContent: 'space-between',
  },
  ticketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  ticketType: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: colors.neutral[100],
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
  },
  ticketTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: colors.neutral[50],
    marginBottom: 16,
  },
  ticketDetails: {
    gap: 8,
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.neutral[200],
  },
  ticketFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ticketPrice: {},
  priceLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: colors.neutral[300],
  },
  priceValue: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: colors.neutral[50],
  },
  qrButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  qrText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: colors.neutral[50],
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: colors.neutral[500],
  },
});
