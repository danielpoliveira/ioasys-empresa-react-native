import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SearchContainer, EnterpriseItem, EnterpriseTypeItem } from '../../components';
import { useDropDown } from '../../contexts';
import api from '../../services/api'

const Home = ({ navigation }) => {
  const { ref } = useDropDown();

  const [enterpriseTypes, setEnterpriseTypes] = useState([]);
  const [enterprises, setEnterprises] = useState([]);
  const [type, setType] = useState(undefined);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function loadEnterpriseTypes() {
      await api.get('/api/v1/enterprise_types')
        .then(res => {
          setEnterpriseTypes(res.data.enterprise_types);
        })
        .catch(err => console.log(err.request))
    }

    loadEnterpriseTypes();
  }, []);

  useEffect(() => {
    async function loadEnterprises() {
      await api.get('/api/v1/enterprises/', {
        params: {
          name: search,
          enterprise_types: type
        }
      })
        .then(res => setEnterprises(res.data.enterprises))
        .catch(err => {
          const msg =
            err.response &&
              err.response.data ?
              err.response.data
              :
              undefined;
          ref.current.alertWithType('error', "Erro!", msg.errors);
        });
    }

    loadEnterprises();
  }, [search, type]);


  return (
    <React.Fragment>
      <StatusBar style="light" />
      <SearchContainer search={search} setSearch={setSearch} />

      <View>
        <FlatList
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          style={{ paddingHorizontal: 10, }}
          data={enterpriseTypes}
          horizontal={true}
          renderItem={item => <EnterpriseTypeItem {...item} setType={setType} type={type} />}
        />
      </View>

      <View style={styles.enterprisesContent}>
        <FlatList
          keyExtractor={(item) => item.id.toString()}
          data={enterprises}

          renderItem={(item) => <EnterpriseItem {...item} navigation={navigation} />}
        />
      </View>

    </React.Fragment>
  );

}

const styles = StyleSheet.create({
  enterprisesContent: {
    flex: 1
  },

})

export default Home;