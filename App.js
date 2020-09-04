import React, { Component } from 'react'
import { StatusBar } from 'expo-status-bar'

import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createStackNavigator } from '@react-navigation/stack'
// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'

import HomeScreen from './app/screens/HomeScreen'
import ProfileScreen from './app/screens/ProfileScreen'
import LogInScreen from './app/screens/LogInScreen'
import DailyModeScreen from './app/screens/DailyModeScreen'

import Screen1 from './app/screens/Screen1'
import Screen2 from './app/screens/Screen2'
import Screen3 from './app/screens/Screen3'
import { render } from 'react-dom'
import SignUpScreen from './app/screens/SignUpScreen'

const Drawer = createDrawerNavigator()
const Stack = createStackNavigator()
// const MaterialBottomTabs = createMaterialBottomTabNavigator()

export default class App extends Component {
	render() {
		createWelcomeStack = () => (
			<Stack.Navigator>
				<Stack.Screen name='Login to <mode>' component={LogInScreen} />
				<Stack.Screen name='SignUp' component={SignUpScreen} />
				<Stack.Screen name='Screen2' component={Screen2} />
				<Stack.Screen name='Screen3' component={Screen3} />
			</Stack.Navigator>
		)

		return (
			<NavigationContainer>
				<Drawer.Navigator>
					<Drawer.Screen name='Welcome' children={createWelcomeStack} />
					<Drawer.Screen name='Home' component={HomeScreen} />
					<Drawer.Screen name='Profile' component={ProfileScreen} />
					<Drawer.Screen name='DailyMode' component={DailyModeScreen} />
				</Drawer.Navigator>
			</NavigationContainer>
			// <>
			// 	<View>
			// 		<StatusBar style='auto' />
			// 		<WelcomeScreen />
			// 	</View>
			// </>
		)
	}
}
