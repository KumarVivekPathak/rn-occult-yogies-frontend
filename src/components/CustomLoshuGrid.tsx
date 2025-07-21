import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface LoshuGridProps {
  data: string[][];
  label: string;
}

const LoshuGrid: React.FC<LoshuGridProps> = ({ data, label }) => {
  const renderCell = (cellData: string, rowIndex: number, colIndex: number) => (
    <View key={`${rowIndex}-${colIndex}`} style={[styles.cell, !cellData && styles.emptyCell]}>
      <Text style={cellData ? styles.numberText : styles.emptyText}>
        {cellData}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{label}</Text>
      <View style={styles.gridContainer}>
        {data.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((cell, colIndex) => renderCell(cell, rowIndex, colIndex))}
          </View>
        ))}
      </View>
    </View>
  );
};

const CELL_SIZE = 80;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 16,
    color: '#34495e',
    textAlign: 'center',
  },
  gridContainer: {
    borderWidth: 2,
    borderColor: '#2980b9',
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#ecf0f1',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    borderWidth: 1,
    borderColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#dff6ff', 
  },
  emptyCell: {
    backgroundColor: '#f5f5f5', 
  },
  numberText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2c3e50',
  },
  emptyText: {
    fontSize: 18,
    color: '#bdc3c7',
  },
});

export default LoshuGrid;
