import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { createAccount, loginUser, getAllUsers } from '../utils/accountUtils';
import DataExtractionPanel from './DataExtraction';

export default function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  
  const handleLogin = async () => {
    setErrorMessage('');
    setSuccessMessage('');
    
    if (!username.trim() || !password.trim()) {
      setErrorMessage('Please enter both username and password');
      return;
    }
    
    const user = await loginUser(username, password);
    if (user) {
      setSuccessMessage('Login successful!');
      setTimeout(() => onLogin(), 500);
    } else {
      // Check if user exists to give specific error message
      const { getUserByUsername } = require('../utils/accountUtils');
      const existingUser = await getUserByUsername(username);
      
      if (!existingUser) {
        setErrorMessage('This username does not exist. Please sign up first.');
      } else {
        setErrorMessage('Incorrect password. Please try again.');
      }
    }
  };

  const handleCreateAccount = async () => {
    setErrorMessage('');
    setSuccessMessage('');
    
    if (!username.trim() || !password.trim()) {
      setErrorMessage('Please enter both username and password');
      return;
    }

    if (password.length < 4) {
      setErrorMessage('Password must be at least 4 characters');
      return;
    }
    
    const account = await createAccount(username, password);
    if (account) {
      setSuccessMessage('Account created successfully!');
      setTimeout(() => onLogin(), 800);
    } else {
      setErrorMessage(`Username "${username}" already exists. Please choose a different one.`);
    }
  };

  return (
    <View style={styles.container}>
      {showAdminPanel ? (
        <DataExtractionPanel onClose={() => setShowAdminPanel(false)} />
      ) : (
        <>
          <TouchableOpacity 
            style={styles.adminButton}
            onPress={() => setShowAdminPanel(true)}
          >
            <Text style={styles.adminIcon}>Admin</Text>
          </TouchableOpacity>
            
          <Text style={styles.title}>Evaluator Audio App</Text>
        
          <Text style={styles.subtitle}>
            {isCreatingAccount ? 'Create New Account' : 'Login'}
          </Text>
        
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            autoCorrect={false}
          />
        
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
          />

          {errorMessage ? (
            <Text style={styles.errorText}>{errorMessage}</Text>
          ) : null}

          {successMessage ? (
            <Text style={styles.successText}>{successMessage}</Text>
          ) : null}
      
          <TouchableOpacity 
            style={styles.button} 
            onPress={isCreatingAccount ? handleCreateAccount : handleLogin}
          >
            <Text style={styles.buttonText}>
              {isCreatingAccount ? 'Create Account' : 'Login'}
            </Text>
          </TouchableOpacity>

          <View style={styles.toggleContainer}>
            <Text style={styles.toggleText}>
              {isCreatingAccount ? 'Already have an account? ' : "Don't have an account? "}
            </Text>
            <TouchableOpacity onPress={() => {
              setIsCreatingAccount(!isCreatingAccount);
              setErrorMessage('');
              setSuccessMessage('');
            }}>
              <Text style={styles.toggleLink}>
                {isCreatingAccount ? 'Login' : 'Sign up'}
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#2C3E50', // Dark blue-gray color
  },
  subtitle: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 30,
    color: '#2C3E50',
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 14,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: 'white',
  },
  errorText: {
    color: '#e74c3c',
    fontSize: 14,
    marginBottom: 12,
    textAlign: 'center',
    backgroundColor: '#fadbd8',
    padding: 10,
    borderRadius: 6,
  },
  successText: {
    color: '#27ae60',
    fontSize: 14,
    marginBottom: 12,
    textAlign: 'center',
    backgroundColor: '#d5f4e6',
    padding: 10,
    borderRadius: 6,
  },
  button: {
    backgroundColor: '#2C3E50',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  toggleText: {
    fontSize: 14,
    color: '#666',
  },
  toggleLink: {
    fontSize: 14,
    color: '#2C3E50', 
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  adminButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 10,
    zIndex: 10,
  },
  adminIcon: {
    fontSize: 24,
    opacity: 0.3,
  },
  usersContainer: {
    marginTop: 30,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  usersTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#2C3E50',
  },
  userText: {
    fontSize: 14,
    marginVertical: 4,
    color: '#555',
  },
});
