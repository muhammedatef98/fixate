import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const DEVICE_TYPES = [
  { id: 'phone', name: 'جوال', icon: 'phone-portrait' },
  { id: 'laptop', name: 'لابتوب', icon: 'laptop' },
  { id: 'tablet', name: 'تابلت', icon: 'tablet-portrait' },
];

const BRANDS = {
  phone: ['Apple', 'Samsung', 'Huawei', 'Xiaomi', 'Oppo'],
  laptop: ['Apple', 'Dell', 'HP', 'Lenovo', 'Asus'],
  tablet: ['Apple', 'Samsung', 'Huawei', 'Lenovo'],
};

const ISSUES = [
  'تغيير الشاشة',
  'تغيير البطارية',
  'إصلاح منفذ الشحن',
  'إصلاح الكاميرا',
  'حل مشاكل البرامج',
  'أخرى',
];

export default function RequestScreen() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [deviceType, setDeviceType] = useState('');
  const [brand, setBrand] = useState('');
  const [issue, setIssue] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = () => {
    if (!deviceType || !brand || !issue || !address || !city || !phone) {
      Alert.alert('خطأ', 'الرجاء ملء جميع الحقول');
      return;
    }

    Alert.alert(
      'تم الإرسال!',
      'تم استلام طلبك بنجاح. سيتم التواصل معك قريباً.',
      [
        {
          text: 'حسناً',
          onPress: () => router.push('/'),
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Progress Steps */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${(step / 3) * 100}%` }]} />
        </View>
        <Text style={styles.progressText}>الخطوة {step} من 3</Text>
      </View>

      {/* Step 1: Device Selection */}
      {step === 1 && (
        <View style={styles.step}>
          <Text style={styles.stepTitle}>اختر نوع الجهاز</Text>
          <View style={styles.deviceGrid}>
            {DEVICE_TYPES.map((device) => (
              <TouchableOpacity
                key={device.id}
                style={[
                  styles.deviceOption,
                  deviceType === device.id && styles.deviceOptionSelected,
                ]}
                onPress={() => setDeviceType(device.id)}
              >
                <Ionicons
                  name={device.icon as any}
                  size={40}
                  color={deviceType === device.id ? '#10b981' : '#6b7280'}
                />
                <Text
                  style={[
                    styles.deviceOptionText,
                    deviceType === device.id && styles.deviceOptionTextSelected,
                  ]}
                >
                  {device.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {deviceType && (
            <>
              <Text style={styles.stepTitle}>اختر الماركة</Text>
              <View style={styles.brandGrid}>
                {BRANDS[deviceType as keyof typeof BRANDS]?.map((b) => (
                  <TouchableOpacity
                    key={b}
                    style={[
                      styles.brandOption,
                      brand === b && styles.brandOptionSelected,
                    ]}
                    onPress={() => setBrand(b)}
                  >
                    <Text
                      style={[
                        styles.brandOptionText,
                        brand === b && styles.brandOptionTextSelected,
                      ]}
                    >
                      {b}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          )}

          {brand && (
            <TouchableOpacity
              style={styles.nextButton}
              onPress={() => setStep(2)}
            >
              <Text style={styles.nextButtonText}>التالي</Text>
              <Ionicons name="arrow-forward" size={20} color="#fff" />
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* Step 2: Issue Selection */}
      {step === 2 && (
        <View style={styles.step}>
          <Text style={styles.stepTitle}>ما هي المشكلة؟</Text>
          {ISSUES.map((i) => (
            <TouchableOpacity
              key={i}
              style={[
                styles.issueOption,
                issue === i && styles.issueOptionSelected,
              ]}
              onPress={() => setIssue(i)}
            >
              <Text
                style={[
                  styles.issueOptionText,
                  issue === i && styles.issueOptionTextSelected,
                ]}
              >
                {i}
              </Text>
              {issue === i && (
                <Ionicons name="checkmark-circle" size={24} color="#10b981" />
              )}
            </TouchableOpacity>
          ))}

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setStep(1)}
            >
              <Ionicons name="arrow-back" size={20} color="#10b981" />
              <Text style={styles.backButtonText}>السابق</Text>
            </TouchableOpacity>
            {issue && (
              <TouchableOpacity
                style={styles.nextButton}
                onPress={() => setStep(3)}
              >
                <Text style={styles.nextButtonText}>التالي</Text>
                <Ionicons name="arrow-forward" size={20} color="#fff" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}

      {/* Step 3: Contact Info */}
      {step === 3 && (
        <View style={styles.step}>
          <Text style={styles.stepTitle}>معلومات التواصل</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>المدينة</Text>
            <TextInput
              style={styles.input}
              placeholder="مثال: الرياض"
              value={city}
              onChangeText={setCity}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>العنوان</Text>
            <TextInput
              style={styles.input}
              placeholder="مثال: حي النخيل، شارع الملك فهد"
              value={address}
              onChangeText={setAddress}
              multiline
              numberOfLines={3}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>رقم الجوال</Text>
            <TextInput
              style={styles.input}
              placeholder="05xxxxxxxx"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setStep(2)}
            >
              <Ionicons name="arrow-back" size={20} color="#10b981" />
              <Text style={styles.backButtonText}>السابق</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
            >
              <Text style={styles.submitButtonText}>إرسال الطلب</Text>
              <Ionicons name="checkmark" size={20} color="#fff" />
            </TouchableOpacity>
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
  progressContainer: {
    padding: 16,
    backgroundColor: '#fff',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#10b981',
  },
  progressText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  step: {
    padding: 16,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  deviceGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  deviceOption: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e5e7eb',
  },
  deviceOptionSelected: {
    borderColor: '#10b981',
    backgroundColor: '#f0fdf4',
  },
  deviceOptionText: {
    fontSize: 14,
    marginTop: 8,
    color: '#6b7280',
  },
  deviceOptionTextSelected: {
    color: '#10b981',
    fontWeight: 'bold',
  },
  brandGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  brandOption: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#e5e7eb',
  },
  brandOptionSelected: {
    borderColor: '#10b981',
    backgroundColor: '#f0fdf4',
  },
  brandOptionText: {
    fontSize: 16,
    color: '#6b7280',
  },
  brandOptionTextSelected: {
    color: '#10b981',
    fontWeight: 'bold',
  },
  issueOption: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e5e7eb',
  },
  issueOptionSelected: {
    borderColor: '#10b981',
    backgroundColor: '#f0fdf4',
  },
  issueOptionText: {
    fontSize: 16,
    color: '#6b7280',
  },
  issueOptionTextSelected: {
    color: '#10b981',
    fontWeight: 'bold',
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  backButton: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 2,
    borderColor: '#10b981',
  },
  backButtonText: {
    color: '#10b981',
    fontSize: 16,
    fontWeight: 'bold',
  },
  nextButton: {
    flex: 1,
    backgroundColor: '#10b981',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  submitButton: {
    flex: 1,
    backgroundColor: '#10b981',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
