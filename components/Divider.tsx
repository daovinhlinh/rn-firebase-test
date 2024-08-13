import { StyleSheet, Text, useColorScheme, View } from 'react-native'
import React, { useMemo } from 'react'
import { Colors } from '@/constants/Colors';

interface IDivider {
  color?: string
}

const Divider = ({ color }: IDivider) => {
  const theme = useColorScheme() ?? 'light';

  const defaultColor = useMemo(() => theme === 'light' ? Colors.light.primary_3 : Colors.dark.primary_3, [theme]);

  return (
    <View style={[styles.divider, {
      backgroundColor: color ?? defaultColor
    }]} />
  )
}

export default Divider

const styles = StyleSheet.create({
  divider: {
    height: 2,
    flex: 1
  }
})