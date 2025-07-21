import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface LoshuGridProps {
  data: string[][];
  label: string;
}

const LoshuGrid: React.FC<LoshuGridProps> = ({ data, label }) => {
  const renderCell = (cellData: string, rowIndex: number, colIndex: number) => {
    if (!cellData || cellData === "") {
      return (
        <View key={`${rowIndex}-${colIndex}`} style={styles.cell}>
          <Text style={styles.emptyText}></Text>
        </View>
      );
    }

    return (
      <View key={`${rowIndex}-${colIndex}`} style={styles.cell}>
        <Text style={styles.numberText}>{cellData}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{label}</Text>
      <View style={styles.grid}>
        {data.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((cell, colIndex) => 
              renderCell(cell, rowIndex, colIndex)
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 10,
    marginBottom: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  grid: {
    borderWidth: 2,
    borderColor: '#333',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 80,
    height: 80,
    borderWidth: 1,
    borderColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  numberText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#ccc',
  },
});

export default LoshuGrid;