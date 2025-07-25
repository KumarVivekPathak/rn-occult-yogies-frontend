import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

interface GenderOption {
  label: string;
  value: string;
}

interface GenderPickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: GenderOption[];
  required?: boolean;
  error?: string;
  disabled?: boolean;
  containerStyle?: any;
  labelStyle?: any;
}

const GenderPicker: React.FC<GenderPickerProps> = ({
  label,
  value,
  onChange,
  options,
  required = false,
  error,
  disabled = false,
  containerStyle,
  labelStyle,
}) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(options);
  const [internalValue, setInternalValue] = useState(value);

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={{ flexDirection: 'row' }}>
        <Text style={[styles.label, labelStyle]}>{label}</Text>
        {required && <Text style={{ color: '#ff4444', marginLeft: 3 }}>*</Text>}
      </View>
      <DropDownPicker
        open={open}
        setOpen={setOpen}
        value={value}
        setValue={(callback) => {
          if (typeof callback === 'function') {
            const newValue = callback(internalValue);
            setInternalValue(newValue);
            onChange(newValue);
          } else {
            setInternalValue(callback);
            onChange(callback);
          }
        }}
        items={items}
        setItems={setItems}
        placeholder="Select Gender"
        disabled={disabled}
        style={[
          styles.dropdown,
          error ? styles.errorBorder : {},
          disabled ? styles.disabledDropdown : {},
        ]}
        dropDownContainerStyle={styles.dropdownContainer}
        textStyle={styles.input}
        listItemLabelStyle={styles.input}
        zIndex={1000}
      />
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
  dropdown: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
    minHeight: 48,
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
    zIndex: 1000,
  },
  input: {
    fontSize: 16,
    color: '#333',
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
  disabledDropdown: {
    backgroundColor: '#f5f5f5',
    borderColor: '#eee',
  },
});

export default GenderPicker;