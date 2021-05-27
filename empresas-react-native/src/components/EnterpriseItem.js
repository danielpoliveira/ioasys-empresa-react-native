import React from 'react';
import { TouchableOpacity, View, StyleSheet, Image, Text, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../styles';
import { baseURL } from '../services/api';

const { width } = Dimensions.get('window');

const EnterpriseItem = ({ item, navigation }) => {

  function handleNavigate() {
    navigation.navigate('Enterprise', {
      id: item.id,
      title: item.enterprise_name,
    });
  }

  return (
    <TouchableOpacity style={styles.container} onPress={handleNavigate}>
      <Image style={styles.image} source={{ uri: baseURL + item.photo }} />
      <View style={{ marginLeft: 10, flex: 1, }}>
        <Text style={styles.name}>{item.enterprise_name}</Text>
        <Text style={styles.price}>R$ {item.share_price}</Text>
        <View style={styles.footer}>
          <Text style={{ fontSize: 16, }}>{item.enterprise_type.enterprise_type_name}</Text>
          <View style={{ flexDirection: 'row', }}>
            <Ionicons name="location-outline" size={18} />
            <Text style={{ marginLeft: 1.5 }}>{item.city} - {item.country}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginBottom: 10,
    marginHorizontal: 10,
    borderRadius: 12
  },

  image: {
    height: '100%',
    width: width * 0.35,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },

  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
  },

  price: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 15,
    color: theme.colors.primary, fontWeight: 'bold'
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    marginBottom: 8,
    flexWrap: 'wrap',
    paddingRight: 10,
    alignItems: 'center'
  },

});

export default EnterpriseItem;