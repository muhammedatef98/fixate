import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS, SPACING, SHADOWS } from '../constants/theme';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

const MENU_ITEMS = [
  { id: 'account', title: 'تعديل الملف الشخصي', icon: 'person-outline' },
  { id: 'wallet', title: 'المحفظة وطرق الدفع', icon: 'account-balance-wallet' },
  { id: 'notifications', title: 'الإشعارات', icon: 'notifications-none' },
  { id: 'language', title: 'اللغة / Language', icon: 'language' },
  { id: 'support', title: 'الدعم والمساعدة', icon: 'headset-mic' },
  { id: 'about', title: 'عن التطبيق', icon: 'info-outline' },
];

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <MaterialIcons name="arrow-forward" size={24} color={COLORS.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>الملف الشخصي</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Profile Info */}
        <View style={styles.profileInfo}>
          <View style={styles.avatarContainer}>
            <Image 
              source={{ uri: 'https://ui-avatars.com/api/?name=Mohamed+Atef&background=10B981&color=fff&size=128' }} 
              style={styles.avatar} 
            />
            <TouchableOpacity style={styles.editAvatarBtn}>
              <MaterialIcons name="camera-alt" size={20} color="#FFF" />
            </TouchableOpacity>
          </View>
          <Text style={styles.name}>محمد عاطف</Text>
          <Text style={styles.phone}>+966 50 123 4567</Text>
        </View>

        {/* Stats (Optional - for technicians or loyal customers) */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>طلب مكتمل</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>4.9</Text>
            <Text style={styles.statLabel}>التقييم</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>2</Text>
            <Text style={styles.statLabel}>سنة انضمام</Text>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {MENU_ITEMS.map((item, index) => (
            <TouchableOpacity key={item.id} style={styles.menuItem}>
              <View style={styles.menuItemLeft}>
                <View style={styles.menuIcon}>
                  <MaterialIcons name={item.icon as any} size={24} color={COLORS.primary} />
                </View>
                <Text style={styles.menuTitle}>{item.title}</Text>
              </View>
              <MaterialIcons name="chevron-left" size={24} color={COLORS.textSecondary} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutBtn}>
          <MaterialIcons name="logout" size={24} color="#EF4444" />
          <Text style={styles.logoutText}>تسجيل الخروج</Text>
        </TouchableOpacity>

        <Text style={styles.version}>الإصدار 1.0.0</Text>
      </ScrollView>
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
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.small,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  profileInfo: {
    alignItems: 'center',
    marginTop: SPACING.m,
    marginBottom: SPACING.xl,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: SPACING.m,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: COLORS.surface,
  },
  editAvatarBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.primary,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.surface,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  phone: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: SPACING.l,
    marginBottom: SPACING.xl,
    padding: SPACING.l,
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    ...SHADOWS.small,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  statDivider: {
    width: 1,
    height: '80%',
    backgroundColor: COLORS.border,
  },
  menuContainer: {
    paddingHorizontal: SPACING.l,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.m,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: `${COLORS.primary}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: SPACING.m,
  },
  menuTitle: {
    fontSize: 16,
    color: COLORS.text,
    fontWeight: '500',
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.xl,
    marginBottom: SPACING.l,
    padding: SPACING.m,
    marginHorizontal: SPACING.l,
    backgroundColor: '#FEF2F2',
    borderRadius: 12,
  },
  logoutText: {
    color: '#EF4444',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: SPACING.s,
  },
  version: {
    textAlign: 'center',
    color: COLORS.textSecondary,
    fontSize: 12,
    marginBottom: SPACING.xl,
  },
});
