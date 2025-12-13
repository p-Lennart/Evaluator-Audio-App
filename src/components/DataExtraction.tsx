import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, TextInput, Alert, Platform } from 'react-native';
import * as FileSystem from 'expo-file-system/legacy';
import * as Sharing from 'expo-sharing';
import { getAllUsers } from '../utils/accountUtils';

export default function DataExtractor({ onClose }: { onClose: () => void }) {
  const [password, setPassword] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  
  const ADMIN_PASSWORD = 'admin_123'; 

  const handleUnlock = () => {
    if (password === ADMIN_PASSWORD) {
      setIsUnlocked(true);
      Alert.alert('Success', 'Unlocked');
    } else {
      Alert.alert('Error', 'Wrong password');
    }
  };

  const exportAllData = async () => {
    try {
      const users = await getAllUsers();
      const data = JSON.stringify(users, null, 2);
      console.log('EXPORTED DATA:', data);

      // Web platform - use blob download 
      if (typeof window !== 'undefined' && window.document && Platform.OS === 'web') {
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `data_${Date.now()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        Alert.alert('Success', 'Data exported - check downloads');
      }
      // Mobile platforms - use Expo Sharing
      else {
        // Check if sharing is available on this device
        const isAvailable = await Sharing.isAvailableAsync();
        if (!isAvailable) {
          Alert.alert('Error', 'Sharing is not available on this device');
          return;
        }

        // Create temporary file in document directory
        const fileName = `data_${Date.now()}.json`;
        const fileUri = FileSystem.documentDirectory + fileName;

        // Write JSON data to file 
        await FileSystem.writeAsStringAsync(fileUri, data, {
          encoding: 'utf8'
        });

        // Present native share sheet
        await Sharing.shareAsync(fileUri, {
          mimeType: 'application/json',
          dialogTitle: 'Export User Data',
          UTI: 'public.json', // iOS Uniform Type Identifier
        });

        Alert.alert('Success', 'Data shared successfully');
      }
    } catch (error) {
      console.error('Export error:', error);
      Alert.alert('Error', `Failed to export: ${String(error)}`);
    }
  };

  if (!isUnlocked) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Admin Panel</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleUnlock}>
          <Text style={styles.buttonText}>Unlock</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text>Close</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>✓ Admin Panel</Text>
      <TouchableOpacity style={styles.button} onPress={exportAllData}>
        <Text style={styles.buttonText}>Export All Data</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text>Close</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F5F5F5', justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 14, borderRadius: 8, marginBottom: 16, backgroundColor: 'white' },
  button: { backgroundColor: '#2C3E50', padding: 16, borderRadius: 8, alignItems: 'center', marginBottom: 12 },
  buttonText: { color: 'white', fontSize: 16, fontWeight: '600' },
  closeButton: { padding: 16, alignItems: 'center', marginTop: 20 },
});