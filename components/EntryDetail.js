import React from "react"
import { View, Text } from "react-native"

const EntryDetail = ({ navigation }) => (
  <View>
    <Text>entry detail - {navigation.state.params.entryId}</Text>
  </View>
)

export default EntryDetail
