import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { SCREEN_HEIGHT, SCREEN_WIDTH, BALL_SIZE, BALL_RAYON, GRAVITY } from '../helpers/utils'

const Ball = ( props ) => {
  const { size, top, left, borderRadius, data } = props
  const { x, y, z } = data

  // Position of a ball
  const [ballTop, setBallTop] = useState(top)
  const [ballLeft, setBallLeft] = useState(left)

  useEffect(() => {
    const interval = setInterval(() => {
      setBallTop(ballTop => ballTop - round(y) * GRAVITY)
      setBallLeft(ballLeft => ballLeft + round(x) * GRAVITY)
    }, 3)
    return () => clearInterval(interval)
  }, [ballTop, ballLeft])

  return (
    <View style={{
      position: 'absolute',
      width: size,
      height: size,
      borderRadius: borderRadius,
      left: ballLeft,
      top: ballTop,
      backgroundColor: 'red'
    }} 
    />
  )
}

const round = (n) => {
  if (!n) {
    return 0
  }
  return Math.floor(n * 100) / 100
}


export default Ball