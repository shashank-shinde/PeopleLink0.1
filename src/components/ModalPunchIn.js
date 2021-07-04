/* eslint-disable max-len */
/* eslint-disable radix */
import React, { Component } from 'react';
import {
  View, StyleSheet, Dimensions, Text, Image, TextInput,
} from 'react-native';
import { Button } from 'react-native-paper';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
const displayWidth = Dimensions.get('window').width;
const contantPadding = 30;
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  modal: {
    alignSelf: 'center',
    alignItems: 'center',
    height: 100,
    justifyContent: 'center'
  },
  container: {
    width: width - 40,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  linearGradient: {
    // flex: 1,
    height: 50,
    width: 350,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },
  img: {
    width: displayWidth - 4 * contantPadding,
    height: (displayWidth - 10 * contantPadding) / 1.86,
    marginBottom: 10
  },
  image: {
    height: 250,
    width: 300,
  },
  text: {
    textAlign: 'center',
    fontSize: 22,
    marginTop: 20,
    padding: 10,
  },
  button: {
    width: '80%',
    height: 45,
    borderRadius: 12,
    margin: 20,
  },

});

class ModalPunchIn extends Component {
  state = {
    birthdayWish: 'Happy Birthday!',
    loading: false
  };

  render() {
    return (
      <Modal
        style={styles.modal}
        isVisible={this.props.isVisible}
        onBackdropPress={this.props.hideModal}
        onBackButtonPress={this.props.hideModal}
      >
        {this.props.birthdayModal == false ?
          <View style={styles.container}>
            <Button contentStyle={{ height: 45, }} style={[styles.button, { backgroundColor: this.props.primaryColor }]} labelStyle={{ color: 'white', fontSize: 16 }} mode="contained" uppercase={false} onPress={this.props.onPressPunchIn}>
              Punch-In
            </Button>

            <Button contentStyle={{ height: 45, }} style={[styles.button, { backgroundColor: this.props.secondaryColor }]} labelStyle={{ color: 'white', fontSize: 16 }} mode="contained" uppercase={false} onPress={this.props.onCancelPunch}>
              No Thanks!
            </Button>
          </View>
          :
          <View style={[styles.container, { padding: 0 }]}>
            <LinearGradient
              start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }}
              locations={[0, 0.5, 0.6]}
              colors={['#8f85f2', '#7467ef']}
              style={styles.container}>
              <Image
                resizeMode={'contain'}
                style={styles.image}
                source={require('../assets/images/birthday-wishes.png')} />
              <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
                {`${this.props.birthdayData.EmpName} ( ${this.props.birthdayData.DOB} )`}
              </Text>
              <View style={{ marginBottom: 5, height: 80, width: '100%', backgroundColor: 'white', borderWidth: .3, borderRadius: 5, padding: 2, marginHorizontal: 5, marginTop: 10 }}>
                <TextInput
                  style={{ fontSize: 14, fontWeight: 'bold' }}
                  multiline={true}
                  value={this.state.birthdayWish}
                  onChangeText={(value) => {
                    this.setState({ birthdayWish: value })
                  }}
                />
              </View>
              <Button contentStyle={{ height: 45, }} loading={this.props.loading} style={[styles.button, { backgroundColor: '#1a08c7' }]} labelStyle={{ color: 'white', fontSize: 16 }} mode="contained"
               onPress={this.props.onSendBirthdayWish}
                >
                SEND
              </Button>
            </LinearGradient>
          </View>
        }
      </Modal>

    );
  }
}

const mapStateToProps = state => ({
  primaryColor: state.theme.primaryColor,
  secondaryColor: state.theme.secondaryColor,
  isPunched: state.user.isPunched,
  isPunchSkip: state.user.isPunchSkip,
  isPunchOut: state.user.isPunchOut,
});

export default connect(
  mapStateToProps
)(ModalPunchIn);
