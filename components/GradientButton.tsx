import { StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native'
import React, { useMemo } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { Colors } from '@/constants/Colors'
import { Href, Link } from 'expo-router'
import { layoutStyles } from '@/styles'

interface IGradientButton {
  style?: any
  colors: string[]
  text: string
  textStyle?: any
  disabled?: boolean
  onPress?: () => void
  link?: boolean
  href?: Href<string | object>
}

const GradientButton = ({ style, colors: gradientColor, text, textStyle, disabled, onPress, link, href }: IGradientButton) => {
  const theme = useColorScheme() ?? 'light';

  const colors = useMemo(() => ({
    disabled: theme === 'light' ? Colors.light.disabled : Colors.dark.disabled,
  }), [theme]);

  const Component = link ? Link : TouchableOpacity;

  return (
    <Component href={href} onPress={onPress} >
      <View style={[{ overflow: 'hidden' }, style]}>
        <LinearGradient
          colors={disabled ? [colors.disabled, colors.disabled] : gradientColor}
          style={[styles.button]}>
          <Text style={[styles.text, textStyle]}>{text}</Text>
        </LinearGradient>
      </View>
    </Component>
  )
}

export default GradientButton

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  text: {
    color: '#fff'
  }
})