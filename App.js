import React, { useState, useContext } from 'react'
import AuthNav from './app/navigation/AuthNav'
import AppNav from './app/navigation/AppNav'

import { NavigationContainer } from '@react-navigation/native'

export default function App() {
	const [token, setToken] = useState()

	return (
		<NavigationContainer>
			{token ? <AppNav /> : <AuthNav />}
		</NavigationContainer>
	)
}
