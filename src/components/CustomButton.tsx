import React from 'react';
import { 
  TouchableOpacity, 
  View, 
  Text, 
  StyleSheet, 
  StyleProp, 
  ViewStyle, 
  TextStyle, 
  ActivityIndicator,
  TouchableOpacityProps
} from 'react-native';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text' | 'danger';

export interface CustomButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: ButtonVariant;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  fullWidth?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  leftIcon,
  rightIcon,
  containerStyle,
  textStyle,
  disabled = false,
  fullWidth = false,
  style,
  ...props
}) => {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      style={[
        styles.container,
        styles[`${variant}Container`],
        isDisabled && styles.disabled,
        fullWidth && styles.fullWidth,
        containerStyle,
        style,
      ]}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.8}
      {...props}
    >
      {loading ? (
        <ActivityIndicator 
          color={variant === 'primary' ? '#fff' : '#007AFF'} 
          size="small"
        />
      ) : (
        <View style={styles.content}>

          <Text 
            style={[
              styles.text,
              styles[`${variant}Text`],
              isDisabled && styles.disabledText,
              textStyle,
            ]}
            numberOfLines={1}
          >
            {title}
          </Text>
         
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    minWidth: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.6,
  },
  disabledText: {
    opacity: 0.7,
  },
  // Variant Styles
  primaryContainer: {
    backgroundColor: 'magenta',
  },
  primaryText: {
    color: '#FFFFFF',
  },
  secondaryContainer: {
    backgroundColor: '#E3F2FD',
  },
  secondaryText: {
    color: '#1976D2',
  },
  outlineContainer: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  outlineText: {
    color: '#007AFF',
  },
  textContainer: {
    backgroundColor: 'transparent',
    elevation: 0,
    shadowOpacity: 0,
  },
  textText: {
    color: '#007AFF',
    fontWeight: 'normal',
  },
  dangerContainer: {
    backgroundColor: '#FFEBEE',
  },
  dangerText: {
    color: '#D32F2F',
  },
});

export default CustomButton;
    