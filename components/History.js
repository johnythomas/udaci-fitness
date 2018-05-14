import React, { Component } from "react"
import { View, Text } from "react-native"
import { connect } from "react-redux"
import { timeToString, getDailyRemainderValue } from "../utils/helpers"
import { fetchCalenderResults } from "../utils/api"
import { receiveEntries, addEntry } from "../actions"

class History extends Component {
  componentDidMount() {
    const { dispatch } = this.props

    fetchCalenderResults()
      .then(entries => dispatch(receiveEntries(entries)))
      .then(({ entries }) => {
        if (!entries[timeToString()]) {
          dispatch(
            addEntry({
              [timeToString()]: getDailyRemainderValue()
            })
          )
        }
      })
  }

  render() {
    return (
      <View>
        <Text>{JSON.stringify(this.props)}</Text>
      </View>
    )
  }
}

const mapStateToProps = entries => entries

export default connect(mapStateToProps)(History)
