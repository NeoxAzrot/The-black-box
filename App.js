import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Vibration, Text } from 'react-native'
import { Accelerometer } from 'expo-sensors'
import Ball from './components/Ball'
import { SCREEN_HEIGHT, SCREEN_WIDTH, BALL_SIZE, BALL_RAYON, NUMBER_OF_BALLS, GRAVITY } from './helpers/utils'

const App = () => {
  // Variable du timer
  const [timer, setTimer] = useState(0)

  // Position de la balle
  const [ballTop, setBallTop] = useState(SCREEN_HEIGHT / 2 - BALL_RAYON)
  const [ballLeft, setBallLeft] = useState(SCREEN_WIDTH / 2 - BALL_RAYON)

  // Les fonctions de l'accéléromètre
  Accelerometer.setUpdateInterval(15)

  // Les data du capteur
  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  })
  const [subscription, setSubscription] = useState(null)

  // Voir la documentation de expo
  const _subscribe = () => {
    setSubscription(
      Accelerometer.addListener(accelerometerData => {
        setData(accelerometerData)
      })
    )
  }

  // Voir la documentation de expo
  const _unsubscribe = () => {
    subscription && subscription.remove()
    setSubscription(null)
  }

  useEffect(() => {
    _subscribe()
    return () => _unsubscribe()
  }, [])

  const { x, y, z } = data

  // Tableau avec toutes les balles
  let balls = []

  // Création de chaque balle en fonction du nombre de balle
  for (let i = 0; i < NUMBER_OF_BALLS; i++) {
    const ball = <Ball 
      key={i}
      size={BALL_SIZE}
      left={ballLeft}
      top={ballTop}
      borderRadius={BALL_RAYON}
    />

    // Ajout des balles au tableau
    balls.push(ball)
  }

  // Animation des balles avec les conditions de l'écran et des collisions
  useEffect(() => {
    // On bouge la ball uniquement si elle est dans l'écran
    if(ballTop < SCREEN_HEIGHT - BALL_SIZE && ballTop > 0 && ballLeft < SCREEN_WIDTH - BALL_SIZE && ballLeft > 0) {
      const interval = setInterval(() => {
        setBallTop(ballTop => ballTop - round(y) * GRAVITY)
        setBallLeft(ballLeft => ballLeft + round(x) * GRAVITY)
      }, 3)
  
      // On clear l'interval pour ne pas surcharger la batterie du téléphone
      return () => clearInterval(interval)
    }

    // Si la ball touche le haut de l'écran
    if(ballTop <= 0) {
      setBallTop(1)
      Vibration.vibrate()
    }
    
    // Si la ball touche le bas de l'écran
    if(ballTop >= SCREEN_HEIGHT - BALL_SIZE) {
      setBallTop(SCREEN_HEIGHT - BALL_SIZE - 1)
      Vibration.vibrate()
    }

    // Si la ball touche la gauche de l'écran
    if(ballLeft <= 0) {
      setBallLeft(1)
      Vibration.vibrate()
    }
    
    // Si la ball touche la droite de l'écran
    if(ballLeft >= SCREEN_WIDTH - BALL_SIZE) {
      setBallLeft(SCREEN_WIDTH - BALL_SIZE - 1)
      Vibration.vibrate()
    }
  }, [ballTop, ballLeft])

  // On ajoute 1 au timer toutes les secondes car 1000ms = 1s
  useEffect(() => {
    setInterval(() => {
      setTimer(timer => timer + 1)
    }, 1000)
  }, [])

  // On affiche la view
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>Temps écoulé : {timer}s</Text>
      {balls}
    </View>
  )
}

// Fonction pour arrondir les données de l'accéléromètre qui sont avec trop de décimal par défaut
const round = (n) => {
  if (!n) {
    return 0
  }
  return Math.floor(n * 100) / 100
}

// Stylesheet
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
})

export default App
