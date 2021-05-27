import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '../styles';
import { AntDesign } from '@expo/vector-icons';

const ProfileButton = ({ navigation }) => {

  function handleProfile() { navigation.navigate('Profile'); }

  return (
    <TouchableOpacity
      style={styles.profileButton}
      onPress={handleProfile}
    >
      <AntDesign name="user" size={24} color={theme.colors.surface} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  profileButton: {
    backgroundColor: '#777', marginRight: 12,
    padding: 8,
    borderRadius: 20,
  },
});

export default ProfileButton;