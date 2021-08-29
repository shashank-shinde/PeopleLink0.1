/* eslint-disable max-len */
import DateTimePicker from 'react-native-modal-datetime-picker';
import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ToastAndroid,
  Image,
  FlatList,
  Platform,
  PermissionsAndroid
} from 'react-native';
import { Picker } from 'native-base';
import { connect } from 'react-redux';
import { Button, Card } from 'react-native-paper';
import Moment from 'moment';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import DocumentPicker from 'react-native-document-picker';
import MessageModal from '../components/MessageModal';
import getMessage from '../config/GetMessage';
import FileItem from '../components/FileItem';
import saveIdentityAttachments from '../services/saveIdentityAttachments';

let counter1 = 0; let counter2 = 0; let counter3 = 0; let counter4 = 0; let
  counter5 = 0;
let typeofcontact = [];
class App extends Component {
  constructor(props) {
    super(props);
    const today = new Date();
    today.setDate(today.getDate());
    const todaydate = `${today.getFullYear()}-${parseInt(today.getMonth() + 1)}-${today.getDate()}`;
    Moment.locale('en');
    const dt = today;
    const hi = Moment(dt).format('DD MMM YYYY');
    this.state = {
      isDateTimePickerVisible: false,
      isDateTimePickerVisible1: false,
      second: true,
      id: this.props.navigation.getParam('fieldid', ''),
      visible: this.props.navigation.getParam('visible', ''),
      nomineeData: this.props.navigation.getParam('nomineeData', ''),
      loading: false,
      NameHolder: '',
      IdHolder: '',
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false,
      spinner: false,
      fromdate: hi,
      expirydate: '31 Dec 9999',
      idnumber: '',
      Relationid: '0',
      dataSource1: [],
      Typeofcontact: '',
      currendate: todaydate,
      startdate: '',
      enddate: '',
      fromrequired: false,
      expiryrequired: false,
      idrequired: false,
      contactrequired: false,
      nominee1Name: '',
      nominee1Relation: '',
      nominee1Per: 0,
      nominee2Name: '',
      nominee2Relation: '',
      nominee2Per: 0,
      nominee3Name: '',
      nominee3Relation: '',
      nominee3Per: 0,
      nominee4Name: '',
      nominee4Relation: '',
      nominee4Per: 0,
      nominee5Name: '',
      nominee5Relation: '',
      nominee5Per: 0,
      counter1: 0,
      counter2: 0,
      counter3: 0,
      counter4: 0,
      counter5: 0,
      IsNomineeRequired: false,
      files: []
    };
    console.log('USER', this.props.user);
    this.arrayholder = [];
  }

