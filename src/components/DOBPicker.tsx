import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Platform } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';

interface DOBPickerProps {
  label: string;
  value: string; // ISO date string
  onChange: (date: string) => void;
  required?: boolean;
  error?: string;
  disabled?: boolean;
  containerStyle?: any;
  labelStyle?: any;
}

const DOBPicker: React.FC<DOBPickerProps> = ({
  label,
  value,
  onChange,
  required = false,
  error,
  disabled = false,
  containerStyle,
  labelStyle,
}) => {
  const [showPicker, setShowPicker] = useState(false);

  const displayDate = value ? new Date(value).toLocaleDateString() : '';

  const handleChange = (_event: any, selectedDate?: Date) => {
    setShowPicker(false);
    if (selectedDate) {
      onChange(selectedDate.toISOString());
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={{ flexDirection: 'row' }}>
        <Text style={[styles.label, labelStyle]}>{label}</Text>
        {required && <Text style={{ color: '#ff4444', marginLeft: 3 }}>*</Text>}
      </View>
      <TouchableOpacity
        style={[
          styles.inputContainer,
          disabled && styles.disabledInputContainer,
          error ? styles.errorBorder : {},
        ]}
        onPress={() => !disabled && setShowPicker(true)}
        activeOpacity={0.7}
        disabled={disabled}
      >
        <Text style={[styles.input, disabled && styles.disabledInput]}>
          {displayDate || 'Select Date'}
        </Text>
        <Ionicons name="calendar-outline" size={22} color="#888" style={{ marginLeft: 8 }} />
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker
          value={value ? new Date(value) : new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleChange}
          maximumDate={new Date()}
        />
      )}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: '100%',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 6,
    color: '#333',
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    minHeight: 48,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  disabledInputContainer: {
    backgroundColor: '#f5f5f5',
    borderColor: '#eee',
  },
  disabledInput: {
    color: '#888',
  },
  errorBorder: {
    borderColor: '#ff4444',
  },
  errorText: {
    color: '#ff4444',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
});

export default DOBPicker;