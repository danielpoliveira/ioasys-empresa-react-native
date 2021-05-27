import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../styles';

const SearchContainer = ({ search, setSearch }) => {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={20} color={theme.colors.primary} />
      <TextInput
        value={search}
        onChangeText={text => setSearch(text)}
        style={styles.textInput}
        placeholder="Buscar empresas"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#ccc',
    flexDirection: 'row',
    marginHorizontal: 10,
    paddingLeft: 10,
    borderRadius: 8,
    marginVertical: 10,
  },

  textInput: {
    marginLeft: 5, 
    fontSize: 16,
    paddingVertical: 10,
    flex:1,
  },
});

export default SearchContainer;