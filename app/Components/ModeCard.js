import React from 'react'
import { Image } from 'react-native'
import {
	Container,
	Content,
	Card,
	CardItem,
	Text,
	Button,
	Left,
	Body,
} from 'native-base'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import { styles } from '../styles/styles.js'

export default function Showmodes({ mode, date, image, comment }) {
	return (
		<>
			<Container
				style={{
					height: 475,
					backgroundColor: 'grey',
				}}
			>
				<Content>
					<Card style={{ flex: 1 }}>
						<CardItem>
							<Left>
								<Text style={styles.headerCard}>Mode: {mode} </Text>
								<Body>
									<Text note> - date: {date}</Text>
								</Body>
							</Left>
						</CardItem>
						<CardItem>
							<Body>
								<Image
									source={{ uri: image }}
									style={{
										height: 300,
										width: 300,
										flex: 1,
										marginBottom: 5,
									}}
								/>
								<Text style={styles.tinySmall}>comment: </Text>
								<Text>{comment}</Text>
							</Body>
						</CardItem>
						{/* <Button>
							<CardItem>
								<Left>
									<MaterialCommunityIcons name='update' />
									<Text style={styles.tinySmall}>update your mode</Text>
								</Left>
							</CardItem>
						</Button> */}
					</Card>
				</Content>
			</Container>
		</>
	)
}
