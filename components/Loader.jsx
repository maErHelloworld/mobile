import { View, Text } from 'react-native'
import React from 'react'

export default function Loader({size="large"}) {
 return (
  <View
  style={{
     flex: 1,
     justifyContent: "center",
     alignItems: "center",
     backgroundColor: COLORS.backgroundColor,
 
 
  }}
  >
 <ActivityIndicator size={size} color={COLORS.primary} />
  </View>
 )
}