  componentDidMount() {
    this.GetDynamicFieldsData();
  }

  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true, expiryrequired: false });
  };

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  handleDatePicked = date => {
    Moment.locale('en');
    const dt = date;
    const hi = Moment(dt).format('DD MMM YYYY');

    this.setState({ expirydate: hi, });
    this.hideDateTimePicker();
  };

  showDateTimePicker1 = () => {
    this.setState({ isDateTimePickerVisible1: true, fromrequired: false });
  };

  hideDateTimePicker1 = () => {
    this.setState({ isDateTimePickerVisible1: false });
  };

  handleDatePicked1 = date => {
    Moment.locale('en');
    const dt = date;
    const hi = Moment(dt).format('DD MMM YYYY');

    this.setState({ fromdate: hi, });
    this.hideDateTimePicker1();
  };

  validate = () => {
    // alert("this.state.Name1")

    if (this.state.fromdate == '' && this.state.expirydate == '' && this.state.idnumber == '' && this.state.Relationid == '' || this.state.Relationid == '0') {
      this.setState({ fromrequired: true, expiryrequired: true, idrequired: true });
      this.setState({
        isModalVisible: true,
        modalMessage: 'Please enter all values',
        modalType: 'E',
        loadingApprove: false
      });
    } else if (this.state.fromdate == '') {
      this.setState({ fromrequired: true, });
      this.setState({
        isModalVisible: true,
        modalMessage: 'Please select from date',
        modalType: 'E',
        loadingApprove: false
      });
    } else if (this.state.expirydate == '') {
      this.setState({ expiryrequired: true, });
      this.setState({
        isModalVisible: true,
        modalMessage: 'Please select expiry date',
        modalType: 'E',
        loadingApprove: false
      });
    } else if (this.state.idnumber == '') {
      this.setState({ idrequired: true, });
      this.setState({
        isModalVisible: true,
        modalMessage: 'Please enter id/number',
        modalType: 'E',
        loadingApprove: false
      });
    } else if (this.state.Relationid == '' || this.state.Relationid == '0') {
      this.setState({ contactrequired: true, });
      this.setState({
        isModalVisible: true,
        modalMessage: 'Please select type of contact',
        modalType: 'E',
        loadingApprove: false
      });
    } else if (this.state.IsNomineeRequired === true) {
      counter1 = 0, counter2 = 0, counter3 = 0, counter4 = 0, counter5 = 0;
      console.log('444444fff', counter4);

      if (this.state.nominee1Name !== '') { counter1 += 1; }
      if (this.state.nominee1Relation !== '') { counter1 += 1; }
      if (this.state.nominee1Per !== 0) { counter1 += 1; }

      if (this.state.nominee2Name !== '') { counter2 += 1; }
      if (this.state.nominee2Relation !== '') { counter2 += 1; }
      if (this.state.nominee2Per !== 0) { counter2 += 1; }

      if (this.state.nominee3Name !== '') { counter3 += 1; }
      if (this.state.nominee3Relation !== '') { counter3 += 1; }
      if (this.state.nominee3Per !== 0) { counter3 += 1; }

      if (this.state.nominee4Name !== '') { counter4 += 1; }
      if (this.state.nominee4Relation !== '') { counter4 += 1; }
      if (this.state.nominee4Per !== 0) { counter4 += 1; }

      if (this.state.nominee5Name !== '') { counter5 += 1; }
      if (this.state.nominee5Relation !== '') { counter5 += 1; }
      if (this.state.nominee5Per !== 0) { counter5 += 1; }

      if (counter1 == 1 || counter1 == 2) {
        this.setState({
          isModalVisible: true,
          modalMessage: 'please enter any nominees1 name , ralation1 and percentage1',
          modalType: 'E',
          loadingApprove: false
        });
      }
      if (counter2 == 1 || counter2 == 2) {
        this.setState({
          isModalVisible: true,
          modalMessage: 'please enter any nominees2 name , ralation2 and percentage2',
          modalType: 'E',
          loadingApprove: false
        });
      }
      if (counter3 == 1 || counter3 == 2) {
        this.setState({
          isModalVisible: true,
          modalMessage: 'please enter any nominees3 name , ralation3 and percentage3',
          modalType: 'E',
          loadingApprove: false
        });
      }
      if (counter4 == 1 || counter4 == 2) {
        this.setState({
          isModalVisible: true,
          modalMessage: 'please enter any nominees4 name , ralation4 and percentage4',
          modalType: 'E',
          loadingApprove: false
        });
      }
      if (counter5 == 1 || counter5 == 2) {
        this.setState({
          isModalVisible: true,
          modalMessage: 'please enter any nominees5 name , ralation5 and percentage5',
          modalType: 'E',
          loadingApprove: false
        });
      }
      let total = 0;
      total = parseInt(this.state.nominee1Per) + parseInt(this.state.nominee2Per) + parseInt(this.state.nominee3Per) + parseInt(this.state.nominee4Per) + parseInt(this.state.nominee5Per);
      console.log('toott', total, this.state.nominee1Per, this.state.nominee2Per, this.state.nominee3Per, this.state.nominee4Per, this.state.nominee5Per);
      if (total !== 100) {
        this.setState({
          isModalVisible: true,
          modalMessage: 'please enter 100%',
          modalType: 'E',
          loadingApprove: false
        });
      }
    } else {
      if (this.state.visible == 'true') {
        this.add();
      } else {
        this.update();
      }
      this.setState({ fromrequired: false, expiryrequired: false, idrequired: false });
    }
  }

  GetDynamicFieldsData() {
    const myarray = {
      loginDetails:
      {
        LoginEmpID: this.props.user.LoginEmpID,
        LoginEmpCompanyCodeNo: this.props.user.LoginEmpCompanyCodeNo
      },
      dynamicFieldsData:
      {
        Action: '5',
        FieldId: this.state.id,
        TableName: 'MyProfile_IdentityDetails$[0004Identity]',
        EmployeeId: this.props.user.LoginEmpID
      }
    };
    // console.log("responseJson",myarray);

    return fetch(`${this.props.user.baseUrl}/CommonFunc/GetDynamicFieldsData`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(myarray),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (this.state.visible == 'true') {
        } else {
          var str = responseJson.controlDataValues[0][3].fieldValue;
          var res = str.split(' ');
          this.setState(
            {
              fromdate: responseJson.controlDataValues[0][0].fieldValue,
              expirydate: responseJson.controlDataValues[0][2].fieldValue,
              idnumber: responseJson.controlDataValues[0][1].fieldValue,
              Relationid: res[0],
              dataSource: responseJson.controlDataValues,
            },

          );
        }
        this.setState(
          {
            spinner: false,
          }
        );

        for (var i = 0; i < responseJson.controlList[0].length; i++) {
          if (responseJson.controlList[0][i].FieldLabel == 'Type Of Contact') {
            const id = responseJson.controlList[0][i].FieldId;
            typeofcontact = [];
            for (var i = 0; i < responseJson.dropdownList[0].length; i++) {
              if (id == responseJson.dropdownList[0][i].FieldId) {
                var str = responseJson.dropdownList[0][i].FieldValues;
                var res = str.split('$');
                typeofcontact.push({ Contact: res[0], Contactid: res[1] });
              }
            }
          }
        }
        this.setState({ dataSource1: typeofcontact, });
        for (var i = 0; i < typeofcontact.length; i++) {
          if (this.state.Relationid == typeofcontact[i].Contactid) {
            this.setState({ Typeofcontact: typeofcontact[i].Contact, });
          }
        }
      })
      .catch(() => {
        ToastAndroid.show('Network error', ToastAndroid.SHORT);
      });
  }

  onModalHide = () => {
    if (this.state.modalType === 'S') {
      const { params } = this.props.navigation.state;
      params.callHome();
      this.props.navigation.goBack();
    }
  }

  update = () => {
    this.setState({ spinner: true, });
    const from = this.state.fromdate;
    const date1 = from.split(' ');
    const expiry = this.state.expirydate;
    const date2 = expiry.split(' ');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    for (var j = 0; j < months.length; j++) {
      if (date1[1] == months[j]) {
        date1[1] = months.indexOf(months[j]) + 1;
      }
    }
    if (date1[1] < 10) {
      date1[1] = `0${date1[1]}`;
    }
    for (var j = 0; j < months.length; j++) {
      if (date2[1] == months[j]) {
        date2[1] = months.indexOf(months[j]) + 1;
      }
    }
    if (date2[1] < 10) {
      date2[1] = `0${date2[1]}`;
    }
    const formattedDate = `${date1[2]}-${date1[1]}-${date1[0]}`;
    const formattedDate1 = `${date2[2]}-${date2[1]}-${date2[0]}`;

    this.setState({ startdate: formattedDate, enddate: formattedDate1 }, () => {
      this.updatefamily();
    });
  };

  add = () => {
    this.setState({ spinner: true, });
    this.setState({ spinner: true, });
    const from = this.state.fromdate;
    const date1 = from.split(' ');
    const expiry = this.state.expirydate;
    const date2 = expiry.split(' ');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    for (var j = 0; j < months.length; j++) {
      if (date1[1] == months[j]) {
        date1[1] = months.indexOf(months[j]) + 1;
      }
    }
    if (date1[1] < 10) {
      date1[1] = `0${date1[1]}`;
    }
    for (var j = 0; j < months.length; j++) {
      if (date2[1] == months[j]) {
        date2[1] = months.indexOf(months[j]) + 1;
      }
    }
    if (date2[1] < 10) {
      date2[1] = `0${date2[1]}`;
    }
    const formattedDate = `${date1[2]}-${date1[1]}-${date1[0]}`;
    const formattedDate1 = `${date2[2]}-${date2[1]}-${date2[0]}`;

    this.setState({ startdate: formattedDate, enddate: formattedDate1 }, () => {
      this.addfamily();
    });
  };

  updatefamily() {
    const myarray = {
      loginDetails:
      {
        LoginEmpID: this.props.user.LoginEmpID,
        LoginEmpCompanyCodeNo: this.props.user.LoginEmpCompanyCodeNo
      },
      infoTypeData:
      {
        CompanyCode: this.props.user.LoginEmpCompanyCodeNo,
        StartDate: this.state.startdate,
        EndDate: this.state.enddate,
        EmpId: this.props.user.LoginEmpID,
        Id: this.state.id,
        IdType: this.state.Relationid,
        IdNumber: this.state.idnumber,
        Action: 'update',
        Nominee1Name: this.state.nominee1Name,
        Nominee1Percentage: this.state.nominee1Per,
        Nominee1Relation: this.state.nominee1Relation,
        Nominee2Name: this.state.nominee1Name,
        Nominee2Percentage: this.state.nominee1Per,
        Nominee2Relation: this.state.nominee1Relation,
        Nominee3Name: this.state.nominee1Name,
        Nominee3Percentage: this.state.nominee1Per,
        Nominee3Relation: this.state.nominee1Relation,
        Nominee4Name: this.state.nominee1Name,
        Nominee4Percentage: this.state.nominee1Per,
        Nominee4Relation: this.state.nominee1Relation,
        Nominee5Name: this.state.nominee1Name,
        Nominee5Percentage: this.state.nominee1Per,
        Nominee5Relation: this.state.nominee1Relation,
      }
    };

    return fetch(`${this.props.user.baseUrl}/MyProfile/InsertUpdateIdentityData`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(myarray),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson) {
          if (responseJson.SuccessList) {
            const str = responseJson.SuccessList[0];
            const res = str.split('#');
            const msg = getMessage(res[0].toString(), this.props.messages);
            this.setState({
              isModalVisible: true,
              modalMessage: msg.message,
              modalType: msg.type,
              loadingApprove: false
            });
          } else if (responseJson.ErrorList) {
            const msg = getMessage(responseJson.ErrorList.toString(), this.props.messages);
            this.setState({
              isModalVisible: true,
              modalMessage: msg.message,
              modalType: msg.type,
              loadingApprove: false
            });
          }
        } else {

        }

        this.setState({ spinner: false, },);
      })
      .catch(() => {
        this.setState({ spinner: false, },);
      });
  }

  addfamily() {
    const myarray = {
      loginDetails:
      {
        LoginEmpID: this.props.user.LoginEmpID,
        LoginEmpCompanyCodeNo: this.props.user.LoginEmpCompanyCodeNo
      },
      infoTypeData:
      {
        CompanyCode: this.props.user.LoginEmpCompanyCodeNo,
        StartDate: this.state.startdate,
        EndDate: this.state.enddate,
        EmpId: this.props.user.LoginEmpID,
        Id: '0',
        IdType: this.state.Relationid,
        IdNumber: this.state.idnumber,
        Action: 'add',
        Nominee1Name: this.state.nominee1Name,
        Nominee1Percentage: this.state.nominee1Per,
        Nominee1Relation: this.state.nominee1Relation,
        Nominee2Name: this.state.nominee1Name,
        Nominee2Percentage: this.state.nominee1Per,
        Nominee2Relation: this.state.nominee1Relation,
        Nominee3Name: this.state.nominee1Name,
        Nominee3Percentage: this.state.nominee1Per,
        Nominee3Relation: this.state.nominee1Relation,
        Nominee4Name: this.state.nominee1Name,
        Nominee4Percentage: this.state.nominee1Per,
        Nominee4Relation: this.state.nominee1Relation,
        Nominee5Name: this.state.nominee1Name,
        Nominee5Percentage: this.state.nominee1Per,
        Nominee5Relation: this.state.nominee1Relation,
      }
    };

    return fetch(`${this.props.user.baseUrl}/MyProfile/InsertUpdateIdentityData`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(myarray),
    })
      .then((response) => response.json())
      .then(async (responseJson) => {
        if (responseJson) {
          if (responseJson.SuccessList) {
            if (this.state.files.length > 0) {
              try {
                const formData = new FormData();
                formData.append('FileName', 'download.png');
                this.state.files.forEach(element => {
                  formData.append('file', element);
                });
                formData.append('idType', '02');
                formData.append('EmpId', this.props.user.LoginEmpID);
                formData.append('loginEmpCompanyCodeNo', this.props.user.LoginEmpCompanyCodeNo);
                const resFile = await saveIdentityAttachments(this.props.user, formData);
                if (responseJson.SuccessList) {
                  const str = responseJson.SuccessList[0];
                  const res = str.split('#');
                  const msg = getMessage(res[0].toString(), this.props.messages);
                  this.setState({
                    isModalVisible: true,
                    modalMessage: msg.message,
                    modalType: msg.type,
                    loadingApprove: false
                  });
                } else {
                  const msg = 'Failed to upload attachment';
                  this.setState({
                    isModalVisible: true,
                    modalMessage: msg,
                    modalType: 'E',
                    loadingApprove: false
                  });
                }
              } catch (error) {
                console.log(error);
                const msg = 'Failed to upload attachment';
                this.setState({
                  isModalVisible: true,
                  modalMessage: msg,
                  modalType: 'E',
                  loadingApprove: false
                });
              }
            } else {
              const str = responseJson.SuccessList[0];
              const res = str.split('#');
              const msg = getMessage(res[0].toString(), this.props.messages);
              this.setState({
                isModalVisible: true,
                modalMessage: msg.message,
                modalType: msg.type,
                loadingApprove: false
              });
            }
          } else if (responseJson.ErrorList) {
            const msg = getMessage(responseJson.ErrorList.toString(), this.props.messages);
            this.setState({
              isModalVisible: true,
              modalMessage: msg.message,
              modalType: msg.type,
              loadingApprove: false
            });
          }
        } else {

        }

        this.setState({ spinner: false, },);
      })
      .catch(() => {
        this.setState({ spinner: false, },);
      });
  }

  uploadAttachment= async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'App need Storage Permission',
            message:
              'App needs access to your Storage ',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          try {
            const results = await DocumentPicker.pickMultiple({
              type: [DocumentPicker.types.allFiles],
            });
            const { files } = this.state;
            if (results) {
              files.push(...results);
              this.setState({ files, isAttachment: true });
            }
          } catch (err) {
            if (DocumentPicker.isCancel(err)) {
              // User cancelled the picker, exit any dialogs or menus and move on
            } else {
              throw err;
            }
          }
        } else {
          console.log('Camera permission denied');
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const results = await DocumentPicker.pickMultiple({
          type: [DocumentPicker.types.allFiles],
        });
        const { files } = this.state;
        if (results) {
          files.push(...results);
          this.setState({ files, isAttachment: true });
        }
      } catch (err) {
        if (DocumentPicker.isCancel(err)) {
          // User cancelled the picker, exit any dialogs or menus and move on
        } else {
          throw err;
        }
      }
    }
  }

  removeFile = index => {
    const { files } = this.state;
    if (files[index].FileType) {
      const delFile = {
        FileName: files[index].FileName,
      };
      this.deletedFiles.push(delFile);
    }
    files.splice(index, 1);
    this.setState({ files });
  }

  onValueChange = async (itemValue) => {
    for (let i = 0; i < this.state.nomineeData.length; i++) {
      if (itemValue == this.state.nomineeData[i].USRTYVal) {
        if (this.state.nomineeData[i].IsNomineeRequired == 1) {
          this.setState({
            IsNomineeRequired: true, counter1: 0, counter2: 0, counter3: 0, counter4: 0, counter5: 0
          });
        } else {
          this.setState({
            IsNomineeRequired: false, counter1: 0, counter2: 0, counter3: 0, counter4: 0, counter5: 0
          });
        }
      }
    }

    if (itemValue !== '0') {
      this.setState({ Relationid: itemValue, contactrequired: false });
    } else {
      this.setState({ Relationid: '', contactrequired: true });
    }
  }

  render() {
    const {
      fromdate, expirydate
    } = this.state;
    return (
      <View style={{ alignItems: 'center', backgroundColor: '#EFF0F1', flex: 1 }}>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
          date={new Date(expirydate)}
        />
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible1}
          onConfirm={this.handleDatePicked1}
          onCancel={this.hideDateTimePicker1}
          date={new Date(fromdate)}
        />
        <MessageModal
          isVisible={this.state.isModalVisible}
          message={this.state.modalMessage}
          type={this.state.modalType}
          hideModal={() => this.setState({ isModalVisible: false })}
          onModalHide={() => this.onModalHide()}
        />
        <View style={{ alignItems: 'center', backgroundColor: '#EFF0F1', flex: 1 }}>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ flexDirection: 'column', alignItems: 'center', flex: 1 }}>

              <View style={{
                width: wp('100%'), height: 60, marginTop: 24, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'
              }}
              >
                <View style={{
                  width: wp('50%'), height: 60, flexDirection: 'column', alignItems: 'center'
                }}
                >
                  <TouchableOpacity activeOpacity={0.9} onPress={this.showDateTimePicker1}>
                    <Card style={styles.cards}>
                      <View style={{
                        width: wp('43%'), height: 55, borderRadius: 5, backgroundColor: '#fff', flexDirection: 'column', justifyContent: 'center'
                      }}
                      >
                        <Text style={{ color: this.props.secondaryColor, marginLeft: 10, fontSize: 11, }}>From Date</Text>
                        {this.state.fromdate === '' ? (
                          <Text style={{ marginLeft: 10, fontSize: 14, color: '#00000050' }}>Select</Text>)
                          : <Text style={{ marginLeft: 10, fontSize: 14, }}>{this.state.fromdate}</Text>}

                      </View>
                    </Card>
                  </TouchableOpacity>
                  <View style={{ width: wp('43%'), alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                    {this.state.fromrequired ? <Text style={styles.requiredMessage}>*Required</Text>
                      : null}
                  </View>
                </View>

                <View style={{
                  width: wp('50%'), height: 60, flexDirection: 'column', alignItems: 'center'
                }}
                >
                  <Card style={styles.cards}>
                    <View style={{
                      width: wp('43%'), height: 55, borderRadius: 5, backgroundColor: '#fff', flexDirection: 'column', justifyContent: 'center',
                    }}
                    >
                      <Text style={{ color: '#00000050', marginLeft: 10, fontSize: 11 }}>Expiry Date</Text>
                      {this.state.expirydate === '' ? (
                        <Text style={{ marginLeft: 10, fontSize: 14, color: '#00000050' }}>Select</Text>)
                        : <Text style={{ marginLeft: 10, fontSize: 14, color: '#00000050' }}>{this.state.expirydate}</Text>}

                    </View>
                  </Card>

                  <View style={{ width: wp('43%'), alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                    {this.state.expiryrequired ? <Text style={styles.requiredMessage}>*Required</Text>
                      : null}
                  </View>
                </View>
              </View>

              <View style={{
                width: wp('100%'), height: 60, marginTop: 24, flexDirection: 'row', alignItems: 'center'
              }}
              >
                <View style={{
                  width: wp('50%'), height: 60, flexDirection: 'column', alignItems: 'center'
                }}
                >
                  {this.state.visible === 'true' ? (
                    <Card style={styles.cards}>
                      <View style={{
                        width: wp('43%'), height: 55, borderRadius: 5, backgroundColor: '#fff', flexDirection: 'column', justifyContent: 'center'
                      }}
                      >
                        <Text style={{ color: this.props.secondaryColor, marginLeft: 10, fontSize: 11, }}>Type of Contact</Text>
                        <Picker
                          style={{ height: 30 }}
                          selectedValue={this.state.Relationid}
                          mode="dropdown"
                          onValueChange={(itemValue) => this.onValueChange(itemValue)}
                        >
                          <Picker.Item label="Select" value="0" />
                          {this.state.dataSource1.map((item, key) => (
                            <Picker.Item label={item.Contact} value={item.Contactid} key={key} />))}
                        </Picker>
                      </View>
                    </Card>
                  ) : (
                    <Card style={styles.cards}>
                      <View style={{
                        width: wp('43%'), height: 55, borderRadius: 5, backgroundColor: '#fff', flexDirection: 'column', justifyContent: 'center'
                      }}
                      >
                        <Text style={{ color: '#00000050', marginLeft: 10, fontSize: 11, }}>Type of Contact</Text>
                        <Text style={{ color: '#00000050', marginLeft: 10, fontSize: 14, }}>{this.state.Typeofcontact}</Text>

                      </View>
                    </Card>
                  )}
                  <View style={{ width: wp('43%'), alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                    {this.state.contactrequired ? <Text style={styles.requiredMessage}>*Required</Text>
                      : null}
                  </View>
                </View>

                <View style={styles.view2}>
                  <Card style={styles.cards}>
                    <View style={styles.view3}>
                      <View style={styles.view4}>
                        <Text style={{
                          color: this.props.secondaryColor, marginLeft: 10, marginTop: 10, marginBottom: 8, height: 50, fontSize: 11,
                        }}
                        >
                          ID/Number
                        </Text>
                        <TextInput
                          style={styles.textStyle2}
                          placeholder="Enter Id"
                          onChangeText={(text) => this.setState({ idnumber: text, idrequired: false })}
                          value={this.state.idnumber}
                        />
                      </View>
                    </View>
                  </Card>
                  <View style={styles.requiredField}>
                    {this.state.contactrequired ? <Text style={styles.requiredMessage}>*Required</Text>
                      : null}
                  </View>
                </View>
              </View>

              {
                this.state.IsNomineeRequired == true
                  ? (
                    <View>
                      <View style={styles.view1}>
                        <View style={styles.view2}>
                          <Card style={styles.cards}>
                            <View style={styles.view3}>
                              <View style={styles.view4}>
                                <Text style={{
                                  color: this.props.secondaryColor, marginLeft: 10, marginTop: 10, marginBottom: 8, height: 50, fontSize: 11,
                                }}
                                >
                                  Nominee1 Name
                                </Text>
                                <TextInput
                                  style={styles.textStyle2}
                                  placeholder="Enter Name"
                                  onChangeText={(text) => this.setState({ nominee1Name: text })}
                                  value={this.state.nominee1Name}
                                />
                              </View>
                            </View>
                          </Card>
                        </View>
                        <View style={styles.view2}>
                          <Card style={styles.cards}>
                            <View style={styles.view3}>
                              <View style={styles.view4}>
                                <Text style={{
                                  color: this.props.secondaryColor, marginLeft: 10, marginTop: 10, marginBottom: 8, height: 50, fontSize: 11,
                                }}
                                >
                                  Nominee1 Relation
                                </Text>
                                <TextInput
                                  style={styles.textStyle2}
                                  placeholder="Enter Relation"
                                  onChangeText={(text) => this.setState({ nominee1Relation: text })}
                                  value={this.state.nominee1Relation}
                                />
                              </View>
                            </View>
                          </Card>
                        </View>
                      </View>

                      <View style={styles.view1}>
                        <View style={styles.view2}>
                          <Card style={styles.cards}>
                            <View style={styles.view3}>
                              <View style={styles.view4}>
                                <Text style={{
                                  color: this.props.secondaryColor, marginLeft: 10, marginTop: 10, marginBottom: 8, height: 50, fontSize: 11,
                                }}
                                >
                                  Nominee1 Percentage
                                </Text>
                                <TextInput
                                  style={styles.textStyle2}
                                  placeholder="Enter Percentage"
                                  onChangeText={(text) => this.setState({ nominee1Per: text, })}
                                  value={this.state.nominee1Per}
                                />
                              </View>
                            </View>
                          </Card>
                        </View>
                        <View style={styles.view2}>
                          <Card style={styles.cards}>
                            <View style={styles.view3}>
                              <View style={styles.view4}>
                                <Text style={{
                                  color: this.props.secondaryColor, marginLeft: 10, marginTop: 10, marginBottom: 8, height: 50, fontSize: 11,
                                }}
                                >
                                  Nominee2 Name
                                </Text>
                                <TextInput
                                  style={styles.textStyle2}
                                  placeholder="Enter Name"
                                  onChangeText={(text) => this.setState({ nominee2Name: text })}
                                  value={this.state.nominee2Name}
                                />
                              </View>
                            </View>
                          </Card>
                        </View>
                      </View>

                      <View style={styles.view1}>
                        <View style={styles.view2}>
                          <Card style={styles.cards}>
                            <View style={styles.view3}>
                              <View style={styles.view4}>
                                <Text style={{
                                  color: this.props.secondaryColor, marginLeft: 10, marginTop: 10, marginBottom: 8, height: 50, fontSize: 11,
                                }}
                                >
                                  Nominee2 Relation
                                </Text>
                                <TextInput
                                  style={styles.textStyle2}
                                  placeholder="Enter Relation"
                                  onChangeText={(text) => this.setState({ nominee2Relation: text })}
                                  value={this.state.nominee2Relation}
                                />
                              </View>
                            </View>
                          </Card>
                        </View>
                        <View style={styles.view2}>
                          <Card style={styles.cards}>
                            <View style={styles.view3}>
                              <View style={styles.view4}>
                                <Text style={{
                                  color: this.props.secondaryColor, marginLeft: 10, marginTop: 10, marginBottom: 8, height: 50, fontSize: 11,
                                }}
                                >
                                  Nominee2 Percentage
                                </Text>
                                <TextInput
                                  style={styles.textStyle2}
                                  placeholder="Enter Percentage"
                                  onChangeText={(text) => this.setState({ nominee2Per: text })}
                                  value={this.state.nominee2Per}
                                />
                              </View>
                            </View>
                          </Card>
                        </View>
                      </View>

                      <View style={styles.view1}>
                        <View style={styles.view2}>
                          <Card style={styles.cards}>
                            <View style={styles.view3}>
                              <View style={styles.view4}>
                                <Text style={{
                                  color: this.props.secondaryColor, marginLeft: 10, marginTop: 10, marginBottom: 8, height: 50, fontSize: 11,
                                }}
                                >
                                  Nominee3 Name
                                </Text>
                                <TextInput
                                  style={styles.textStyle2}
                                  placeholder="Enter Name"
                                  onChangeText={(text) => this.setState({ nominee3Name: text })}
                                  value={this.state.nominee3Name}
                                />
                              </View>
                            </View>
                          </Card>
                        </View>
                        <View style={styles.view2}>
                          <Card style={styles.cards}>
                            <View style={styles.view3}>
                              <View style={styles.view4}>
                                <Text style={{
                                  color: this.props.secondaryColor, marginLeft: 10, marginTop: 10, marginBottom: 8, height: 50, fontSize: 11,
                                }}
                                >
                                  Nominee3 Relation
                                </Text>
                                <TextInput
                                  style={styles.textStyle2}
                                  placeholder="Enter Relation"
                                  onChangeText={(text) => this.setState({ nominee3Relation: text })}
                                  value={this.state.nominee3Relation}
                                />
                              </View>
                            </View>
                          </Card>
                        </View>
                      </View>
                      <View style={styles.view1}>
                        <View style={styles.view2}>
                          <Card style={styles.cards}>
                            <View style={styles.view3}>
                              <View style={styles.view4}>
                                <Text style={{
                                  color: this.props.secondaryColor, marginLeft: 10, marginTop: 10, marginBottom: 8, height: 50, fontSize: 11,
                                }}
                                >
                                  Nominee3 Percentage
                                </Text>
                                <TextInput
                                  style={styles.textStyle2}
                                  placeholder="Enter Percentage"
                                  onChangeText={(text) => this.setState({ nominee3Per: text })}
                                  value={this.state.nominee3Per}
                                />
                              </View>
                            </View>
                          </Card>
                        </View>
                        <View style={styles.view2}>
                          <Card style={styles.cards}>
                            <View style={styles.view3}>
                              <View style={styles.view4}>
                                <Text style={{
                                  color: this.props.secondaryColor, marginLeft: 10, marginTop: 10, marginBottom: 8, height: 50, fontSize: 11,
                                }}
                                >
                                  Nominee4 Name
                                </Text>
                                <TextInput
                                  style={styles.textStyle2}
                                  placeholder="Enter Name"
                                  onChangeText={(text) => this.setState({ nominee4Name: text })}
                                  value={this.state.nominee4Name}
                                />
                              </View>
                            </View>
                          </Card>
                        </View>
                      </View>
                      <View style={styles.view1}>
                        <View style={styles.view2}>
                          <Card style={styles.cards}>
                            <View style={styles.view3}>
                              <View style={styles.view4}>
                                <Text style={{
                                  color: this.props.secondaryColor, marginLeft: 10, marginTop: 10, marginBottom: 8, height: 50, fontSize: 11,
                                }}
                                >
                                  Nominee4 Relation
                                </Text>
                                <TextInput
                                  style={styles.textStyle2}
                                  placeholder="Enter Relation"
                                  onChangeText={(text) => this.setState({ nominee4Relation: text })}
                                  value={this.state.nominee4Relation}
                                />
                              </View>
                            </View>
                          </Card>
                        </View>
                        <View style={styles.view2}>
                          <Card style={styles.cards}>
                            <View style={styles.view3}>
                              <View style={styles.view4}>
                                <Text style={{
                                  color: this.props.secondaryColor, marginLeft: 10, marginTop: 10, marginBottom: 8, height: 50, fontSize: 11,
                                }}
                                >
                                  Nominee4 Percentage
                                </Text>
                                <TextInput
                                  style={styles.textStyle2}
                                  placeholder="Enter Percentage"
                                  onChangeText={(text) => this.setState({ nominee4Per: text })}
                                  value={this.state.nominee4Per}
                                />
                              </View>
                            </View>
                          </Card>
                        </View>
                      </View>
                      <View style={styles.view1}>
                        <View style={styles.view2}>
                          <Card style={styles.cards}>
                            <View style={styles.view3}>
                              <View style={styles.view4}>
                                <Text style={{
                                  color: this.props.secondaryColor, marginLeft: 10, marginTop: 10, marginBottom: 8, height: 50, fontSize: 11,
                                }}
                                >
                                  Nominee5 Name
                                </Text>
                                <TextInput
                                  style={styles.textStyle2}
                                  placeholder="Enter Name"
                                  onChangeText={(text) => this.setState({ nominee5Name: text, })}
                                  value={this.state.nominee5Name}
                                />
                              </View>
                            </View>
                          </Card>
                        </View>
                        <View style={styles.view2}>
                          <Card style={styles.cards}>
                            <View style={styles.view3}>
                              <View style={styles.view4}>
                                <Text style={{
                                  color: this.props.secondaryColor, marginLeft: 10, marginTop: 10, marginBottom: 8, height: 50, fontSize: 11,
                                }}
                                >
                                  Nominee5 Relation
                                </Text>
                                <TextInput
                                  style={styles.textStyle2}
                                  placeholder="Enter Relation"
                                  onChangeText={(text) => this.setState({ nominee5Relation: text })}
                                  value={this.state.nominee5Relation}
                                />
                              </View>
                            </View>
                          </Card>
                        </View>
                      </View>
                      <View style={styles.view1}>
                        <View style={styles.view2}>
                          <Card style={styles.cards}>
                            <View style={styles.view3}>
                              <View style={styles.view4}>
                                <Text style={{
                                  color: this.props.secondaryColor, marginLeft: 10, marginTop: 10, marginBottom: 8, height: 50, fontSize: 11,
                                }}
                                >
                                  Nominee5 Percentage
                                </Text>
                                <TextInput
                                  style={styles.textStyle2}
                                  placeholder="Enter Percentage"
                                  onChangeText={(text) => this.setState({ nominee5Per: text })}
                                  value={this.state.nominee5Per}
                                />
                              </View>
                            </View>
                          </Card>
                        </View>
                      </View>
                    </View>
                  )
                  : null
              }

              <View style={styles.attachmentView}>
                <Text style={{ color: 'black', }}>Upload Attachment</Text>
                <View flexDirection="row" marginTop={10}>
                  <TouchableOpacity onPress={() => this.uploadAttachment()}>
                    <Image style={{ height: 50, width: 50 }} source={require('../assets/images/ic_attachment.png')} />
                  </TouchableOpacity>

                  <FlatList
                    data={this.state.files}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ alignItems: 'center' }}
                    style={{ flex: 1 }}
                    renderItem={({ item, index }) => (
                      <FileItem item={item} isEditing={this.item} onPress={() => this.removeFile(index)} />
                    )}
                    keyExtractor={item => item.id}
                  />
                </View>
                {/* {isAttachment ? null
                  : <Text style={styles.requiredMessage}>*Required</Text>} */}
              </View>

              {this.state.visible === 'true' ? (
                <Button
                  loading={this.state.spinner}
                  disabled={this.state.spinner}
                  contentStyle={{ height: 45, }}
                  icon="arrow-right-bold-box"
                  style={styles.button}
                  color={this.props.primaryColor}
                  labelStyle={{ color: 'white', fontSize: 15, textAlign: 'center' }}
                  mode="contained"
                  uppercase={false}
                  onPress={() => this.validate()}
                >
                  ADD
                </Button>
              ) : (
                <Button
                  loading={this.state.spinner}
                  disabled={this.state.spinner}
                  contentStyle={{ height: 45 }}
                  icon="arrow-right-bold-box"
                  style={styles.button}
                  color={this.props.primaryColor}
                  labelStyle={{ color: 'white', fontSize: 15, textAlign: 'center' }}
                  mode="contained"
                  uppercase={false}
                  onPress={() => this.validate()}
                >
                  UPDATE
                </Button>
              )}
            </View>
          </ScrollView>
        </View>

      </View>

    );
  }
}

const styles = StyleSheet.create({
  ImageStyle1: {
    width: 20,
    height: 25,
    marginLeft: 10,
  },
  attachmentView: {
    flexDirection: 'column',
    paddingHorizontal: 10,
    marginTop: 15,
    justifyContent: 'center',
    width: '100%'
  },
  textStyle1: {
    color: '#000',
    fontSize: 20,
    justifyContent: 'center',
  },
  textStyle2: {
    marginLeft: 5,
    fontSize: 14,
    width: 150,
    height: 100,
    position: 'absolute'
  },
  button: {
    width: '94%',
    height: 45,
    borderRadius: 12,
    zIndex: 5,
    marginBottom: 60,
    marginTop: 20
  },
  activityIndicator: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cards: {
    elevation: 3,
    borderRadius: 5,
  },
  requiredField: {
    width: wp('43%'),
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },
  requiredMessage: {
    color: 'red',
    textAlign: 'right',
    paddingEnd: 5
  },
  view1: {
    width: wp('100%'),
    height: 60,
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'center'

  },
  view2: {
    width: wp('50%'),
    height: 60,
    flexDirection: 'column',
    alignItems: 'center'
  },
  view3: {
    width: wp('43%'),
    height: 55,
    borderRadius: 5,
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  view4: {
    width: wp('43%'),
    marginTop: 13,
    height: 45,
    borderRadius: 5,
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'center'
  }

});
const mapStateToProps = state => ({
  primaryColor: state.theme.primaryColor,
  secondaryColor: state.theme.secondaryColor,
  user: state.user.user,
  isLoggedIn: state.user.isLoggedIn,
  messages: state.messageData.messages,
});

export default connect(
  mapStateToProps,
)(App);
