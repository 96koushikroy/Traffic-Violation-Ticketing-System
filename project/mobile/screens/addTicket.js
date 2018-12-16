import React from 'react'
import {View, Text, Switch, StyleSheet, Image, ActivityIndicator} from 'react-native'
import { Button } from 'react-native-material-ui';
import {getTicketReasons, addTicket} from '../actions/ticketAction'
import {connect} from 'react-redux'
import TextInput from 'react-native-material-textinput'
import DatePicker from 'react-native-datepicker'
import { Select, Option } from 'react-native-select-list2';
import isEmpty from '../Validation/isEmpty';
import { Camera, Permissions, ImageManipulator } from 'expo';
import axios from 'axios'
import { showMessage } from "react-native-flash-message";




class AddTicket extends React.Component {
    static navigationOptions = {
        title: 'Add Ticket',
    };

    state = {
        car_number: '',
        police_id: '',
        selectedReason: 1,
        other_documents: '',
        amount: '',
        issue_date: '',
        deadline_date: '',
        switchValue: false,
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
        loading: false
    }

    async componentDidMount(){
        if (this.props.auth.isAuthenticated == false) {
            this.props.navigation.navigate('Login')
        }
        else if(this.props.auth.user.user_type != 2){
            this.props.navigation.navigate('Dashboard')
        }
        else if(this.props.auth.isAuthenticated && this.props.auth.user.user_type == 2){    
            this.setState({
                police_id: this.props.auth.user.id
            });



            const { status } = await Permissions.askAsync(Permissions.CAMERA);
            this.setState({ hasCameraPermission: status === 'granted' });
            this.props.getTicketReasons();
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated == false) {
            this.props.navigation.navigate('Login')
        }
    }

    handleSubmit = () => {
        if(isEmpty(this.state.selectedReason)){
            showMessage({
                message: "Please Reselect Ticket Reason",
                type: "danger",
            });
        }
        else{
            this.props.addTicket(this.state);
        }
        /*this.setState({
            car_number: '',
            police_id: '',
            selectedReason: 0,
            other_documents: '',
            amount: '',
            issue_date: '',
            deadline_date: '',
            b64img:''

        });*/
    }

    /* Work with the ocr api */
    handleFileSubmit = async (uri, b64) => {
        const rr = await ImageManipulator.manipulateAsync(uri,[{resize:{
            width: 500, height: 500
        }}],{base64: true})
        //rr.base64

        const formData = new FormData();
        
        formData.append('base64Image', 'data:image/jpg;base64,'+rr.base64);
        formData.append('apikey','47cfc563df88957');

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        this.setState({
            loading: true
        })
        axios.post("https://api.ocr.space/parse/image", formData, config)
        .then((response) => {
            console.log(response.data);
            let ocrRes = response.data.ParsedResults[0].ParsedText
            if(isEmpty(ocrRes)){
                //NotificationManager.error('Server did not return any result');
                showMessage({
                    message: "Server did not return any result",
                    type: "danger",
                });
            }
            this.setState({
                car_number: response.data.ParsedResults[0].ParsedText
            })
            this.setState({
                loading: false
            })
        })
        .catch((error) => {
            console.log(error)
        });

    }

    snapPhoto = async () => {
        if (this.camera) {
            let photo = await this.camera.takePictureAsync({ width:50, height:50, quality: 0, base64: true });
            if (photo) {
                this.handleFileSubmit(photo.uri, 'data:image/jpg;base64,'+photo.base64)
                this.setState({
                    switchValue: false
                })
            }
        }
    };

