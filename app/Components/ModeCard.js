import React from 'react'
import { Image, StyleSheet } from 'react-native'
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
import { MaterialCommunityIcons } from '@expo/vector-icons'

import { styles } from '../styles/styles.js'

export default function Showmodes({ mode, date, image, comment }) {
	return (
		<>
			<Container>
				<Content>
					<Card style={{ flex: 1 }}>
						<CardItem>
							<Left>
								<Text style={styles.text}>Mood: {mode} </Text>
								<Body>
									<Text note> - date: {date}</Text>
								</Body>
							</Left>
						</CardItem>
						<CardItem>
							<Body>
								<Image
									source={{ uri: image }}
									style={{ height: 300, width: 300, flex: 1 }}
								/>
								<Text style={styles.medium}>comment: {comment}</Text>
							</Body>
						</CardItem>
						<Button>
							<CardItem>
								<Left>
									<MaterialCommunityIcons name='update' />
									<Text style={styles.tinySmall}>update your mode</Text>
								</Left>
							</CardItem>
						</Button>
					</Card>
				</Content>
			</Container>
		</>
	)
}
