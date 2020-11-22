import React from "react";
import { StyleSheet, Text, View } from "react-native";

class StockRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = { lastUpdate: Date.now(), message: "Just Now" };
  }
  componentDidMount() {
    this.intervalId = setInterval(() => {
      let lastUpdate = Math.round(
        (Date.now() - this.props.stock.lastUpdate) / 1000
      );
      if (lastUpdate === 0) {
        this.setState({ message: `Just Now` });
      } else if (lastUpdate <= 60) {
        this.setState({ message: `${lastUpdate} sec(s) Ago` });
      } else if (lastUpdate <= 60 * 60) {
        this.setState({ message: `${Math.round(lastUpdate / 60)} min(s) Ago` });
      } else if (lastUpdate <= 60 * 60 * 24) {
        this.setState({
          message: `${Math.round(lastUpdate / (60 * 60))} hour(s) Ago`
        });
      } else {
        this.setState((prevState) => {
          message: `${new Date(prevState.lastUpdate)}mins Ago`;
        });
      }
    }, 1 * 1000);
  }
  render() {
    let lastClass = "";
    let changeClass = "changePositive";
    if (this.props.stock === this.props.last) {
      lastClass = this.props.stock.change < 0 ? "lastNegative" : "lastPositive";
    }
    if (this.props.stock.change < 0) {
      changeClass = "changeNegative";
    }
    return (
      <View style={styles.row}>
        <Text style={styles.cell}>{this.props.stock.symbol}</Text>
        <Text style={[styles.cell, styles[lastClass]]}>
          {this.props.stock.last}
        </Text>
        <Text style={[styles.cell, styles[changeClass]]}>
          {this.props.stock.change}
        </Text>
        <Text style={[styles.cell, styles.larger]}>{this.state.message}</Text>
      </View>
    );
  }
  componentWillUnmount() {
    clearInterval(this.intervalId);
  }
}

const styles = StyleSheet.create({
  row: {
    display: "flex",
    flexDirection: "row"
  },
  cell: {
    width: "74px",
    border: "solid 1px black",
    padding: "5px"
  },
  larger: {
    width: "104px"
  },
  changePositive: {
    color: "green"
  },
  changeNegative: {
    color: "red"
  },
  lastPositive: {
    backgroundColor: "green",
    color: "#FFFFFF"
  },
  lastNegative: {
    backgroundColor: "red",
    color: "#FFFFFF"
  }
});
export default StockRow;
