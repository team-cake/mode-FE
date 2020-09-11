import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

import LogInScreen from '../screens/LogInScreen'
import SignUpScreen from '../screens/SignUpScreen'
import HomeScreen from '../screens/HomeScreen'
import ProfileScreen from '../screens/ProfileScreen'
import DailyModeScreen from '../screens/DailyModeScreen'
import AppNav from './AppNav'

const Stack = createStackNavigator()

export default function AuthNav() {
	return (
		<Stack.Navigator
			initialRouteName='Login'
			screenOptions={{ headerShown: false }}
		>
			<Stack.Screen name='Login' component={LogInScreen} />
			<Stack.Screen name='SignUp' component={SignUpScreen} />
			<Stack.Screen name='Home' component={HomeScreen} />
			<Stack.Screen name='Profile' component={ProfileScreen} />
			<Stack.Screen name='DailyMode' component={DailyModeScreen} />
			<Stack.Screen name='AppNav' component={AppNav} />
		</Stack.Navigator>
	)
}
