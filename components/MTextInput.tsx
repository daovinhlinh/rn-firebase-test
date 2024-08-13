import { StyleSheet, Text, TextInput, useColorScheme, View } from 'react-native'
import React, { ComponentPropsWithoutRef } from 'react'
import { fontSize, heightScale } from '@/styles'
import { Colors } from '@/constants/Colors'

interface IMTextInput extends ComponentPropsWithoutRef<typeof TextInput> {
  multiline?: boolean
  placeholder?: string
  style?: any
  onChangeText?: (text: string) => void
  //add rest of props here
}

const MTextInput = ({ style, ...rest }: IMTextInput) => {
  const theme = useColorScheme() ?? 'light';

  return (
    //add text input here, allow multiline
    <TextInput
      placeholderTextColor={Colors[theme].gray_4}
      style={[styles.input, {
        borderColor: Colors[theme].gray_5,
        backgroundColor: theme === 'light' ? Colors[theme].white : Colors[theme].black,
      },
        style]}
      {...rest}
    />
  )
}

export default MTextInput

const styles = StyleSheet.create({
  input: {
    paddingVertical: heightScale(10),
    paddingHorizontal: heightScale(12),
    borderWidth: 1,
    fontSize: fontSize(19),
    lineHeight: fontSize(23),
  }
})