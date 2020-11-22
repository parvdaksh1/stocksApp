import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import StockRow from "./stockRow";

export default function StockTable(props) {
  let items = [];
  for (let symbol in props.stocks) {
    let stock = props.stocks[symbol];
    items.push(<StockRow key={stock.symbol} stock={stock} last={props.last} />);
  }
  return (
    <View style={styles.column}>
      <View style={styles.row}>
        <Text style={styles.head}>Ticker</Text>
        <Text style={styles.head}>Last</Text>
        <Text style={styles.head}>Change</Text>
        <Text style={[styles.head, styles.larger]}>Last Update</Text>
      </View>
      <ScrollView style={styles.column}>{items}</ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  head: {
    fontWeight: "bolder",
    width: "74px",
    border: "solid 1px black",
    padding: "5px"
  },
  column: {
    display: "flex",
    flexDirection: "column"
  },
  row: {
    display: "flex",
    flexDirection: "row"
  },
  larger: {
    width: "104px"
  }
});
