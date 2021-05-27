import React, { useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../contexts';

const Profile = () => {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <Image style={styles.profileImage} />
      <Text style={styles.profileName}>{user.investor_name}</Text>
      <Text style={styles.profileEmail}>{user.email}</Text>
      <View style={styles.locationContainer}>
        <Ionicons name="location-outline" size={20} />
        <Text style={styles.locationName}>{user.city} - {user.country}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },

  profileImage: {
    marginVertical: 24,
    backgroundColor: 'gray',
    width: 128,
    height: 128,
    borderRadius: 75,
  },

  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  profileEmail: {
    fontSize: 18,
  },

  locationContainer: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },

  locationName: {
    fontSize: 16,
  },

});

export default Profile;