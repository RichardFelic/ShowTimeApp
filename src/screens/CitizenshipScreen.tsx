import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Alert, StyleSheet } from 'react-native';
import { ChevronDown } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useRegistration } from '../context/RegistrationContext';
import ScreenLayout from '../components/common/ScreenLayout';
import ContentContainer from '../components/common/ContentContainer';
import ScreenTitle from '../components/common/ScreenTitle';
import BottomSection from '../components/common/BottomSection';
import ContinueButton from '../components/common/ContinueButton';
import HelperText from '../components/common/HelperText';
import CountryModal from '../components/modals/CountryModal';

export default function CitizenshipScreen() {
  const { t } = useTranslation();
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [showCountryModal, setShowCountryModal] = useState(false);
  const { updateData } = useRegistration();
  const navigation = useNavigation();

  const countries = [
    'Afghanistan', 'Albania', 'Algeria', 'Argentina', 'Armenia', 'Australia',
    'Austria', 'Azerbaijan', 'Bahrain', 'Bangladesh', 'Belarus', 'Belgium',
    'Bolivia', 'Bosnia and Herzegovina', 'Brazil', 'Bulgaria', 'Cambodia',
    'Canada', 'Chile', 'China', 'Colombia', 'Costa Rica', 'Croatia',
    'Czech Republic', 'Denmark', 'Dominican Republic', 'Ecuador', 'Egypt',
    'El Salvador', 'Estonia', 'Finland', 'France', 'Georgia', 'Germany',
    'Ghana', 'Greece', 'Guatemala', 'Honduras', 'Hungary', 'Iceland',
    'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy',
    'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kuwait', 'Latvia',
    'Lebanon', 'Lithuania', 'Luxembourg', 'Malaysia', 'Mexico', 'Morocco',
    'Netherlands', 'New Zealand', 'Nicaragua', 'Norway', 'Pakistan',
    'Panama', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal',
    'Qatar', 'Romania', 'Russia', 'Saudi Arabia', 'Serbia', 'Singapore',
    'Slovakia', 'Slovenia', 'South Africa', 'South Korea', 'Spain',
    'Sri Lanka', 'Sweden', 'Switzerland', 'Thailand', 'Turkey',
    'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States',
    'Uruguay', 'Venezuela', 'Vietnam', 'Other',
  ];

  const handleContinue = () => {
    if (!selectedCountry) {
      Alert.alert(t('errors.selectCitizenship'));
      return;
    }

    updateData({ citizenship: selectedCountry });
    (navigation as any).navigate('PhysicalData');
  };

  const handleCountrySelect = (country: string) => {
    setSelectedCountry(country);
    setShowCountryModal(false);
  };

  return (
    <ScreenLayout currentStep={4} totalSteps={6}>
      <ContentContainer>
        <ScreenTitle title={t('registration.citizenship')} />

        <View style={styles.selectorContainer}>
          <TouchableOpacity
            style={[
              styles.countrySelector,
              selectedCountry && styles.selectedCountrySelector,
            ]}
            onPress={() => setShowCountryModal(true)}
          >
            <Text style={[
              styles.countrySelectorText,
              selectedCountry && styles.selectedCountrySelectorText,
            ]}>
              {selectedCountry || t('placeholders.selectCitizenshipPlaceholder')}
            </Text>
            <ChevronDown color={selectedCountry ? '#4A90E2' : '#666'} size={20} />
          </TouchableOpacity>
        </View>
      </ContentContainer>

      <BottomSection>
        <ContinueButton
          onPress={handleContinue}
          disabled={!selectedCountry}
        />
        <HelperText text={t('helperTexts.helperText')} />
      </BottomSection>

      <CountryModal
        visible={showCountryModal}
        onClose={() => setShowCountryModal(false)}
        countries={countries}
        selectedCountry={selectedCountry}
        onSelect={handleCountrySelect}
      />
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  selectorContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  countrySelector: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#333',
    borderRadius: 25,
    paddingVertical: 16,
    paddingHorizontal: 20,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectedCountrySelector: {
    borderColor: '#4A90E2',
    backgroundColor: 'rgba(74, 144, 226, 0.1)',
  },
  countrySelectorText: {
    fontFamily: 'AnonymousPro-Regular',
    fontWeight: '400',
    lineHeight: 20,
    color: '#666',
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
  },
  selectedCountrySelectorText: {
    color: '#fff',
  },
});

