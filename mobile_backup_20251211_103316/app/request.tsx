import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Image, Dimensions, TextInput, Animated, Alert, KeyboardAvoidingView, Platform, Modal, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS, SPACING, SHADOWS } from '../constants/theme';
import { MaterialIcons, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { useRequests } from '../context/RequestContext';

const { width } = Dimensions.get('window');

// Mock Data
const BRANDS = [
  { id: 'apple', name: 'Apple', icon: 'logo-apple' },
  { id: 'samsung', name: 'Samsung', icon: 'logo-android' },
  { id: 'huawei', name: 'Huawei', icon: 'hardware-chip' },
  { id: 'xiaomi', name: 'Xiaomi', icon: 'smartphone' },
];

const DEVICE_TYPES = [
  { id: 'phone', name: 'جوال', icon: 'cellphone' },
  { id: 'tablet', name: 'تابلت', icon: 'tablet' },
  { id: 'laptop', name: 'لابتوب', icon: 'laptop' },
  { id: 'watch', name: 'ساعة ذكية', icon: 'watch' },
];

const MODELS: Record<string, Record<string, Array<{id: string, name: string}>>> = {
  apple: {
    phone: [
      { id: 'iphone15pm', name: 'iPhone 15 Pro Max' },
      { id: 'iphone15p', name: 'iPhone 15 Pro' },
      { id: 'iphone14pm', name: 'iPhone 14 Pro Max' },
      { id: 'iphone13', name: 'iPhone 13' },
    ],
    tablet: [
      { id: 'ipad_pro_12', name: 'iPad Pro 12.9"' },
      { id: 'ipad_air', name: 'iPad Air' },
      { id: 'ipad_mini', name: 'iPad Mini' },
    ],
    laptop: [
      { id: 'macbook_pro_16', name: 'MacBook Pro 16"' },
      { id: 'macbook_air_m2', name: 'MacBook Air M2' },
    ],
    watch: [
      { id: 'watch_ultra', name: 'Apple Watch Ultra' },
      { id: 'watch_s9', name: 'Apple Watch Series 9' },
    ]
  },
  samsung: {
    phone: [
      { id: 's24u', name: 'Galaxy S24 Ultra' },
      { id: 's23', name: 'Galaxy S23' },
      { id: 'z_fold', name: 'Galaxy Z Fold 5' },
    ],
    tablet: [
      { id: 'tab_s9', name: 'Galaxy Tab S9' },
      { id: 'tab_a8', name: 'Galaxy Tab A8' },
    ],
    watch: [
      { id: 'watch_6', name: 'Galaxy Watch 6' },
    ]
  },
  huawei: {
    phone: [
      { id: 'p60_pro', name: 'P60 Pro' },
      { id: 'mate_x3', name: 'Mate X3' },
    ]
  },
  xiaomi: {
    phone: [
      { id: 'mi_13', name: 'Xiaomi 13' },
      { id: 'redmi_note', name: 'Redmi Note 12' },
    ]
  }
};

const ISSUES = [
  { id: 'screen', name: 'كسر الشاشة', price: '350 ر.س', icon: 'cellphone-screenshot' },
  { id: 'battery', name: 'تغيير بطارية', price: '150 ر.س', icon: 'battery-alert' },
  { id: 'charging', name: 'مشكلة شحن', price: '120 ر.س', icon: 'lightning-bolt' },
  { id: 'camera', name: 'الكاميرا', price: '200 ر.س', icon: 'camera' },
  { id: 'water', name: 'تلف مياه', price: 'فحص', icon: 'water' },
  { id: 'software', name: 'سوفتوير', price: '100 ر.س', icon: 'update' },
  { id: 'other', name: 'أخرى', price: 'فحص', icon: 'help-circle-outline' },
];

const STEPS = ['الماركة', 'النوع', 'الموديل', 'العطل', 'التفاصيل', 'الموقع'];

export default function RequestScreen() {
  const router = useRouter();
  const { addRequest } = useRequests();
  const [currentStep, setCurrentStep] = useState(0);
  
  // Selection State
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null);
  const [issueDescription, setIssueDescription] = useState('');
  const [location, setLocation] = useState('');
  const [region, setRegion] = useState({
    latitude: 24.7136,
    longitude: 46.6753,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Reset and animate when step changes
    fadeAnim.setValue(0);
    slideAnim.setValue(50);

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      submitRequest();
    }
  };

  const submitRequest = () => {
    // 1. Prepare Request Data
    const brandName = BRANDS.find(b => b.id === selectedBrand)?.name || '';
    const typeName = DEVICE_TYPES.find(t => t.id === selectedType)?.name || '';
    const modelName = selectedBrand && selectedType && MODELS[selectedBrand]?.[selectedType]?.find(m => m.id === selectedModel)?.name || '';
    const issueData = ISSUES.find(i => i.id === selectedIssue);
    const issueName = issueData?.name || '';
    const price = issueData?.price || '';

    // 2. Save to Context (Shared State)
    addRequest({
      brand: brandName,
      deviceType: typeName,
      model: modelName,
      issue: issueName,
      description: issueDescription,
      location: location || 'موقع محدد على الخريطة',
      price: price,
    });

    // 3. Send Email
    const subject = `طلب صيانة جديد: ${modelName} - ${issueName}`;
    const body = `
تفاصيل الطلب الجديد:
------------------
الجهاز: ${brandName} ${modelName} (${typeName})
العطل: ${issueName}
السعر التقديري: ${price}
وصف المشكلة: ${issueDescription}
الموقع: ${location || `https://maps.google.com/?q=${region.latitude},${region.longitude}`}

يرجى التواصل مع العميل في أقرب وقت.
    `;

    const mailtoUrl = `mailto:fixate01@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    Linking.openURL(mailtoUrl).catch(err => {
      console.error('Failed to open email client', err);
      Alert.alert('تنبيه', 'لم نتمكن من فتح تطبيق البريد الإلكتروني، ولكن تم حفظ طلبك في التطبيق.');
    });

    // 4. Show Success Message
    Alert.alert(
      'تم استلام طلبك بنجاح',
      'تم إرسال تفاصيل الطلب للفنيين وسيتم التواصل معك قريباً.',
      [
        { text: 'حسناً', onPress: () => router.push('/(customer)/home') }
      ]
    );
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      router.back();
    }
  };

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('تنبيه', 'نحتاج إذن الوصول للموقع لتحديد مكانك');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
    setLocation('موقعي الحالي');
  };

  const renderStepContent = () => {
    const animatedStyle = {
      opacity: fadeAnim,
      transform: [{ translateX: slideAnim }]
    };

    switch (currentStep) {
      case 0: // Brand Selection
        return (
          <Animated.View style={[styles.gridContainer, animatedStyle]}>
            {BRANDS.map((brand) => (
              <TouchableOpacity
                key={brand.id}
                style={[
                  styles.selectionCard,
                  selectedBrand === brand.id && styles.selectedCard
                ]}
                onPress={() => {
                  setSelectedBrand(brand.id);
                  handleNext();
                }}
              >
                <Ionicons 
                  name={brand.icon as any} 
                  size={48} 
                  color={selectedBrand === brand.id ? COLORS.primary : COLORS.textSecondary} 
                />
                <Text style={[
                  styles.cardLabel,
                  selectedBrand === brand.id && styles.selectedText
                ]}>{brand.name}</Text>
              </TouchableOpacity>
            ))}
          </Animated.View>
        );

      case 1: // Device Type Selection
        return (
          <Animated.View style={[styles.gridContainer, animatedStyle]}>
            {DEVICE_TYPES.map((type) => (
              <TouchableOpacity
                key={type.id}
                style={[
                  styles.selectionCard,
                  selectedType === type.id && styles.selectedCard
                ]}
                onPress={() => {
                  setSelectedType(type.id);
                  handleNext();
                }}
              >
                <MaterialCommunityIcons 
                  name={type.icon as any} 
                  size={48} 
                  color={selectedType === type.id ? COLORS.primary : COLORS.textSecondary} 
                />
                <Text style={[
                  styles.cardLabel,
                  selectedType === type.id && styles.selectedText
                ]}>{type.name}</Text>
              </TouchableOpacity>
            ))}
          </Animated.View>
        );

      case 2: // Model Selection
        const availableModels = selectedBrand && selectedType && MODELS[selectedBrand]?.[selectedType] 
          ? MODELS[selectedBrand][selectedType] 
          : [];

        return (
          <Animated.View style={animatedStyle}>
            <Text style={styles.stepTitle}>
              اختر موديل {BRANDS.find(b => b.id === selectedBrand)?.name}
            </Text>
            {availableModels.length > 0 ? (
              availableModels.map((model) => (
                <TouchableOpacity
                  key={model.id}
                  style={[
                    styles.listItem,
                    selectedModel === model.id && styles.selectedListItem
                  ]}
                  onPress={() => {
                    setSelectedModel(model.id);
                    handleNext();
                  }}
                >
                  <Text style={[
                    styles.listItemText,
                    selectedModel === model.id && styles.selectedText
                  ]}>{model.name}</Text>
                  {selectedModel === model.id && (
                    <MaterialIcons name="check-circle" size={24} color={COLORS.primary} />
                  )}
                </TouchableOpacity>
              ))
            ) : (
              <View style={styles.emptyState}>
                <MaterialIcons name="devices-other" size={48} color={COLORS.textSecondary} />
                <Text style={styles.noData}>لا توجد موديلات متاحة لهذا التصنيف حالياً</Text>
              </View>
            )}
          </Animated.View>
        );

      case 3: // Issue Selection
        return (
          <Animated.View style={[styles.gridContainer, animatedStyle]}>
            {ISSUES.map((issue) => (
              <TouchableOpacity
                key={issue.id}
                style={[
                  styles.issueCard,
                  selectedIssue === issue.id && styles.selectedCard
                ]}
                onPress={() => {
                  setSelectedIssue(issue.id);
                  handleNext();
                }}
              >
                <View style={[
                  styles.iconBox,
                  selectedIssue === issue.id && { backgroundColor: '#FFF' }
                ]}>
                  <MaterialCommunityIcons 
                    name={issue.icon as any} 
                    size={28} 
                    color={selectedIssue === issue.id ? COLORS.primary : COLORS.textSecondary} 
                  />
                </View>
                <Text style={[
                  styles.issueName,
                  selectedIssue === issue.id && styles.selectedText
                ]}>{issue.name}</Text>
                <Text style={[
                  styles.issuePrice,
                  selectedIssue === issue.id && { color: '#FFF' }
                ]}>{issue.price}</Text>
              </TouchableOpacity>
            ))}
          </Animated.View>
        );

      case 4: // Issue Details (New Step)
        return (
          <Animated.View style={animatedStyle}>
            <Text style={styles.stepTitle}>صف المشكلة بالتفصيل</Text>
            <Text style={styles.stepSubtitle}>
              ساعد الفني في فهم المشكلة بشكل أفضل لتجهيز القطع المناسبة
            </Text>
            
            <View style={styles.textAreaContainer}>
              <TextInput
                style={styles.textArea}
                placeholder="مثال: الشاشة مكسورة ولكن اللمس يعمل، أو الجهاز لا يشحن إلا بزاوية معينة..."
                placeholderTextColor={COLORS.textSecondary}
                multiline
                numberOfLines={6}
                textAlignVertical="top"
                value={issueDescription}
                onChangeText={setIssueDescription}
              />
            </View>

            <View style={styles.tipsContainer}>
              <View style={styles.tipItem}>
                <MaterialIcons name="info-outline" size={20} color={COLORS.primary} />
                <Text style={styles.tipText}>هل تعرض الجهاز للماء مؤخراً؟</Text>
              </View>
              <View style={styles.tipItem}>
                <MaterialIcons name="info-outline" size={20} color={COLORS.primary} />
                <Text style={styles.tipText}>هل تمت صيانته من قبل؟</Text>
              </View>
            </View>
          </Animated.View>
        );

      case 5: // Location
        return (
          <Animated.View style={animatedStyle}>
            <View style={styles.mapContainer}>
              <MapView
                style={styles.map}
                region={region}
                onRegionChangeComplete={setRegion}
                showsUserLocation={true}
                showsMyLocationButton={false}
              >
                <Marker coordinate={region} />
              </MapView>
              <View style={styles.mapOverlay}>
                <TouchableOpacity style={styles.currentLocationBtn} onPress={getCurrentLocation}>
                  <MaterialIcons name="my-location" size={24} color="#FFF" />
                  <Text style={styles.currentLocationText}>موقعي الحالي</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.locationInputContainer}>
              <MaterialIcons name="search" size={24} color={COLORS.textSecondary} />
              <TextInput
                style={styles.locationInput}
                placeholder="أو ابحث عن عنوان..."
                value={location}
                onChangeText={setLocation}
              />
            </View>
          </Animated.View>
        );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backBtn}>
            <MaterialIcons name="arrow-forward" size={24} color={COLORS.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>حجز صيانة</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBarBg}>
            <Animated.View 
              style={[
                styles.progressBarFill, 
                { 
                  width: `${((currentStep + 1) / STEPS.length) * 100}%` 
                }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>
            خطوة {currentStep + 1} من {STEPS.length}: {STEPS[currentStep]}
          </Text>
        </View>

        {/* Content */}
        <ScrollView contentContainerStyle={styles.content}>
          {renderStepContent()}
        </ScrollView>

        {/* Footer Action */}
        <View style={styles.footer}>
          <TouchableOpacity 
            style={[
              styles.submitBtn, 
              (currentStep === 5 && !location) && styles.disabledBtn
            ]} 
            onPress={handleNext}
            disabled={currentStep === 5 && !location}
          >
            <Text style={styles.submitBtnText}>
              {currentStep === STEPS.length - 1 ? 'تأكيد الطلب' : 'التالي'}
            </Text>
            <MaterialIcons 
              name={currentStep === STEPS.length - 1 ? "check-circle" : "arrow-back"} 
              size={24} 
              color="#FFF" 
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
  progressContainer: {
    padding: SPACING.l,
    backgroundColor: COLORS.surface,
    marginBottom: SPACING.m,
  },
  progressBarBg: {
    height: 6,
    backgroundColor: COLORS.border,
    borderRadius: 3,
    marginBottom: SPACING.s,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 3,
  },
  progressText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'right',
  },
  content: {
    padding: SPACING.l,
    paddingBottom: 100,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.m,
    justifyContent: 'space-between',
  },
  selectionCard: {
    width: (width - SPACING.l * 2 - SPACING.m) / 2,
    backgroundColor: COLORS.surface,
    padding: SPACING.l,
    borderRadius: 20,
    alignItems: 'center',
    ...SHADOWS.small,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedCard: {
    borderColor: COLORS.primary,
    backgroundColor: '#ECFDF5',
  },
  cardLabel: {
    marginTop: SPACING.m,
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  selectedText: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: SPACING.s,
    color: COLORS.text,
    textAlign: 'right',
  },
  stepSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: SPACING.l,
    textAlign: 'right',
    lineHeight: 20,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: SPACING.l,
    borderRadius: 16,
    marginBottom: SPACING.m,
    ...SHADOWS.small,
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
    fontWeight: '500',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.xl,
  },
  noData: {
    textAlign: 'center',
    color: COLORS.textSecondary,
    marginTop: SPACING.m,
    fontSize: 16,
  },
  issueCard: {
    width: (width - SPACING.l * 2 - SPACING.m) / 2,
    backgroundColor: COLORS.surface,
    padding: SPACING.m,
    borderRadius: 20,
    ...SHADOWS.small,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  iconBox: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.m,
  },
  issueName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
    textAlign: 'right',
  },
  issuePrice: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  textAreaContainer: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: SPACING.m,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.l,
  },
  textArea: {
    fontSize: 16,
    color: COLORS.text,
    textAlign: 'right',
    minHeight: 120,
  },
  tipsContainer: {
    backgroundColor: '#ECFDF5',
    padding: SPACING.m,
    borderRadius: 12,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  tipText: {
    fontSize: 14,
    color: COLORS.primary,
    flex: 1,
    textAlign: 'right',
  },
  mapContainer: {
    height: 300,
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: SPACING.l,
    position: 'relative',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  mapOverlay: {
    position: 'absolute',
    bottom: SPACING.m,
    right: SPACING.m,
  },
  currentLocationBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.l,
    paddingVertical: SPACING.s,
    borderRadius: 24,
    gap: 8,
    ...SHADOWS.medium,
  },
  currentLocationText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  locationInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: SPACING.m,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.small,
  },
  locationInput: {
    flex: 1,
    marginRight: SPACING.s,
    textAlign: 'right',
    fontSize: 16,
  },
  footer: {
    padding: SPACING.l,
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  submitBtn: {
    backgroundColor: COLORS.primary,
    padding: SPACING.l,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    ...SHADOWS.medium,
  },
  disabledBtn: {
    backgroundColor: COLORS.textSecondary,
    opacity: 0.5,
  },
  submitBtnText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
