import React, { useState, useEffect } from 'react'
import { View } from 'react-native'

const Ball = ( props ) => {
  const { size, top, left, borderRadius } = props

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