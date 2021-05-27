import React, { useEffect, useLayoutEffect, useState, useRef } from 'react';
import { View, Text, Image, Animated, StyleSheet, } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import api, { baseURL } from '../../services/api';
import { useDropDown } from '../../contexts';
import { theme } from '../../styles'

const Enterprise = ({ navigation, route }) => {
  const { id, title } = route.params;
  const { ref } = useDropDown();

  const [enterpriseData, setEnterpriseData] = useState({});
  const [headerTitle, setHeaderTitle] = useState(title);

  const yOffset = useRef(new Animated.Value(0)).current;
  const headerOpacity = yOffset.interpolate({
    inputRange: [0, 200],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackground: () => (
        <Animated.View
          style={{
            backgroundColor: theme.colors.primary,
            ...StyleSheet.absoluteFillObject,
            opacity: headerOpacity,
          }}
        />
      ),

      title: headerTitle === '' ? 'Empresa' : headerTitle,
    });
  }, [navigation, headerTitle]);

  useEffect(() => {
    async function loadEmpresa() {
      await api.get(`/api/v1/enterprises/${id}`)
        .then(res => {
          const { enterprise } = res.data;

          setEnterpriseData(enterprise);
          setHeaderTitle(enterprise.enterprise_name);
        })
        .catch(err => {
          console.log(err.request)
          const msg =
            err.response &&
              err.response.data ?
              err.response.data
              :
              undefined;

          ref.current.alertWithType('error', "Erro!", msg.error);
        })
    }

    loadEmpresa();
  }, [])


  function currencyFormat(value) {
    return 'R$ ' + value
      .toFixed(2)
      .replace('.', ',')
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
  }

  return (
    <React.Fragment>
      <StatusBar style="light" />

      <Animated.ScrollView
        onScroll={Animated.event(
          [{
            nativeEvent: {
              contentOffset: {
                y: yOffset,
              },
            }
          }], { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        <Image
          style={styles.image}
          source={{ uri: baseURL + enterpriseData.photo }}
        />

        <View style={{ /*backgroundColor: 'gray'*/ }}>
          <View>
            <Text style={styles.sectionTitle}>Preço da ação </Text>
            {enterpriseData.share_price && (
              <Text style={{
                alignSelf: 'flex-start',
                fontSize: 18,
                fontWeight: 'bold',
                color: theme.colors.primary,
                marginHorizontal: 8,
              }}
              >{currencyFormat(enterpriseData.share_price)}</Text>
            )

            }
          </View>

          <Text style={styles.sectionTitle}>Descrição</Text>

          <View style={styles.descriptionContainer}>
            <Text style={{ fontSize: 17, lineHeight: 24 }}>{enterpriseData.description}</Text>
          </View>

          <Text style={styles.sectionTitle}>Detalhes</Text>


          <View style={styles.detailsContainer}>

            <Text style={{ fontSize: 18, marginBottom: 4 }}>
              <Text style={{ fontWeight: 'bold' }}>Localização: </Text>{enterpriseData.city} - {enterpriseData.country}
            </Text>

            {enterpriseData.enterprise_type && (
              <Text style={{ fontSize: 18, }}>
                <Text style={{ fontWeight: 'bold' }}>Tipo: </Text>{enterpriseData.enterprise_type.enterprise_type_name}
              </Text>
            )}
          </View>

        </View>

      </Animated.ScrollView>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300,
  },

  sectionTitle: {
    fontSize: 20,
    marginTop: 16,
    marginLeft: 8,
    marginBottom: 8,
    fontWeight: 'bold'
  },

  descriptionContainer: {
    marginHorizontal: 8,
    backgroundColor: '#BCC1E4',
    padding: 16,
  },

  detailsContainer: {
    flexDirection: 'column',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    marginHorizontal: 8,
    marginBottom: 8,
  },
});

export default Enterprise;