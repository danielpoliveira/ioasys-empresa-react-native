import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = '@app:token';
const CLIENT_KEY = '@app:client';
const UID_KEY = '@app:uid';
const USER_KEY = '@app:user';

export async function onSignIn(res) {
  await AsyncStorage.multiSet([
    [TOKEN_KEY, res['access-token']],
    [CLIENT_KEY, res.client],
    [UID_KEY, res.uid],
    [USER_KEY, JSON.stringify(res.user)],
  ]);
}

export async function onSignOut() {
  const response = await AsyncStorage.multiRemove([TOKEN_KEY, CLIENT_KEY, UID_KEY, USER_KEY])

  return response;
}

export async function isLogged() {
  const response = await AsyncStorage.multiGet([TOKEN_KEY, CLIENT_KEY, UID_KEY, USER_KEY]);

  return response;
}