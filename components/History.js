import React, { Component } from "react"
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity
} from "react-native"
import { connect } from "react-redux"
import UdaciFitnessCalendar from "udacifitness-calendar"
import { receiveEntries, addEntry } from "../actions"
import { timeToString, getDailyRemainderValue } from "../utils/helpers"
import { fetchCalendarResults } from "../utils/api"
import { white } from "../utils/colors"
import DateHeader from "./DateHeader"
import MetricCard from "./MetricCard"

const styles = StyleSheet.create({
  item: {
    backgroundColor: white,
    borderRadius: Platform.OS === "ios" ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: "center",
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: "rgba(0,0,0,0.24)",
    shadowOffset: {
      width: 0,
      height: 3
    }
  },
  noDateText: {
    fontSize: 20,
    paddingTop: 20,
    paddingBottom: 20
  }
})

class History extends Component {
  componentDidMount() {
    const { dispatch } = this.props

    fetchCalendarResults()
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

  renderItem = ({ today, ...metrics }, formattedDate, key) => {
    console.log(metrics)
    return (
      <View style={styles.item}>
        {today ? (
          <View>
            <DateHeader date={formattedDate} />
            <Text style={styles.noDateText}>{today}</Text>
          </View>
        ) : (
          <TouchableOpacity onPress={() => console.log("pressed")}>
            <MetricCard metrics={metrics} date={formattedDate} />
          </TouchableOpacity>
        )}
      </View>
    )
  }

  renderEmptyDate = formattedDate => (
    <View style={styles.item}>
      <DateHeader date={formattedDate} />
      <Text style={styles.noDateText}>
        You did not log any data on this day
      </Text>
    </View>
  )

  render() {
    const { entries } = this.props

    return (
      <UdaciFitnessCalendar
        items={entries}
        renderItem={this.renderItem}
        renderEmptyDate={this.renderEmptyDate}
      />
    )
  }
}

function mapStateToProps(entries) {
  return {
    entries
  }
}

export default connect(mapStateToProps)(History)
