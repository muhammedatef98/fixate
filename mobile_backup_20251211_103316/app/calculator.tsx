import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Dimensions, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS, SPACING, SHADOWS } from '../constants/theme';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// Pricing Data
const PRICING_DATA = {
  brands: [
    { id: 'apple', name: 'Apple', icon: 'apple' },
    { id: 'samsung', name: 'Samsung', icon: 'android' },
    { id: 'huawei', name: 'Huawei', icon: 'cellphone' },
  ],
  devices: [
    { id: 'phone', name: 'جوال', icon: 'cellphone' },
    { id: 'tablet', name: 'تابلت', icon: 'tablet' },
    { id: 'laptop', name: 'لابتوب', icon: 'laptop' },
  ],
  issues: [
    { id: 'screen', name: 'كسر الشاشة', basePrice: 250 },
    { id: 'battery', name: 'تغيير بطارية', basePrice: 120 },
    { id: 'charging', name: 'مدخل الشحن', basePrice: 100 },
    { id: 'camera', name: 'الكاميرا', basePrice: 180 },
    { id: 'software', name: 'سوفتوير', basePrice: 80 },
  ]
};

export default function PriceCalculatorScreen() {
  const router = useRouter();
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null);

  const calculatePrice = () => {
    if (!selectedIssue) return 0;
    const issue = PRICING_DATA.issues.find(i => i.id === selectedIssue);
    let price = issue?.basePrice || 0;

    // Price adjustments based on brand/device
    if (selectedBrand === 'apple') price *= 1.2; // Apple parts are more expensive
    if (selectedDevice === 'laptop') price *= 1.5; // Laptop repairs are more complex
    if (selectedDevice === 'tablet') price *= 1.3;

    return Math.round(price);
  };

  const totalPrice = calculatePrice();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <MaterialIcons name="arrow-forward" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>حاسبة الأسعار التقديرية</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Brand Selection */}
        <Text style={styles.sectionTitle}>اختر الماركة</Text>
        <View style={styles.grid}>
          {PRICING_DATA.brands.map((brand) => (
            <TouchableOpacity
              key={brand.id}
              style={[
                styles.card,
                selectedBrand === brand.id && styles.selectedCard
              ]}
              onPress={() => setSelectedBrand(brand.id)}
            >
              <MaterialCommunityIcons 
                name={brand.icon as any} 
                size={32} 
                color={selectedBrand === brand.id ? COLORS.primary : COLORS.textSecondary} 
              />
              <Text style={[
                styles.cardText,
                selectedBrand === brand.id && styles.selectedText
              ]}>{brand.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Device Selection */}
        <Text style={styles.sectionTitle}>اختر نوع الجهاز</Text>
        <View style={styles.grid}>
          {PRICING_DATA.devices.map((device) => (
            <TouchableOpacity
              key={device.id}
              style={[
                styles.card,
                selectedDevice === device.id && styles.selectedCard
              ]}
              onPress={() => setSelectedDevice(device.id)}
            >
              <MaterialCommunityIcons 
                name={device.icon as any} 
                size={32} 
                color={selectedDevice === device.id ? COLORS.primary : COLORS.textSecondary} 
              />
              <Text style={[
                styles.cardText,
                selectedDevice === device.id && styles.selectedText
              ]}>{device.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Issue Selection */}
        <Text style={styles.sectionTitle}>اختر نوع العطل</Text>
        <View style={styles.list}>
          {PRICING_DATA.issues.map((issue) => (
            <TouchableOpacity
              key={issue.id}
              style={[
                styles.listItem,
                selectedIssue === issue.id && styles.selectedListItem
              ]}
              onPress={() => setSelectedIssue(issue.id)}
            >
              <Text style={[
                styles.listItemText,
                selectedIssue === issue.id && styles.selectedText
              ]}>{issue.name}</Text>
              {selectedIssue === issue.id && (
                <MaterialIcons name="check-circle" size={24} color={COLORS.primary} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Price Result Footer */}
      <View style={styles.footer}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>السعر التقديري:</Text>
          <Text style={styles.priceValue}>
            {totalPrice > 0 ? `${totalPrice} ر.س` : '--'}
          </Text>
        </View>
        <Text style={styles.disclaimer}>* السعر نهائي بعد الفحص وقد يختلف حسب الموديل الدقيق</Text>
        
        <TouchableOpacity 
          style={[styles.bookBtn, totalPrice === 0 && styles.disabledBtn]}
          disabled={totalPrice === 0}
          onPress={() => router.push('/request')}
        >
          <Text style={styles.bookBtnText}>احجز موعد صيانة الآن</Text>
          <MaterialIcons name="arrow-back" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.l,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  content: {
    padding: SPACING.l,
    paddingBottom: 100,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.m,
    marginTop: SPACING.s,
    textAlign: 'right',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.m,
    marginBottom: SPACING.l,
  },
  card: {
    width: (width - SPACING.l * 2 - SPACING.m * 2) / 3,
    backgroundColor: COLORS.surface,
    padding: SPACING.m,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    ...SHADOWS.small,
  },
  selectedCard: {
    borderColor: COLORS.primary,
    backgroundColor: '#ECFDF5',
  },
  cardText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  selectedText: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  list: {
    gap: SPACING.s,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: SPACING.l,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  selectedListItem: {
    borderColor: COLORS.primary,
    backgroundColor: '#ECFDF5',
  },
  listItemText: {
    fontSize: 16,
    color: COLORS.text,
  },
  footer: {
    padding: SPACING.l,
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    ...SHADOWS.large,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.s,
  },
  priceLabel: {
    fontSize: 18,
    color: COLORS.text,
    fontWeight: 'bold',
  },
  priceValue: {
    fontSize: 24,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  disclaimer: {
    fontSize: 12,
    color: COLORS.textSecondary,
    textAlign: 'right',
    marginBottom: SPACING.m,
  },
  bookBtn: {
    backgroundColor: COLORS.primary,
    padding: SPACING.l,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  disabledBtn: {
    backgroundColor: COLORS.textSecondary,
    opacity: 0.5,
  },
  bookBtnText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
