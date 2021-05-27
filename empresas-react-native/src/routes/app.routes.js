import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { theme } from '../styles';
import { Home, Profile, Enterprise } from '../pages';
import { ProfileButton, LogoutButton } from '../components';

const AppStack = createStackNavigator();

const defaultScreenOptions = {
  headerStyle: {
    backgroundColor: theme.colors.primary,

  },
  headerTitleStyle: {
    color: theme.colors.surface
  },
  headerTintColor: theme.colors.surface
}

const AppRoutes = () => {
  return (
    <AppStack.Navigator
      screenOptions={defaultScreenOptions}
    >
      <AppStack.Screen name="Home" component={Home} options={({ navigation }) => ({
        title: 'Empresas ',
        headerTitleAlign: 'center',
        headerRight: () => <ProfileButton navigation={navigation} />
      })}
      />

      <AppStack.Screen name="Profile" component={Profile}
        options={({ navigation }) => ({
          headerTitleAlign: 'center',
          headerRight: () => <LogoutButton />
        })}
      />

      <AppStack.Screen name="Enterprise" component={Enterprise}
        options={{
          headerTransparent: true,
          headerTitleAlign: 'center'
        }}
      />

    </AppStack.Navigator>
  );
}

export default AppRoutes;