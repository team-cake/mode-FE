import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import HomeScreen from '../screens/HomeScreen'
import ProfileScreen from '../screens/ProfileScreen'
import DailyModeScreen from '../screens/DailyModeScreen'

const Drawer = createDrawerNavigator()

const AuthNav = () => (
	<Drawer.Navigator>
		<Drawer.Screen name='Welcome' children={createWelcomeStack} />
		<Drawer.Screen name='Home' component={HomeScreen} />
		<Drawer.Screen name='Profile' component={ProfileScreen} />
		<Drawer.Screen name='DailyMode' component={DailyModeScreen} />
	</Drawer.Navigator>
)

export default AuthNav
