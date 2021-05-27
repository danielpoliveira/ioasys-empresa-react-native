import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useAuth } from '../contexts';
import { theme } from '../styles';

const LogoutButton = () => {
  const { logout } = useAuth();

  async function handleLogout() { await logout(); }

  return (
    <TouchableOpacity
      style={styles.logoutButton}
      onPress={handleLogout}
    >
      <AntDesign name="logout" size={24} color={theme.colors.surface} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  logoutButton: {
    padding: 8,
    marginRight: 4,
  },
  
});

export default LogoutButton;