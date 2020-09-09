import React, { useState, useContext } from 'react'
import AuthNav from './app/navigation/AuthNav'
import AppNav from './app/navigation/AppNav'
import { NavigationContainer } from '@react-navigation/native'
import jwtDecode from 'jwt-decode'
import { Provider } from 'react-redux'
import store from './app/store'
import AppContainer from './app/navigation/index'

export default function App() {
	return (
		<Provider store={store}>
			<NavigationContainer independent={true}>
				{/* <AppNav /> */}
				<AuthNav />
				{/* <AppContainer /> */}
			</NavigationContainer>
		</Provider>
	)
}
