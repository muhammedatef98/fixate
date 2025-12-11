import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions, SafeAreaView, StatusBar, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS, SPACING, SHADOWS } from '../constants/theme';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function RoleSelectionScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleRoleSelect = (role: 'customer' | 'technician') => {
    if (role === 'customer') {
      router.push('/(customer)/home');
    } else {
      router.push('/(technician)/dashboard');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Abstract Background Shapes */}
      <View style={styles.shape1} />
      <View style={styles.shape2} />

      <SafeAreaView style={styles.safeArea}>
        <Animated.View 
          style={[
            styles.content, 
            { 
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }] 
            }
          ]}
        >
          {/* Logo Section */}
          <Animated.View style={[styles.header, { transform: [{ scale: scaleAnim }] }]}>
            <View style={styles.logoContainer}>
              {/* Using the original app icon */}
              <Image 
                source={require('../assets/icon.png')} 
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.appName}>Fixate</Text>
            <Text style={styles.tagline}>شريكك الموثوق للصيانة</Text>
          </Animated.View>

          <View style={styles.spacer} />

          <Text style={styles.sectionTitle}>كيف تود استخدام التطبيق؟</Text>
          
          {/* Customer Card */}
          <TouchableOpacity 
            style={styles.cardContainer}
            onPress={() => handleRoleSelect('customer')}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={['#FFFFFF', '#F0FDF4']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.card}
            >
              <View style={styles.iconBox}>
                <MaterialIcons name="person" size={36} color={COLORS.primary} />
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>عميل</Text>
                <Text style={styles.cardSubtitle}>أبحث عن خدمات صيانة لأجهزتي</Text>
              </View>
              <View style={styles.arrowContainer}>
                <MaterialIcons name="arrow-back-ios" size={18} color={COLORS.primary} style={{ transform: [{ rotate: '180deg' }] }} />
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* Technician Card */}
          <TouchableOpacity 
            style={styles.cardContainer}
            onPress={() => handleRoleSelect('technician')}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={['#FFFFFF', '#F8FAFC']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.card}
            >
              <View style={[styles.iconBox, { backgroundColor: '#F1F5F9' }]}>
                <MaterialIcons name="engineering" size={36} color={COLORS.textSecondary} />
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>فني صيانة</Text>
                <Text style={styles.cardSubtitle}>أقدم خدمات الصيانة وأستقبل الطلبات</Text>
              </View>
              <View style={styles.arrowContainer}>
                <MaterialIcons name="arrow-back-ios" size={18} color={COLORS.textSecondary} style={{ transform: [{ rotate: '180deg' }] }} />
              </View>
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              بالمتابعة، أنت توافق على <Text style={styles.link}>شروط الخدمة</Text> و <Text style={styles.link}>سياسة الخصوصية</Text>
            </Text>
          </View>
        </Animated.View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  safeArea: {
    flex: 1,
  },
  shape1: {
    position: 'absolute',
    top: -100,
    right: -50,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: `${COLORS.primary}05`,
  },
  shape2: {
    position: 'absolute',
    bottom: -50,
    left: -50,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: `${COLORS.primary}05`,
  },
  content: {
    flex: 1,
    padding: SPACING.l,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING.xxl,
    marginTop: SPACING.xl,
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.m,
    ...SHADOWS.medium, // Add shadow to make logo pop
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 20,
  },
  appName: {
    fontSize: 36,
    fontWeight: '800',
    color: COLORS.text,
    letterSpacing: 0.5,
    marginBottom: SPACING.xs,
  },
  tagline: {
    fontSize: 16,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  spacer: {
    height: SPACING.xl,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.l,
    textAlign: 'right',
    marginRight: SPACING.xs,
  },
  cardContainer: {
    marginBottom: SPACING.m,
    borderRadius: 24,
    ...SHADOWS.medium,
    backgroundColor: '#FFF',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.l,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.03)',
  },
  iconBox: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: '#DCFCE7',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: SPACING.m,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
    textAlign: 'right',
  },
  cardSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'right',
    lineHeight: 20,
  },
  arrowContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.s,
  },
  footer: {
    marginTop: 'auto',
    paddingBottom: SPACING.l,
  },
  footerText: {
    textAlign: 'center',
    color: COLORS.textSecondary,
    fontSize: 13,
    lineHeight: 20,
  },
  link: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
});
