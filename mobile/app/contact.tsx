import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ScrollView,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';

const CONTACT_INFO = {
  phone: '0548940042',
  email: 'fixate01@gmail.com',
  whatsapp: '966548940042', // Saudi format
};

export default function ContactScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const { t } = useTranslation();

  const handleCall = () => {
    Linking.openURL(`tel:${CONTACT_INFO.phone}`);
  };

  const handleEmail = () => {
    Linking.openURL(`mailto:${CONTACT_INFO.email}`);
  };

  const handleWhatsApp = () => {
    Linking.openURL(`whatsapp://send?phone=${CONTACT_INFO.whatsapp}`);
  };

  const handleChatBot = () => {
    router.push('/chatbot');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-forward" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('contact.title')}</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content}>
        {/* Contact Methods */}
        <View style={styles.section}>
          <TouchableOpacity
            style={[styles.contactCard, { backgroundColor: colors.card }]}
            onPress={handleCall}
          >
            <View style={[styles.iconContainer, { backgroundColor: colors.primary + '20' }]}>
              <Ionicons name="call" size={28} color={colors.primary} />
            </View>
            <View style={styles.contactInfo}>
              <Text style={[styles.contactLabel, { color: colors.textSecondary }]}>
                {t('contact.phone')}
              </Text>
              <Text style={[styles.contactValue, { color: colors.text }]}>
                {CONTACT_INFO.phone}
              </Text>
            </View>
            <Ionicons name="chevron-back" size={20} color={colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.contactCard, { backgroundColor: colors.card }]}
            onPress={handleEmail}
          >
            <View style={[styles.iconContainer, { backgroundColor: colors.primary + '20' }]}>
              <MaterialIcons name="email" size={28} color={colors.primary} />
            </View>
            <View style={styles.contactInfo}>
              <Text style={[styles.contactLabel, { color: colors.textSecondary }]}>
                {t('contact.email')}
              </Text>
              <Text style={[styles.contactValue, { color: colors.text }]}>
                {CONTACT_INFO.email}
              </Text>
            </View>
            <Ionicons name="chevron-back" size={20} color={colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.contactCard, { backgroundColor: colors.card }]}
            onPress={handleWhatsApp}
          >
            <View style={[styles.iconContainer, { backgroundColor: '#25D366' + '20' }]}>
              <Ionicons name="logo-whatsapp" size={28} color="#25D366" />
            </View>
            <View style={styles.contactInfo}>
              <Text style={[styles.contactLabel, { color: colors.textSecondary }]}>
                WhatsApp
              </Text>
              <Text style={[styles.contactValue, { color: colors.text }]}>
                {CONTACT_INFO.phone}
              </Text>
            </View>
            <Ionicons name="chevron-back" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Chatbot */}
        <View style={styles.section}>
          <TouchableOpacity
            style={[styles.chatbotCard, { backgroundColor: colors.primary }]}
            onPress={handleChatBot}
          >
            <Ionicons name="chatbubbles" size={32} color="#fff" />
            <View style={styles.chatbotContent}>
              <Text style={styles.chatbotTitle}>{t('contact.chatBot')}</Text>
              <Text style={styles.chatbotSubtitle}>
                {t('contact.workingHoursValue')}
              </Text>
            </View>
            <Ionicons name="chevron-back" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Additional Info */}
        <View style={styles.section}>
          <View style={[styles.infoCard, { backgroundColor: colors.surface }]}>
            <View style={styles.infoRow}>
              <Ionicons name="time" size={20} color={colors.primary} />
              <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>
                {t('contact.workingHours')}
              </Text>
            </View>
            <Text style={[styles.infoValue, { color: colors.text }]}>
              {t('contact.workingHoursValue')}
            </Text>
          </View>

          <View style={[styles.infoCard, { backgroundColor: colors.surface }]}>
            <View style={styles.infoRow}>
              <Ionicons name="location" size={20} color={colors.primary} />
              <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>
                {t('contact.location')}
              </Text>
            </View>
            <Text style={[styles.infoValue, { color: colors.text }]}>
              {t('contact.locationValue')}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  contactInfo: {
    flex: 1,
    marginHorizontal: 16,
  },
  contactLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  contactValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  chatbotCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  chatbotContent: {
    flex: 1,
    marginHorizontal: 16,
  },
  chatbotTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  chatbotSubtitle: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
  },
  infoCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    marginRight: 8,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 28,
  },
});
