import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

interface ContinueButtonProps {
  onPress: () => void;
  disabled?: boolean;
  title?: string;
  style?: any;
}

export default function ContinueButton({
  onPress,
  disabled = false,
  title,
  style,
}: ContinueButtonProps) {
  const { t } = useTranslation();
  const buttonTitle = title || t('common.continue');

  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.disabledButton, style]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.buttonText}>{buttonTitle}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#4A90E2',
    paddingVertical: 16,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#333',
  },
  buttonText: {
    fontFamily: 'AnonymousPro-Regular',
    fontSize: 20,
    fontWeight: '400',
    lineHeight: 20,
    color: '#fff',
  },
});
