import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Animated, Alert, Image } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';

type AuthType = 'input' | 'oauth';

interface PlatformDef {
  placeholder: string;
  icon: any;
  lib?: any;
  isImage?: boolean;
  imageUri?: string;
  authType: AuthType;
}

const PLATFORMS: Record<string, PlatformDef> = {
  github: { placeholder: 'GitHub Username', icon: 'logo-github', lib: Ionicons, authType: 'input' },
  leetcode: { placeholder: 'LeetCode Username', icon: 'code-slash', lib: Ionicons, authType: 'input' },
  linkedin: { placeholder: 'LinkedIn URL', icon: 'logo-linkedin', lib: Ionicons, authType: 'input' },
  spotify: { placeholder: 'Spotify Profile URL', icon: 'spotify', lib: FontAwesome5, authType: 'input' },
  youtube: { placeholder: 'Connect YouTube', icon: 'youtube', lib: FontAwesome5, authType: 'oauth' },
  notion: { 
    placeholder: 'Notion Workspace ID', 
    icon: '', 
    isImage: true, 
    // Using highly reliable Icons8 CDN for the 3D colored Notion logo
    imageUri: 'https://img.icons8.com/fluency/512/notion.png', 
    authType: 'input' 
  },
};

export default function OnboardingScreen() {
  const insets = useSafeAreaInsets();
  const [activeInputs, setActiveInputs] = useState<string[]>(['github', 'leetcode', 'linkedin']);
  const [availablePlatforms, setAvailablePlatforms] = useState<string[]>(['spotify', 'youtube', 'notion']);
  const [isAdding, setIsAdding] = useState(false);
  
  const [platformData, setPlatformData] = useState<Record<string, { value: string, verified: boolean }>>({});

  const plusAnim = useRef(new Animated.Value(0)).current;

  const handleContinue = () => {
    router.replace('/(tabs)');
  };

  const handleAddPlatformToggle = () => {
    const toValue = isAdding ? 0 : 1;
    Animated.spring(plusAnim, {
      toValue,
      friction: 6,
      tension: 40,
      useNativeDriver: true
    }).start();
    setIsAdding(!isAdding);
  };

  const addPlatform = (platform: string) => {
    setActiveInputs([...activeInputs, platform]);
    setAvailablePlatforms(availablePlatforms.filter(p => p !== platform));
    handleAddPlatformToggle();
  };

  const handleTextChange = (key: string, text: string) => {
    setPlatformData(prev => ({
      ...prev,
      [key]: { value: text, verified: false }
    }));
  };

  const handleVerify = (key: string, isOauth: boolean = false) => {
    if (isOauth) {
      Alert.alert(
        "YouTube Login",
        "Simulating secure OAuth login...",
        [{ text: "Authorize", onPress: () => confirmVerification(key) }]
      );
    } else {
      confirmVerification(key);
    }
  };

  const confirmVerification = (key: string) => {
    setPlatformData(prev => ({
      ...prev,
      [key]: { ...prev[key], verified: true }
    }));
  };

  const maxTranslate = availablePlatforms.length * 46; 
  const translateX = plusAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, maxTranslate]
  });

  const rotation = plusAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '225deg']
  });

  const iconScale = plusAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.5, 0.8, 1]
  });

  return (
    <View style={styles.rootContainer}>
      <StatusBar style="dark" backgroundColor="#FFFFFF" />
      
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.keyboardView}>
          <KeyboardAvoidingView 
            style={styles.keyboardView} 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
              
              <View style={styles.headerSection}>
                <Text style={styles.title}>Sync Profiles</Text>
                <Text style={styles.subtitle}>
                  Link your digital footprint so the AI can understand the real you.
                </Text>
              </View>

              <View style={styles.inputsSection}>
                {activeInputs.map((platformKey) => {
                  const platform = PLATFORMS[platformKey];
                  const IconLib = platform.lib;
                  const data = platformData[platformKey] || { value: '', verified: false };
                  const hasValue = platform.authType === 'oauth' || data.value.length > 0;
                  const isVerified = data.verified;

                  if (platform.authType === 'oauth') {
                    return (
                      <TouchableOpacity 
                        key={platformKey} 
                        style={styles.oauthWrapper}
                        onPress={() => handleVerify(platformKey, true)}
                      >
                        {platform.isImage ? (
                          <Image source={{ uri: platform.imageUri }} style={{ width: 20, height: 20, resizeMode: 'contain', marginRight: 12, opacity: isVerified ? 1 : 0.5 }} />
                        ) : (
                          <IconLib name={platform.icon} size={20} color={isVerified ? "#10B981" : "#EF4444"} style={styles.inputIcon} />
                        )}
                        <Text style={[styles.oauthText, isVerified && styles.verifiedText]}>
                          {isVerified ? 'YouTube Connected' : platform.placeholder}
                        </Text>
                        {isVerified ? (
                          <Ionicons name="checkmark-circle" size={20} color="#10B981" />
                        ) : (
                          <View style={styles.unverifiedBadge}>
                            <Text style={styles.unverifiedText}>Login required</Text>
                          </View>
                        )}
                      </TouchableOpacity>
                    );
                  }

                  return (
                    <View key={platformKey} style={styles.inputWrapper}>
                      {platform.isImage ? (
                        <Image source={{ uri: platform.imageUri }} style={{ width: 20, height: 20, resizeMode: 'contain', marginRight: 12 }} />
                      ) : (
                        <IconLib name={platform.icon} size={20} color="#374151" style={styles.inputIcon} />
                      )}
                      <TextInput 
                        style={styles.input}
                        placeholder={platform.placeholder}
                        placeholderTextColor="#9CA3AF"
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={data.value}
                        onChangeText={(text) => handleTextChange(platformKey, text)}
                      />
                      {hasValue && !isVerified && (
                        <TouchableOpacity style={styles.verifyActionBadge} onPress={() => handleVerify(platformKey)}>
                          <Text style={styles.verifyActionText}>Verify</Text>
                        </TouchableOpacity>
                      )}
                      {isVerified && (
                        <Ionicons name="checkmark-circle" size={20} color="#10B981" />
                      )}
                    </View>
                  );
                })}
              </View>

              {availablePlatforms.length > 0 && (
                <View style={styles.addPlatformContainer}>
                  <View style={styles.revealedIconsRow}>
                    {availablePlatforms.map((platformKey) => {
                      const platform = PLATFORMS[platformKey];
                      const IconLib = platform.lib;
                      return (
                        <Animated.View 
                          key={platformKey} 
                          style={{ 
                            opacity: plusAnim, 
                            transform: [{ scale: iconScale }] 
                          }}
                        >
                          <TouchableOpacity 
                            style={styles.appIconButton} 
                            onPress={() => addPlatform(platformKey)}
                          >
                            {platform.isImage ? (
                              <Image source={{ uri: platform.imageUri }} style={{ width: 16, height: 16, resizeMode: 'contain' }} />
                            ) : (
                              <IconLib name={platform.icon} size={16} color="#111827" />
                            )}
                          </TouchableOpacity>
                        </Animated.View>
                      );
                    })}
                  </View>

                  <Animated.View style={[styles.plusButtonWrapper, { transform: [{ translateX }] }]}>
                    <TouchableOpacity style={styles.plusButton} onPress={handleAddPlatformToggle} activeOpacity={0.9}>
                      <Animated.View style={{ transform: [{ rotate: rotation }] }}>
                        <Ionicons name="add" size={24} color="#000000" />
                      </Animated.View>
                    </TouchableOpacity>
                  </Animated.View>
                </View>
              )}

            </ScrollView>

            <View style={styles.bottomSection}>
              <TouchableOpacity activeOpacity={0.8} onPress={handleContinue} style={styles.ctaShadow}>
                <View style={styles.primaryCta}>
                  <Text style={styles.primaryCtaText}>Verify & Continue</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.skipButton} onPress={handleContinue}>
                <Text style={styles.skipButtonText}>Do it later</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </SafeAreaView>

      {/* Forces the Android OS Navigation bar area to be stark black so white icons are clearly visible */}
      {insets.bottom > 0 && (
        <View style={{ height: insets.bottom, backgroundColor: '#000000' }} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Pure white for the main app content
  },
  scrollContent: {
    paddingHorizontal: 28,
    paddingTop: 60,
    paddingBottom: 20,
    flexGrow: 1,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#111827',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 20,
  },
  inputsSection: {
    gap: 12,
    marginBottom: 16,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#F3F4F6',
    backgroundColor: '#FAFAFA',
    borderRadius: 9999,
    paddingHorizontal: 20,
    height: 52,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#111827',
    fontWeight: '500',
    height: '100%',
  },
  
  /* Validation Badges */
  verifyActionBadge: {
    backgroundColor: '#FEF3C7', // Amber-100
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  verifyActionText: {
    color: '#D97706', // Amber-600
    fontSize: 11,
    fontWeight: '800',
  },
  unverifiedBadge: {
    backgroundColor: '#FEE2E2', // Red-100
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  unverifiedText: {
    color: '#DC2626', // Red-600
    fontSize: 11,
    fontWeight: '800',
  },

  /* OAuth Wrapper */
  oauthWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#F3F4F6',
    backgroundColor: '#FAFAFA',
    borderRadius: 9999,
    paddingHorizontal: 20,
    height: 52,
  },
  oauthText: {
    flex: 1,
    fontSize: 15,
    color: '#111827',
    fontWeight: '600',
  },
  verifiedText: {
    color: '#10B981', // Green
  },

  // Add Platform Section
  addPlatformContainer: {
    position: 'relative',
    height: 44,
    justifyContent: 'center',
    marginTop: 4,
  },
  revealedIconsRow: {
    position: 'absolute',
    left: 0,
    flexDirection: 'row',
    gap: 8,
    paddingLeft: 4,
  },
  appIconButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusButtonWrapper: {
    position: 'absolute',
    left: 0,
  },
  plusButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF', // White background
    borderWidth: 1,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },

  // Bottom Section
  bottomSection: {
    paddingHorizontal: 28,
    paddingBottom: Platform.OS === 'ios' ? 24 : 32, // Increased padding to move buttons up
    paddingTop: 32,
    backgroundColor: '#FFFFFF',
  },
  ctaShadow: {
    shadowColor: 'rgb(255, 92, 1)', 
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  primaryCta: {
    flexDirection: 'row',
    borderRadius: 9999,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: 'rgb(255, 92, 1)',
  },
  primaryCtaText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  skipButton: {
    alignItems: 'center',
    marginTop: 6,
    paddingVertical: 8,
  },
  skipButtonText: {
    color: '#9CA3AF',
    fontSize: 14,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});
