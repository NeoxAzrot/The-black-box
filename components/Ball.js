import React from 'react'
import { View } from 'react-native'

const Ball = ( props ) => {
  // Toutes les props de la balle
  const { size, top, left, borderRadius } = props

  // On affiche la view
  return (
    <View style={{
      position: 'absolute',
      width: size,
      height: size,
      borderRadius: borderRadius,
      left: left,
      top: top,
      backgroundColor: 'red'
    }} 
    />
  )
}

export default Ball