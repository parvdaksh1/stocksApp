import React from 'react'
import { StyleSheet, View } from 'react-native'
import WS from 'react-native-websocket'
import StockTable from './components/stockTable';

export default function App (){
  const [stocks,setStocks] = React.useState({});
  const [last,setLast] = React.useState({});

  const onMessage = (message) => {
    let newStocks = {...stocks};
    
    JSON.parse(message.data).forEach(stock => {
      let symbol = stock[0];
      let value = parseFloat(stock[1]);
      if(newStocks[symbol]) {
        newStocks[symbol].change = (newStocks[symbol].last - value).toFixed(2);
        newStocks[symbol].last = value.toFixed(2);
      } else {
        newStocks[symbol] = {};
        newStocks[symbol].symbol = symbol;
        newStocks[symbol].change = value.toFixed(2);
        newStocks[symbol].last = value.toFixed(2);
      }
      newStocks[symbol].lastUpdate = Date.now();
      setLast(newStocks[symbol]);
      setStocks(newStocks);
    });
    
  }
  const onError = (error)=>{
    //console.log(error.code,error.reason);
  }
  const onClose = (close)=>{
    //console.log('Connetion Closed!');
  }
  const onOpen = () => {
    //console.log('Connection Opened!')
  }
  return (
    <View style={styles.container}>
        <StockTable stocks={stocks} last={last} />
      <WS
        url="ws://stocks.mnet.website"
        onOpen={onOpen}
        onMessage={onMessage}
        onError={onError}
        onClose={onClose}
        reconnect // Will try to reconnect onClose
      />
    </View>
  )
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  }
});
