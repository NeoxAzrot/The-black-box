import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Vibration, Text } from 'react-native'
import { Accelerometer } from 'expo-sensors'
import Ball from './components/Ball'
import { SCREEN_HEIGHT, SCREEN_WIDTH, BALL_SIZE, BALL_RAYON, NUMBER_OF_BALLS, GRAVITY } from './helpers/utils'

const App = () => {
  const [timer, setTimer] = useState(0)

  // Position of a ball
  const [ballTop, setBallTop] = useState(SCREEN_HEIGHT / 2 - BALL_RAYON)
  const [ballLeft, setBallLeft] = useState(SCREEN_WIDTH / 2 - BALL_RAYON)

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
      left={ballLeft}
      top={ballTop}
      borderRadius={BALL_RAYON}
    />

    balls.push(ball)
  }

  useEffect(() => {
    if(ballTop < SCREEN_HEIGHT - BALL_SIZE && ballTop > 0 && ballLeft < SCREEN_WIDTH - BALL_SIZE && ballLeft > 0) {
      const interval = setInterval(() => {
        setBallTop(ballTop => ballTop - round(y) * GRAVITY)
        setBallLeft(ballLeft => ballLeft + round(x) * GRAVITY)
      }, 3)
  
      return () => clearInterval(interval)
    }

    if(ballTop <= 0) {
      setBallTop(1)
      Vibration.vibrate()
    }
    if(ballTop >= SCREEN_HEIGHT - BALL_SIZE) {
      setBallTop(SCREEN_HEIGHT - BALL_SIZE - 1)
      Vibration.vibrate()
    }
    if(ballLeft <= 0) {
      setBallLeft(1)
      Vibration.vibrate()
    }
    if(ballLeft >= SCREEN_WIDTH - BALL_SIZE) {
      setBallLeft(SCREEN_WIDTH - BALL_SIZE - 1)
      Vibration.vibrate()
    }
  }, [ballTop, ballLeft])

  useEffect(() => {
    setInterval(() => {
      setTimer(timer => timer + 1)
    }, 1000)
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>Temps écoulé : {timer}s</Text>
      {balls}
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
    justifyContent: 'center',
    alignItems: 'center'
  },
})

export default App
