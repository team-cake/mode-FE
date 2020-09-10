import React from 'react'
import AuthNav from './app/navigation/AuthNav'
import AppNav from './app/navigation/AppNav'
import { NavigationContainer } from '@react-navigation/native'
import { Provider } from 'react-redux'
import store from './app/store'
import AppContainer from './app/navigation/index'
import { useFonts } from '@use-expo/font'
import { AppLoading } from 'expo'

export default function App() {
	const [isLoaded] = useFonts({
		'Roboto-Light': require('./app/assets/fonts/Roboto-Light.ttf'),
		'Roboto-LightItalic': require('./app/assets/fonts/Roboto-LightItalic.ttf'),
		'Roboto-Medium': require('./app/assets/fonts/Roboto-Medium.ttf'),
		'Roboto-MediumItalic': require('./app/assets/fonts/Roboto-MediumItalic.ttf'),
	})

	if (!isLoaded) {
		return <AppLoading />
	} else {
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
}
