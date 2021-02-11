import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Accelerometer } from 'expo-sensors'
import Ball from './components/Ball'
import { SCREEN_HEIGHT, SCREEN_WIDTH, BALL_SIZE, BALL_RAYON, NUMBER_OF_BALLS, GRAVITY } from './helpers/utils'

const App = () => {
  // Position of one ball
  const [ballTop, setBallTop] = useState(SCREEN_HEIGHT - BALL_SIZE * 2)
  const [ballLeft, setBallLeft] = useState(SCREEN_WIDTH / 2 - BALL_RAYON)

  // Array with all my balls
  let balls = []
  let gameTimerId

  for (let i = 0; i < NUMBER_OF_BALLS; i++) {
    const ball = <Ball 
      key={i}
      size={BALL_SIZE}
      top={ballTop - (BALL_SIZE + BALL_RAYON) * i}
      left={ballLeft}
      borderRadius={BALL_RAYON}
    />

    balls.push(ball)
  }

  useEffect(() => {
    gameTimerId = setInterval(() => {
      for (let i = 0; i < NUMBER_OF_BALLS; i++) {
        setBallTop(ballTop => ballTop + GRAVITY)
      }
    }, 1)
  }, [ballTop])

  // Function for accelerometer
  Accelerometer.setUpdateInterval(15)

  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  })
  const [subscription, setSubscription] = useState(null)

  const _subscribe = () => {
    setSubscription(
      Accelerometer.addListener(accelerometerData => {
        setData(accelerometerData)
      })
    )
  }

  const _unsubscribe = () => {
    subscription && subscription.remove()
    setSubscription(null)
  }

  useEffect(() => {
    _subscribe()
    return () => _unsubscribe()
  }, [])

  const { x, y, z } = data

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {balls}
      <Text>x: {round(x)} y: {round(y)} z: {round(z)}</Text>
    </View>
  )
}

const round = (n) => {
  if (!n) {
    return 0
  }
  return Math.floor(n * 100) / 100
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginTop: 20
  },
})

export default App
