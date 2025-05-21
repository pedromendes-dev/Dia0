import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Settings,
  CreditCard as Edit2,
  Ticket,
  Calendar,
  CreditCard,
  Bell,
  CircleHelp as HelpCircle,
  LogOut,
} from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';

import { colors } from '@/constants/theme';

export default function ProfileScreen() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />
        <View style={styles.header}>
          <Text style={styles.title}>Perfil</Text>
          <TouchableOpacity style={styles.settingsButton}>
            <Settings size={24} color={colors.neutral[800]} />
          </TouchableOpacity>
        </View>

        <View style={styles.loginContainer}>
          <Image
            source={{
              uri: 'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            }}
            style={styles.loginImage}
          />
          <Text style={styles.loginTitle}>Junte-se à Comunidade</Text>
          <Text style={styles.loginSubtitle}>
            Crie uma conta para acompanhar seus ingressos, salvar eventos
            favoritos e receber recomendações personalizadas.
          </Text>

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Entrar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.createAccountButton}>
            <Text style={styles.createAccountText}>Criar uma Conta</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.title}>Perfil</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Settings size={24} color={colors.neutral[800]} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileSection}>
          <View style={styles.profileHeader}>
            <Image
              source={{
                uri: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
              }}
              style={styles.profileImage}
            />
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>Jessica Thompson</Text>
              <Text style={styles.profileEmail}>
                jessica.thompson@example.com
              </Text>
            </View>
            <TouchableOpacity style={styles.editButton}>
              <Edit2 size={20} color={colors.primary[600]} />
            </TouchableOpacity>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statLabel}>Eventos</Text>
            </View>
            <View style={[styles.statItem, styles.statBorder]}>
              <Text style={styles.statValue}>8</Text>
              <Text style={styles.statLabel}>Ingressos</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>5</Text>
              <Text style={styles.statLabel}>Avaliações</Text>
            </View>
          </View>
        </View>

        <View style={styles.menuSection}>
          <Text style={styles.menuTitle}>Minha Atividade</Text>

          <TouchableOpacity style={styles.menuItem}>
            <View
              style={[
                styles.menuIcon,
                { backgroundColor: colors.primary[100] },
              ]}
            >
              <Ticket size={20} color={colors.primary[600]} />
            </View>
            <Text style={styles.menuText}>Meus Ingressos</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View
              style={[
                styles.menuIcon,
                { backgroundColor: colors.secondary[100] },
              ]}
            >
              <Calendar size={20} color={colors.secondary[600]} />
            </View>
            <Text style={styles.menuText}>Eventos Criados</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View
              style={[
                styles.menuIcon,
                { backgroundColor: colors.tertiary[100] },
              ]}
            >
              <CreditCard size={20} color={colors.tertiary[600]} />
            </View>
            <Text style={styles.menuText}>Métodos de Pagamento</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.menuSection}>
          <Text style={styles.menuTitle}>Configurações</Text>

          <TouchableOpacity style={styles.menuItem}>
            <View
              style={[
                styles.menuIcon,
                { backgroundColor: colors.neutral[100] },
              ]}
            >
              <Bell size={20} color={colors.neutral[600]} />
            </View>
            <Text style={styles.menuText}>Notificações</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View
              style={[
                styles.menuIcon,
                { backgroundColor: colors.neutral[100] },
              ]}
            >
              <HelpCircle size={20} color={colors.neutral[600]} />
            </View>
            <Text style={styles.menuText}>Ajuda e Suporte</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
            <View
              style={[styles.menuIcon, { backgroundColor: colors.error[100] }]}
            >
              <LogOut size={20} color={colors.error[600]} />
            </View>
            <Text style={[styles.menuText, { color: colors.error[600] }]}>
              Sair
            </Text>
          </TouchableOpacity>
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
    paddingTop: 8,
    paddingBottom: 16,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    color: colors.neutral[900],
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.neutral[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileSection: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  profileImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  profileName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: colors.neutral[900],
    marginBottom: 4,
  },
  profileEmail: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.neutral[600],
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary[50],
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: colors.neutral[100],
    borderRadius: 16,
    padding: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statBorder: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: colors.neutral[200],
  },
  statValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: colors.neutral[900],
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.neutral[600],
  },
  menuSection: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  menuTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: colors.neutral[900],
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[100],
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: colors.neutral[800],
  },
  loginContainer: {
    paddingHorizontal: 24,
    alignItems: 'center',
    paddingTop: 40,
  },
  loginImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 24,
  },
  loginTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: colors.neutral[900],
    marginBottom: 12,
    textAlign: 'center',
  },
  loginSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: colors.neutral[600],
    marginBottom: 32,
    textAlign: 'center',
    lineHeight: 24,
  },
  loginButton: {
    backgroundColor: colors.primary[600],
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
  },
  loginButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: colors.neutral[50],
  },
  createAccountButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primary[600],
  },
  createAccountText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: colors.primary[600],
  },
});
