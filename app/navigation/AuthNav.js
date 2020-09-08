import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import LogInScreen from '../screens/LogInScreen'
import SignUpScreen from '../screens/SignUpScreen'
import HomeScreen from '../screens/HomeScreen'
import ProfileScreen from '../screens/ProfileScreen'
import DailyModeScreen from '../screens/DailyModeScreen'

const Stack = createStackNavigator()

const AuthNav = () => (
	<Stack.Navigator screenOptions={{ headerShown: false }}>
		<Stack.Screen name='Login' component={LogInScreen} />
		<Stack.Screen name='SignUp' component={SignUpScreen} />
		<Stack.Screen name='Home' component={HomeScreen} />
		<Stack.Screen name='Profile' component={ProfileScreen} />
		<Stack.Screen name='DailyMode' component={DailyModeScreen} />
	</Stack.Navigator>
)

export default AuthNav
