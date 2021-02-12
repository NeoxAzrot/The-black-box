import { Dimensions } from 'react-native'

// Liste des constantes de l'application pour faciliter l'utilisation et la réutilisation
export const SCREEN_HEIGHT = Dimensions.get('window').height
export const SCREEN_WIDTH = Dimensions.get('window').width
export const BALL_SIZE = 40
export const BALL_RAYON = BALL_SIZE / 2
export const NUMBER_OF_BALLS = 2
export const GRAVITY = 5