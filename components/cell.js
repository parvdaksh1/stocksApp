import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Cell(props) {
  return <Text style={props.style}>{props.text}</Text>;
}
