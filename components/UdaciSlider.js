import React from "react"
import { Slider, Text, View } from "react-native"

const UdaciSlider = ({ max, unit, step, value, onChange }) => (
  <View>
    <Slider
      step={step}
      value={value}
      maximumValue={max}
      minimumValue={0}
      onValueChange={onChange}
    />
    <Text>{value}</Text>
    <Text>{unit}</Text>
  </View>
)

export default UdaciSlider
