import React, { useState, useContext } from 'react'
import AuthNav from './app/navigation/AuthNav'
import AppNav from './app/navigation/AppNav'
import { NavigationContainer } from '@react-navigation/native'
import jwtDecode from 'jwt-decode'
import { Provider } from 'react-redux'
import store from './app/store'

export default function App() {
	const [user, setUser] = useState()
	const [token, setToken] = useState()

	return (
		<Provider store={store}>
			<NavigationContainer>
				{token ? <AppNav /> : <AuthNav />}
			</NavigationContainer>
		</Provider>
	)
}
