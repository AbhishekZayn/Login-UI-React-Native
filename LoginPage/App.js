import React, { Component } from "react";
import {
  AppRegistry,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Text,
  StyleSheet
} from "react-native";
import * as yup from "yup";
import { Formik } from "formik";

export default class App extends Component {
  constructor() {
    super();

    this.state = { hidePassword: true };
  }

  setPasswordVisibility = () => {
    this.setState({ hidePassword: !this.state.hidePassword });
  };

  render() {
    const inputStyle = {
      borderRadius: 5,
      borderWidth: 1,
      borderColor: "#4e4e4e",
      padding: 10,
      marginTop: 15
    };


    return (
      <Formik
        initialValues={{
          Student_UID: "",
          password: ""
        }}
        onSubmit={(values) => Alert.alert(JSON.stringify(values))}
        validationSchema={yup.object().shape({
          Student_UID: yup.string().email().required(),
          password: yup
            .string()
            .min(4, "Password should be of atleast 4 chars.")
            .required()
        })}
      >
        {({
          values,
          handleChange,
          errors,
          setFieldTouched,
          touched,
          isValid,
          handleSubmit
        }) => (
          <View style={styles.container}>
            <View style={styles.textBoxContainer}>
              <Text style={{ fontSize: 30, fontWeight: "bold"}}>Login</Text>
              <Text style={{ marginBottom: 20, fontSize: 16, color: "grey" }}>
                Please enter your credentials to login
              </Text>

              <TextInput
                value={values.Student_UID}
                style={inputStyle}
                onChangeText={handleChange("Student_UID")}
                onBlur={() => setFieldTouched("Student_UID")}
                placeholder="Student UID"
              />
              {touched.Student_UID && errors.Student_UID && (
                <Text style={{ fontSize: 10, color: "#FF0D10" }}>
                  {errors.Student_UID}
                </Text>
              )}
              <TextInput
                underlineColorAndroid="transparent"
                secureTextEntry={this.state.hidePassword}
                value={values.password}
                style={styles.textBox}
                onChangeText={handleChange('password')}
                placeholder="Password"
                onBlur={() => setFieldTouched('password')}
              />
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.touachableButton}
                onPress={this.setPasswordVisibility}
              >
                <Image
                  source={
                    this.state.hidePassword
                      ? require("./images/hide.png")
                      : require("./images/view.png")
                  }
                  style={styles.buttonImage}
                />
              </TouchableOpacity>
              {touched.password && errors.password && (
                <Text style={{ fontSize: 10, color: "#FF0D10" }}>
                  {errors.password}
                </Text>
              )}
              <TouchableOpacity
                style={{
                  marginTop: 30,
                  backgroundColor: "#6061e2",
                  borderWidth: 1,
                  borderRadius: 5,
                  width: "100%",
                  height: 50,
                  fontSize: 30,
                  textAlign: "left",
                  justifyContent: "center",
                  alignSelf: "center",
                  alignContent: "center",
                  alignItems: "center"
                }}
              >
              <Text style={{ color: "white", fontSize: 18 }}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ marginLeft: 262, marginTop: 10 }}>
                <Text>Forgot password?</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:20,
    marginTop:100
  },
  headerText: {
    fontSize: 25,
    textAlign: "center",
    margin: 10,
    color: 'black',
    fontWeight: "bold"
  },
 
  textBox: {
    fontSize: 15,
    alignSelf: 'stretch',
    height: 45,
    paddingRight: 45,
    paddingLeft: 8,
    borderWidth: 1,
    paddingVertical: 0,
    borderColor: 'black',
    borderRadius: 5,
    marginTop: 25
  },
  touachableButton: {
    position: "absolute",
    right: 3,
    height: 30,
    marginTop:185,
    width: 50,
    padding: 2
  },
  buttonImage: {
    resizeMode: "contain",
    height: "100%",
    width: "100%"
  }
});