    render(){
        const { hasCameraPermission } = this.state;
        return(
            <View style={{padding: 10}}>

                <Text>Show camera</Text>    
                <Switch 
                    onValueChange={value => {
                        this.setState({ switchValue: value });
                    }}
                    value={this.state.switchValue}
                />

                {this.state.loading == true ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <Text></Text>
                )

                }

                {/*!isEmpty(this.state.imguri) ? (
                    <Image source={{uri: this.state.imguri}}
                        style={{width: 400, height: 400}} />
                ): (
                    <Text></Text>
                )
                  */  
                }
                
                {this.state.switchValue == true && hasCameraPermission === true ? (
                        <View>
                            <View style={styles.cameraview}> 
                                <Camera base64={true} ref={ref => { this.camera = ref; }} style={styles.camera} type={this.state.type}></Camera>
                                
                            </View>
                            <Button
                                primary
                                raised
                                style={{width:10}}
                                text="Capture"
                                onPress={this.snapPhoto}
                            />
                        </View>
                        
                    
                    ) : (
                        <Text></Text>
                    )
                }
                    

                <TextInput
                    label="Car Number:"
                    style={{height: 40, borderColor: 'black', borderWidth: 1}}
                    onChangeText={(text) => this.setState({car_number: text})}
                    placeholder="DHK-MT-CHA-11-1414"
                    value={this.state.car_number}
                />
                

                <TextInput
                    label="Other Documents:"
                    style={{height: 40, borderColor: 'black', borderWidth: 1}}
                    onChangeText={(text) => this.setState({other_documents: text})}
                    placeholder="License No. 11111"
                    value={this.state.other_documents}
                />

                <TextInput
                    label="Ticket Fee:"
                    style={{height: 40, borderColor: 'black', borderWidth: 1}}
                    onChangeText={(text) => this.setState({amount: text})}
                    placeholder="1234"
                    value={this.state.amount}
                />
                <DatePicker
                    date={this.state.deadline_date}
                    mode="date"
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    minDate="2018-01-01"
                    maxDate="2020-12-30"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    placeholder="Pick Ticket Deadline Date"
                    style={{width: 300}}
                    onDateChange={(date) => {this.setState({deadline_date: date})}}
                />
                <Text>{"\n"}</Text>
                <Text>Ticket Reason:</Text>
                {!isEmpty(this.props.reasons) ? (
                    <Select onSelect= {(t,v)=>{this.setState({selectedReason: t})}}>
                        {this.props.reasons.map(rr => {
                            return (<Option key={rr.id} value={rr.id}>{rr.reason_name}</Option>)
                        })}
                    </Select>
                    ) : (
                        <Text></Text>
                    ) 
                }
                
                <Text>{"\n"}</Text>
                
                <Button
                    primary
                    raised
                    style={{width:10}}
                    text="ADD TICKET"
                    onPress={this.handleSubmit}
                />
            </View>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        reasons: state.ticket.reasons,
        errors: state.error,
        auth: state.auth
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#1dd1a1",
      alignItems: "center",
      justifyContent: "flex-start"
    },
    switchview: {
      marginTop: 50,
      backgroundColor: "white",
      padding: 10,
      alignItems: "center",
      borderRadius: 5,
      marginBottom: 5
    },
    switch: {
      padding: 5
    },
    cameraview: {
      height: 400,
      width: "90%",
      backgroundColor: "white",
      borderRadius: 5,
      justifyContent: "center",
      alignItems: "center"
    },
    camera: {
      height: "95%",
      width: "95%",
      backgroundColor: "white",
      borderRadius: 5,
      justifyContent: "center",
      alignItems: "center"
    },
    camerabuttonview: {
      height: "100%",
      backgroundColor: "transparent"
    },
    cameraButtons: {
      borderColor: "#fff",
      borderWidth: 2,
      padding: 10,
      borderRadius: 5,
      margin: 5
    },
    captureButtonView: {
      height: 200
    },
    buttonsView: {
      height: 200,
      width: "100%",
      flexDirection: "row",
      justifyContent: "center"
    },
    uploadedImage: {
      height: "90%",
      width: "90%",
      padding: 10
    }
  });
export default connect(mapStateToProps, {getTicketReasons, addTicket})(AddTicket);