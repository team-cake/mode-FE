import React from 'react'
import { Image } from 'react-native'
import {
	Container,
	Content,
	Card,
	CardItem,
	Text,
	Left,
	Body,
} from 'native-base'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import { styles } from '../styles/styles.js'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function Showmodes({ mode, date, image, comment }) {
	return (
		<>
			<TouchableOpacity>
				<Container
					style={{
						height: 150,
					}}
				>
					<Content>
						<Card style={{ flex: 0 }}>
							<CardItem>
								<Left>
									<Image
										source={{ uri: image }}
										style={{ height: 100, width: 100, flex: 0 }}
									/>
									<Body>
										<Text style={styles.text}>Mode: {mode} </Text>
										<Text note>Date: {date}</Text>
										<Text note>Comment: {comment}</Text>
									</Body>
								</Left>
							</CardItem>
						</Card>
					</Content>
				</Container>
			</TouchableOpacity>
		</>
	)
}
