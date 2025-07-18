import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps, StyleProp, ViewStyle, TextStyle } from 'react-native';

interface CustomInputProps extends TextInputProps {
  label: string;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  inputStyle?: StyleProp<TextStyle>;
  error?: string;
  disabled?: boolean;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  style,
  containerStyle,
  labelStyle,
  inputStyle,
  error,
  disabled = false,
  ...props
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
      <View style={[
        styles.inputContainer,
        disabled && styles.disabledInputContainer,
        error ? styles.errorBorder : {},
      ]}>
        <TextInput
          style={[
            styles.input,
            inputStyle,
            disabled && styles.disabledInput,
          ]}
          placeholderTextColor="#999"
          editable={!disabled}
          selectTextOnFocus={!disabled}
          {...props}
        />
      </View>
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

export default CustomInput;