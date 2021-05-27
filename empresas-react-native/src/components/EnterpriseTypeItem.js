import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { theme } from '../styles';

const EnterpriseTypeItem = ({ item, type, setType }) => {
  const { id, enterprise_type_name } = item;

  function handlePress() { setType(text => text === id ? undefined : id) }

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[styles.containerDefault, id === type ? styles.containerSelected : styles.container]}
    >
      <Text style={[styles.textDefault, id === type ? styles.textSelected : styles.text]}>{enterprise_type_name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  containerDefault: {
    padding: 10,
    marginRight: 10,
    borderRadius: 12,
    marginBottom: 8,
    borderColor: theme.colors.primary,
    justifyContent: 'center'
  },

  container: {
    borderWidth: 1,
    backgroundColor: theme.colors.surface,
  },

  containerSelected: {
    borderWidth: 1,
    backgroundColor: theme.colors.primary,
  },

  textDefault: {
    fontSize: 14,
    textAlign: 'center',
  },

  text: {
    color: theme.colors.primary
  },

  textSelected: {
    color: theme.colors.surface
  },
});

export default EnterpriseTypeItem;