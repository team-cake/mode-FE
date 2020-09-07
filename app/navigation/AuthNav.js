import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import LogInScreen from '../screens/LogInScreen'
import SignUpScreen from '../screens/SignUpScreen'

const Stack = createStackNavigator()

const AuthNavigator = () => (
	<Stack.Navigator>
		<Stack.Screen name='Login' component={LogInScreen} />
		<Stack.Screen name='Signup' component={SignUpScreen} />
	</Stack.Navigator>
)

export default AuthNavigator
