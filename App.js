import React from 'react'
import { Provider } from 'react-redux'
import store from './app/store'
import { useFonts } from '@use-expo/font'
import { AppLoading } from 'expo'
import AppNav from './app/navigation/AppNav'
import Navigation from './app/navigation'

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
				{/* <AppNav /> */}
				<Navigation />
			</Provider>
		)
	}
}
