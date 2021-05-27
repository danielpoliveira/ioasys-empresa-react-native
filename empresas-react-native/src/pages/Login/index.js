import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { TextInput } from 'react-native-paper';
import { theme } from '../../styles';
import api, { baseURL } from '../../services/api';
import { useAuth, useDropDown } from '../../contexts';


const Login = () => {
	const { login } = useAuth();
	const { ref } = useDropDown();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [hidePass, setHidePass] = useState(true);

	async function handleLogin() {
		if (!email || !password) {
			ref
				.current
				.alertWithType('error', "Erro!", 'email e/ou senha vazios!');

			return;
		}
		await api.post(`${baseURL}/api/v1/users/auth/sign_in`, {
			email,
			password,
		}).then(async res => {
			const { headers, data } = res;

			const saveObj = {
				['access-token']: headers['access-token'],
				client: headers.client,
				uid: headers.uid,
				user: data.investor
			}

			await login(saveObj);
		}).catch(err => {
			const msg =
				err.response &&
					err.response.data ?
					err.response.data
					:
					undefined;
			ref.current.alertWithType('error', "Erro!", msg.errors);
		});
	}

	return (
		<React.Fragment>
			<StatusBar style="light" />
				<View style={styles.container}>
					<View style={styles.loginLabelContainer}>
						<Text style={styles.loginLabel}>Login</Text>
					</View>
					<View style={styles.inputsContainer}>
						<TextInput
							value={email}
							onChangeText={text => setEmail(text)}
							theme={theme}
							label="Email"
							style={styles.textInput}
							mode="flat"
							left={
								<TextInput.Icon
									name="email-outline"
									color={isTextInputFocused => isTextInputFocused ? theme.colors.primary : theme.colors.placeholder}
								/>
							}
						/>

						<TextInput
							value={password}
							theme={theme}
							label="Senha"
							style={styles.textInput}
							mode="flat"
							onChangeText={text => setPassword(text)}
							secureTextEntry={hidePass}
							left={
								<TextInput.Icon name="lock-outline"
									color={isTextInputFocused => isTextInputFocused ? theme.colors.primary : theme.colors.placeholder}
								/>
							}

							right={
								<TextInput.Icon
									color={theme.colors.placeholder}
									name={hidePass ? "eye-outline" : "eye-off-outline"}
									onPress={() => setHidePass(value => !value)}
								/>
							}
						/>

						<TouchableOpacity style={styles.signInButton}
							onPress={handleLogin}
							android_ripple={{ color: 'gray', }}
						>
							<Text style={styles.signInButtonText}>Entrar</Text>
						</TouchableOpacity>
					</View>
				</View>
		</React.Fragment>

	);
}



const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: theme.colors.primary
	},

	loginLabelContainer: {
		marginTop: "20%",
		marginHorizontal: 24
	},

	loginLabel: {
		fontSize: 32,
		fontWeight: 'bold',
		color: theme.colors.surface
	},

	inputsContainer: {
		flex: 1,
		backgroundColor: '#fff',
		top: "25%",
		paddingTop: 20,
		borderTopLeftRadius: 56
	},

	textInput: {
		marginHorizontal: 20,
		marginBottom: 10,
		backgroundColor: 'transparent'
	},

	signInButton: {
		marginHorizontal: 20,
		backgroundColor: 'red',
		padding: 15,
		borderRadius: 25,
		backgroundColor: theme.colors.primary,
		marginTop: 16,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},

	signInButtonText: {
		textAlign: 'center',
		color: '#fff',
		fontSize: 18,
		marginRight: 5
	},

});

export default Login;