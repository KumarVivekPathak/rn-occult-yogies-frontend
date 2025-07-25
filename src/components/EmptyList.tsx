import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface EmptyListProps {
  title?: string;
  message?: string;
  iconName?: keyof typeof MaterialIcons.glyphMap;
  showImage?: boolean;
}

const EmptyList: React.FC<EmptyListProps> = ({
  title = 'No items found',
  message = 'There are no items to display at the moment.',
  iconName = 'search-off',
  showImage = false,
}) => {
  return (
    <View style={styles.container}>
      {showImage ? (
        <Image
          source={require('../assets/empty-list.png')}
          style={styles.image}
          resizeMode="contain"
        />
      ) : (
        <MaterialIcons name={iconName} size={64} color="#9ca3af" style={styles.icon} />
      )}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    marginVertical: 24,
  },
  icon: {
    marginBottom: 16,
    opacity: 0.7,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default EmptyList;
