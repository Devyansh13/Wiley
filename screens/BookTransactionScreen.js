import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import {BarCodeScanner} from "expo-barcode-scanner";
import * as Permissions from "expo-permissions";

class TransactionScreen extends React.Component{
    constructor(){
    super();
    this.state={
        hasCameraPermissons:null,
        scanned:false,
        scannedData:"",
        buttonState:"normal"
    }}

    getCameraPermissons=async()=>{
    const {status}=await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
        hasCameraPermissions: status==="granted",
        buttonState:"clicked",
        scanned:false
    })
    }
    handleBarCodeScanned=async({type,data })=>{
        this.setState({
            scanned:true,
            scannedData:data,
            buttonState:normal
        })
    }

    render(){
        const hasCameraPermissions=this.state.hasCameraPermissons
        const scanned=this.state.scanned
        const buttonState=this.state.buttonState

if(buttonState=="clicked" && hasCameraPermissions){
    return(
        <BarCodeScanner
        onBarCodeScanned={scanned?undefined:this.handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}></BarCodeScanner>
    
    )
}
else if(buttonState=="normal"){
        return(
            <View
            style={styles.container}>
                 <Text style={styles.displayText}>
                     {hasCameraPermissions===true?this.state.scannedData:"Request camera permission..."}
                 </Text>
            <TouchableOpacity onPress={this.getCameraPermissons}
            style={styles.scanButton}>
                <Text style={styles.buttonText}>Scan QR Code</Text>
            </TouchableOpacity>
           
            </View>
        )
    }
}
}

export default TransactionScreen;

const styles=StyleSheet.create({
    
         container:
          { flex: 1,
             justifyContent: 'center',
              alignItems: 'center' },
               displayText:{ fontSize: 15,
                 textDecorationLine: 'underline' },
                  scanButton:{ backgroundColor: '#2196F3',
                   padding: 10,
                    margin: 10 },
                     buttonText:{
                          fontSize: 20, 
                        } });
