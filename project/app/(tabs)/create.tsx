import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Calendar,
  Clock,
  MapPin,
  Image as ImageIcon,
  Upload,
  Plus,
  Minus,
} from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';

import { colors } from '@/constants/theme';
import { ToggleButton } from '@/components/ToggleButton';
import { categories } from '@/data/mockData';

export default function CreateEventScreen() {
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventCategory, setEventCategory] = useState('');
  const [isFree, setIsFree] = useState(false);
  const [price, setPrice] = useState('0');
  const [maxTickets, setMaxTickets] = useState('100');

  const handleSubmit = () => {
    // Handle form submission - would connect to backend
    console.log({
      eventName,
      eventDescription,
      eventLocation,
      eventDate,
      eventTime,
      eventCategory,
      isFree,
      price: isFree ? 0 : parseFloat(price),
      maxTickets: parseInt(maxTickets),
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.title}>Criar Evento</Text>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.imageUploadContainer}>
            <TouchableOpacity style={styles.uploadButton}>
              <ImageIcon size={32} color={colors.neutral[400]} />
              <Text style={styles.uploadText}>Enviar Capa do Evento</Text>
              <Text style={styles.uploadHint}>
                Toque para procurar seus arquivos
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Informações Básicas</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Nome do Evento</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Digite o nome do evento"
                placeholderTextColor={colors.neutral[400]}
                value={eventName}
                onChangeText={setEventName}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Descrição</Text>
              <TextInput
                style={[styles.textInput, styles.textArea]}
                placeholder="Descreva seu evento"
                placeholderTextColor={colors.neutral[400]}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                value={eventDescription}
                onChangeText={setEventDescription}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Local</Text>
              <View style={styles.iconInput}>
                <MapPin
                  size={20}
                  color={colors.neutral[400]}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.iconTextInput}
                  placeholder="Adicionar local"
                  placeholderTextColor={colors.neutral[400]}
                  value={eventLocation}
                  onChangeText={setEventLocation}
                />
              </View>
            </View>

            <View style={styles.row}>
              <View style={[styles.inputGroup, styles.halfInput]}>
                <Text style={styles.inputLabel}>Data</Text>
                <View style={styles.iconInput}>
                  <Calendar
                    size={20}
                    color={colors.neutral[400]}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.iconTextInput}
                    placeholder="DD/MM/AAAA"
                    placeholderTextColor={colors.neutral[400]}
                    value={eventDate}
                    onChangeText={setEventDate}
                  />
                </View>
              </View>

              <View style={[styles.inputGroup, styles.halfInput]}>
                <Text style={styles.inputLabel}>Hora</Text>
                <View style={styles.iconInput}>
                  <Clock
                    size={20}
                    color={colors.neutral[400]}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.iconTextInput}
                    placeholder="19:00"
                    placeholderTextColor={colors.neutral[400]}
                    value={eventTime}
                    onChangeText={setEventTime}
                  />
                </View>
              </View>
            </View>
          </View>

          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Category</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoriesContainer}
            >
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryButton,
                    eventCategory === category.id &&
                      styles.activeCategoryButton,
                  ]}
                  onPress={() => setEventCategory(category.id)}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      eventCategory === category.id &&
                        styles.activeCategoryText,
                    ]}
                  >
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Informações do Ingresso</Text>

            <View style={styles.toggleGroup}>
              <Text style={styles.toggleLabel}>Evento Gratuito</Text>
              <ToggleButton
                isEnabled={isFree}
                onToggle={() => setIsFree(!isFree)}
              />
            </View>

            {!isFree && (
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Preço (R$)</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="0,00"
                  placeholderTextColor={colors.neutral[400]}
                  keyboardType="numeric"
                  value={price}
                  onChangeText={setPrice}
                />
              </View>
            )}

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Máximo de Ingressos</Text>
              <View style={styles.numberInput}>
                <TouchableOpacity
                  style={styles.numberButton}
                  onPress={() => {
                    const newValue = parseInt(maxTickets) - 1;
                    if (newValue >= 1) setMaxTickets(newValue.toString());
                  }}
                >
                  <Minus size={16} color={colors.neutral[600]} />
                </TouchableOpacity>

                <TextInput
                  style={styles.numberTextInput}
                  keyboardType="numeric"
                  value={maxTickets}
                  onChangeText={setMaxTickets}
                />

                <TouchableOpacity
                  style={styles.numberButton}
                  onPress={() => {
                    const newValue = parseInt(maxTickets) + 1;
                    setMaxTickets(newValue.toString());
                  }}
                >
                  <Plus size={16} color={colors.neutral[600]} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitText}>Criar Evento</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral[50],
  },
  keyboardAvoid: {
    flex: 1,
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
  scrollContent: {
    paddingBottom: 100,
  },
  imageUploadContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  uploadButton: {
    height: 200,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.neutral[200],
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.neutral[100],
  },
  uploadText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: colors.neutral[700],
    marginTop: 8,
  },
  uploadHint: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.neutral[500],
    marginTop: 4,
  },
  formSection: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: colors.neutral[900],
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: colors.neutral[700],
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: colors.neutral[100],
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: colors.neutral[900],
  },
  textArea: {
    minHeight: 100,
    paddingTop: 12,
  },
  iconInput: {
    backgroundColor: colors.neutral[100],
    borderRadius: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputIcon: {
    marginRight: 8,
  },
  iconTextInput: {
    flex: 1,
    paddingVertical: 12,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: colors.neutral[900],
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  categoriesContainer: {
    paddingVertical: 8,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: colors.neutral[100],
    borderRadius: 20,
    marginRight: 8,
  },
  activeCategoryButton: {
    backgroundColor: colors.primary[100],
  },
  categoryText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: colors.neutral[700],
  },
  activeCategoryText: {
    color: colors.primary[700],
  },
  toggleGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  toggleLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: colors.neutral[800],
  },
  numberInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.neutral[100],
    borderRadius: 12,
    paddingHorizontal: 8,
  },
  numberButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberTextInput: {
    flex: 1,
    textAlign: 'center',
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: colors.neutral[900],
  },
  submitButton: {
    backgroundColor: colors.primary[600],
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginHorizontal: 24,
    marginTop: 16,
  },
  submitText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: colors.neutral[50],
  },
});
