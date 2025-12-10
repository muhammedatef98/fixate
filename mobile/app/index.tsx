import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Hero Section */}
      <View style={styles.hero}>
        <View style={styles.logoContainer}>
          <Image 
            source={require('../assets/icon.png')} 
            style={styles.logo}
          />
          <Text style={styles.logoText}>Fixatee</Text>
        </View>
        <Text style={styles.heroTitle}>إصلاح أجهزتك{'\n'}بسرعة واحترافية</Text>
        <Text style={styles.heroSubtitle}>
          خدمة صيانة متكاملة لجميع أجهزتك الإلكترونية
        </Text>
        <Link href="/request" asChild>
          <TouchableOpacity style={styles.ctaButton}>
            <Text style={styles.ctaButtonText}>احجز الآن</Text>
            <Ionicons name="arrow-forward" size={20} color="#fff" />
          </TouchableOpacity>
        </Link>
      </View>

      {/* Features */}
      <View style={styles.features}>
        <FeatureCard
          icon="shield-checkmark"
          title="ضمان ذهبي"
          description="ضمان يصل إلى 6 أشهر على جميع الخدمات"
        />
        <FeatureCard
          icon="flash"
          title="خدمة سريعة"
          description="معظم الإصلاحات تتم في نفس اليوم"
        />
        <FeatureCard
          icon="cash"
          title="أسعار شفافة"
          description="أسعار واضحة ومحددة مسبقاً"
        />
      </View>

      {/* Devices */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>الأجهزة التي نصلحها</Text>
        <View style={styles.deviceGrid}>
          <DeviceCard
            icon="phone-portrait"
            title="الجوالات"
            subtitle="iPhone, Samsung, Huawei"
          />
          <DeviceCard
            icon="laptop"
            title="اللابتوبات"
            subtitle="MacBook, Dell, HP"
          />
          <DeviceCard
            icon="tablet-portrait"
            title="التابلت"
            subtitle="iPad, Samsung Tab"
          />
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <Link href="/calculator" asChild>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="calculator" size={24} color="#10b981" />
            <Text style={styles.actionButtonText}>حاسبة الأسعار</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/profile" asChild>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="person" size={24} color="#10b981" />
            <Text style={styles.actionButtonText}>طلباتي</Text>
          </TouchableOpacity>
        </Link>
      </View>

      {/* Stats */}
      <View style={styles.stats}>
        <StatCard number="20,000+" label="جهاز تم إصلاحه" />
        <StatCard number="4.9/5" label="متوسط التقييم" />
        <StatCard number="24/7" label="دعم فني" />
      </View>
    </ScrollView>
  );
}

function FeatureCard({ icon, title, description }: any) {
  return (
    <View style={styles.featureCard}>
      <Ionicons name={icon} size={32} color="#10b981" />
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureDescription}>{description}</Text>
    </View>
  );
}

function DeviceCard({ icon, title, subtitle }: any) {
  return (
    <View style={styles.deviceCard}>
      <Ionicons name={icon} size={40} color="#10b981" />
      <Text style={styles.deviceTitle}>{title}</Text>
      <Text style={styles.deviceSubtitle}>{subtitle}</Text>
    </View>
  );
}

function StatCard({ number, label }: any) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statNumber}>{number}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  hero: {
    backgroundColor: '#10b981',
    padding: 32,
    alignItems: 'center',
    paddingTop: 60,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 12,
  },
  logoText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 12,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 12,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    opacity: 0.9,
    marginBottom: 24,
  },
  ctaButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ctaButtonText: {
    color: '#10b981',
    fontSize: 18,
    fontWeight: 'bold',
  },
  features: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  featureCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  deviceGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  deviceCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  deviceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 4,
  },
  deviceSubtitle: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  quickActions: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
  },
  stats: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#10b981',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.9,
    textAlign: 'center',
  },
});
