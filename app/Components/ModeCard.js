import React from 'react'
import {
	Image,
	ScrollView,
	Dimensions,
	StyleSheet,
	View,
	TouchableOpacity,
} from 'react-native'
import {
	Container,
	Header,
	Content,
	Card,
	CardItem,
	Thumbnail,
	Text,
	Button,
	Icon,
	Left,
	Body,
} from 'native-base'

// import { styles } from '../styles/styles.js'

export default function Showmodes({ mode, comment, image }) {
	return (
		<>
			<ScrollView>
				<View
					style={{
						flex: 1,
						backgroundColor: 'lightgray',
						justifyContent: 'center',
						padding: 5,
					}}
				>
					<TouchableOpacity>
						<Container style={styles.container}>
							<Header />
							<Content>
								<Card>
									<CardItem header>
										<Text style={styles.textContainer}>Mode: {mode}</Text>
									</CardItem>
									<CardItem>
										<Body>
											<Image
												style={styles.image}
												source={require('../assets/mode_logo.png')}
											/>
											<Text style={styles.textContainer}>
												Comment: {comment}
											</Text>
										</Body>
									</CardItem>
									<CardItem footer>
										<Text>dis</Text>
									</CardItem>
								</Card>
							</Content>
						</Container>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: 200,
		marginBottom: 25,
		borderRadius: 15,
		backgroundColor: '#FFFFFF',
		overflow: 'hidden',
	},

	image: {
		width: '100%',
		height: '70%',
	},

	textContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},

	text: {
		fontWeight: 'bold',
		fontSize: 20,
	},
})
