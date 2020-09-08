import * as React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons'
import HomeScreen from '../screens/HomeScreen'
import ProfileScreen from '../screens/ProfileScreen'
import DailyModeScreen from '../screens/DailyModeScreen'

const Tab = createBottomTabNavigator()

export default function AppNav() {
	return (
		<Tab.Navigator initialRouteName='Home'>
			<Tab.Screen
				lazy={false}
				name='Home'
				component={HomeScreen}
				options={{
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons name='home' color={color} size={size} />
					),
				}}
			/>
			<Tab.Screen
				lazy={false}
				name='DailyMode'
				component={DailyModeScreen}
				options={{
					tabBarIcon: ({ color, size }) => (
						<Entypo name='code' color={color} size={size} />
					),
				}}
			/>
			<Tab.Screen
				lazy={false}
				name='Profile'
				component={ProfileScreen}
				options={{
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons
							name='face-profile'
							color={color}
							size={size}
						/>
					),
				}}
			/>
		</Tab.Navigator>
	)
}
