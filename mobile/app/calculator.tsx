import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PRICES: any = {
  phone: {
    Apple: { screen: 300, battery: 150, charging: 100, camera: 200 },
    Samsung: { screen: 250, battery: 120, charging: 80, camera: 150 },
    Huawei: { screen: 200, battery: 100, charging: 70, camera: 120 },
  },
  laptop: {
    Apple: { screen: 800, battery: 300, software: 150, cleaning: 100 },
    Dell: { screen: 600, battery: 250, software: 120, cleaning: 80 },
    HP: { screen: 550, battery: 200, software: 100, cleaning: 70 },
  },
  tablet: {
    Apple: { screen: 500, battery: 200, charging: 120, software: 100 },
    Samsung: { screen: 400, battery: 150, charging: 100, software: 80 },
  },
};

export default function CalculatorScreen() {
  const [deviceType, setDeviceType] = useState('');
  const [brand, setBrand] = useState('');
  const [issue, setIssue] = useState('');
  const [price, setPrice] = useState(0);

  const calculatePrice = (device: string, b: string, i: string) => {
    const devicePrices = PRICES[device];
    if (!devicePrices || !devicePrices[b]) return 0;
    return devicePrices[b][i] || 0;
  };

  const handleCalculate = (device: string, b: string, i: string) => {
    setDeviceType(device);
    setBrand(b);
    setIssue(i);
    const calculatedPrice = calculatePrice(device, b, i);
    setPrice(calculatedPrice);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="calculator" size={48} color="#10b981" />
        <Text style={styles.headerTitle}>حاسبة الأسعار</Text>
        <Text style={styles.headerSubtitle}>
          احصل على سعر تقديري لإصلاح جهازك
        </Text>
      </View>

      {/* Device Selection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>اختر نوع الجهاز</Text>
        <View style={styles.optionGrid}>
          {['phone', 'laptop', 'tablet'].map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.option,
                deviceType === type && styles.optionSelected,
              ]}
              onPress={() => {
                setDeviceType(type);
                setBrand('');
                setIssue('');
                setPrice(0);
              }}
            >
              <Text style={styles.optionText}>
                {type === 'phone' ? 'جوال' : type === 'laptop' ? 'لابتوب' : 'تابلت'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Brand Selection */}
      {deviceType && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>اختر الماركة</Text>
          <View style={styles.optionGrid}>
            {Object.keys(PRICES[deviceType] || {}).map((b) => (
              <TouchableOpacity
                key={b}
                style={[
                  styles.option,
                  brand === b && styles.optionSelected,
                ]}
                onPress={() => {
                  setBrand(b);
                  setIssue('');
                  setPrice(0);
                }}
              >
                <Text style={styles.optionText}>{b}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* Issue Selection */}
      {brand && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>اختر المشكلة</Text>
          <View style={styles.optionGrid}>
            {Object.keys(PRICES[deviceType][brand] || {}).map((i) => (
              <TouchableOpacity
                key={i}
                style={[
                  styles.option,
                  issue === i && styles.optionSelected,
                ]}
                onPress={() => handleCalculate(deviceType, brand, i)}
              >
                <Text style={styles.optionText}>
                  {i === 'screen' ? 'شاشة' :
                   i === 'battery' ? 'بطارية' :
                   i === 'charging' ? 'شحن' :
                   i === 'camera' ? 'كاميرا' :
                   i === 'software' ? 'برامج' :
                   i === 'cleaning' ? 'تنظيف' : i}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* Price Result */}
      {price > 0 && (
        <View style={styles.result}>
          <View style={styles.resultCard}>
            <Text style={styles.resultLabel}>السعر التقديري</Text>
            <Text style={styles.resultPrice}>{price} ريال</Text>
            <Text style={styles.resultNote}>
              * السعر النهائي قد يختلف حسب حالة الجهاز
            </Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    backgroundColor: '#fff',
    padding: 32,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  optionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  option: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#e5e7eb',
  },
  optionSelected: {
    borderColor: '#10b981',
    backgroundColor: '#f0fdf4',
  },
  optionText: {
    fontSize: 16,
    fontWeight: '600',
  },
  result: {
    padding: 16,
  },
  resultCard: {
    backgroundColor: '#10b981',
    padding: 32,
    borderRadius: 16,
    alignItems: 'center',
  },
  resultLabel: {
    fontSize: 18,
    color: '#fff',
    opacity: 0.9,
    marginBottom: 8,
  },
  resultPrice: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  resultNote: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.8,
    textAlign: 'center',
  },
});
