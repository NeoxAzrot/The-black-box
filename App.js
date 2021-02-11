import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Accelerometer } from 'expo-sensors'
import Ball from './components/Ball'
import { SCREEN_HEIGHT, SCREEN_WIDTH, BALL_SIZE, BALL_RAYON, NUMBER_OF_BALLS } from './helpers/utils'

const App = () => {
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
  
  // Array with all my balls
  let balls = []

  for (let i = 0; i < NUMBER_OF_BALLS; i++) {
    const ball = <Ball 
      key={i}
      size={BALL_SIZE}
      top={(SCREEN_HEIGHT - BALL_SIZE * 2) - (BALL_SIZE + BALL_RAYON) * i}
      left={SCREEN_WIDTH / 2 - BALL_RAYON}
      borderRadius={BALL_RAYON}
      data={{x, y, z}}
    />

    balls.push(ball)
  }

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
