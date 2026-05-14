import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Feather, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

export default function DashboardScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="dark" backgroundColor="#FFFFFF" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.dateText}>THURSDAY, MAY 14</Text>
            <Text style={styles.greetingText}>Good morning.</Text>
          </View>
          <TouchableOpacity style={styles.profileAvatar}>
            <Text style={styles.avatarText}>M</Text>
          </TouchableOpacity>
        </View>

        {/* AI Directive Card */}
        <View style={styles.directiveCard}>
          <View style={styles.directiveHeader}>
            <MaterialCommunityIcons name="robot-outline" size={20} color="#F97316" />
            <Text style={styles.directiveTitle}>AI Coach Directive</Text>
          </View>
          <Text style={styles.directiveBody}>
            You missed your Deep Work block yesterday. Today, your phone will lock out social media until you log 2 hours of focused coding. Don't disappoint me.
          </Text>
        </View>

        {/* Vitals / Stats */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Vitals</Text>
        </View>
        <View style={styles.vitalsContainer}>
          <View style={styles.vitalBox}>
            <Text style={styles.vitalValue}>89%</Text>
            <Text style={styles.vitalLabel}>Focus</Text>
          </View>
          <View style={styles.vitalBox}>
            <Text style={styles.vitalValue}>14</Text>
            <Text style={styles.vitalLabel}>Day Streak</Text>
          </View>
          <View style={styles.vitalBox}>
            <Text style={styles.vitalValue}>High</Text>
            <Text style={styles.vitalLabel}>Drive</Text>
          </View>
        </View>

        {/* Punisher Contracts / Tasks */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Today's Contracts</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See all</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.tasksContainer}>
          <TouchableOpacity style={styles.taskCard}>
            <View style={[styles.checkbox, styles.checkboxChecked]}>
              <Feather name="check" size={14} color="#FFFFFF" />
            </View>
            <View style={styles.taskInfo}>
              <Text style={styles.taskTitleCompleted}>Morning Workout</Text>
              <Text style={styles.taskTime}>06:00 AM</Text>
            </View>
            <View style={styles.stakeBoxCompleted}>
              <Text style={styles.stakeTextCompleted}>$10 Safe</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.taskCard}>
            <View style={styles.checkbox} />
            <View style={styles.taskInfo}>
              <Text style={styles.taskTitle}>Deploy Supabase</Text>
              <Text style={styles.taskTime}>12:00 PM</Text>
            </View>
            <View style={styles.stakeBoxActive}>
              <Text style={styles.stakeTextActive}>$50 at Risk</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.taskCard}>
            <View style={styles.checkbox} />
            <View style={styles.taskInfo}>
              <Text style={styles.taskTitle}>Read 20 pages</Text>
              <Text style={styles.taskTime}>09:00 PM</Text>
            </View>
            <View style={styles.stakeBoxActive}>
              <Text style={styles.stakeTextActive}>$5 at Risk</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* External Integrations Snapshot */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Connected Inputs</Text>
        </View>
        <View style={styles.integrationsContainer}>
          <View style={styles.integrationCard}>
            <AntDesign name="github" size={24} color="#111827" style={styles.integrationIcon} />
            <View style={styles.integrationTextWrapper}>
              <Text style={styles.integrationName}>GitHub</Text>
              <Text style={styles.integrationStatus}>3 commits</Text>
            </View>
          </View>
          <View style={styles.integrationCard}>
            <MaterialCommunityIcons name="spotify" size={24} color="#1DB954" style={styles.integrationIcon} />
            <View style={styles.integrationTextWrapper}>
              <Text style={styles.integrationName}>Spotify</Text>
              <Text style={styles.integrationStatus}>Focus Playlist</Text>
            </View>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingHorizontal: 28,
    paddingTop: 20,
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 32,
  },
  dateText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#9CA3AF',
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  greetingText: {
    fontSize: 32,
    fontWeight: '900',
    color: '#111827',
    letterSpacing: -1,
  },
  profileAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111827',
  },
  directiveCard: {
    backgroundColor: '#FFF7F2',
    borderWidth: 1,
    borderColor: '#FED7AA',
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
  },
  directiveHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  directiveTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#F97316',
    marginLeft: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  directiveBody: {
    fontSize: 15,
    color: '#374151',
    lineHeight: 24,
    fontWeight: '500',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#F97316',
  },
  vitalsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  vitalBox: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 16,
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  vitalValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 4,
  },
  vitalLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6B7280',
  },
  tasksContainer: {
    marginBottom: 32,
    gap: 12,
  },
  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    padding: 16,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    marginRight: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#111827',
    borderColor: '#111827',
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  taskTitleCompleted: {
    fontSize: 15,
    fontWeight: '600',
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
    marginBottom: 4,
  },
  taskTime: {
    fontSize: 13,
    fontWeight: '500',
    color: '#6B7280',
  },
  stakeBoxActive: {
    backgroundColor: '#FEF2F2',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  stakeTextActive: {
    fontSize: 12,
    fontWeight: '800',
    color: '#DC2626',
  },
  stakeBoxCompleted: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  stakeTextCompleted: {
    fontSize: 12,
    fontWeight: '800',
    color: '#059669',
  },
  integrationsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  integrationCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    padding: 16,
  },
  integrationIcon: {
    marginRight: 10,
  },
  integrationTextWrapper: {
    flex: 1,
  },
  integrationName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 2,
  },
  integrationStatus: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
  },
});
