import React, { useState } from "react";
import { View, StyleSheet, StatusBar, ActivityIndicator } from "react-native";
import styled, { ThemeProvider } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { switchTheme } from "../redux/themeActions";
import { lightTheme, darkTheme } from "../Theme";
import { useFonts } from "expo-font";
import { Appbar, TextInput, Snackbar } from "react-native-paper";
import axios from "axios";

export default function HomeScreen() {
  const [text, setText] = useState(""); // Use to save text in local storage for recent searches
  const [isApiLoading, setLoader] = useState(false); // Use to show loader for api
  const [visible, setVisible] = React.useState(false); // set Visibility for snackbar
  const theme = useSelector((state) => state.themeReducer.theme);
  const dispatch = useDispatch();
  const onDismissSnackBar = () => setVisible(false);
  const isLight = theme.mode === "light";
  const moonIcon = "moon-waning-crescent";
  const sunIcon = "white-balance-sunny";

  let callApi = (inputText) => {
    const options = "RapidApi Info";

    // call api
    axios
      .request(options)
      .then(function (response) {
        console.log(response.data["list"][0]["definition"]);
        setLoader(false);
      })
      .catch(function (error) {
        setLoader(false);
        setVisible(!visible);
      });
  };
  const [fontLoaded] = useFonts({
    Proximanova: require("../assets/fonts/Proxima-Nova-Bold.otf"),
  });
  if (!fontLoaded) {
    return null;
  }
  return (
    <ThemeProvider theme={theme}>
      <StatusBar barStyle={theme.STATUS_BAR_STYLE}></StatusBar>
      <Appbar style={isLight ? style.appBarLight : style.appBarDark}>
        <Appbar.Action
          icon="github"
          size={35}
          onPress={() => console.log("GitHub")}
        />
        <Appbar.Action
          style={style.themeButton}
          icon={isLight ? moonIcon : sunIcon}
          size={30}
          color={isLight ? "#212121" : "white"}
          onPress={() =>
            isLight
              ? dispatch(switchTheme(darkTheme))
              : dispatch(switchTheme(lightTheme))
          }
        />
      </Appbar>
      <SafeAreaView style={style.safeArea}>
        <Snackbar
          visible={visible}
          duration={3000}
          onDismiss={onDismissSnackBar}
          style={{
            backgroundColor: isLight ? "black" : "white",
          }}
        >
          <Text style={{ color: isLight ? "white" : "black" }}>
            Sorry, we couldn't find that
          </Text>
        </Snackbar>
        <Text style={style.titleText}>Bourbon Dictionary</Text>
        <View style={style.textInputView}>
          <TextInput
            style={style.textInput}
            onSubmitEditing={(event) => {
              let myText = event.nativeEvent.text;
              setLoader(true);
              callApi(myText);
            }}
            defaultValue={text}
          />
        </View>
        {isApiLoading ? (
          <ActivityIndicator
            color={isLight ? "black" : "white"}
            size="large"
          ></ActivityIndicator>
        ) : (
          <Text></Text>
        )}
      </SafeAreaView>
    </ThemeProvider>
  );
}

const radius = 20; // Radius of the text input field

const style = StyleSheet.create({
  appBarLight: {
    backgroundColor: "white",
    textAlign: "center",
    elevation: 0,
  },
  appBarDark: {
    backgroundColor: "#212121",
    textAlign: "center",
    elevation: 0,
  },
  themeButton: {
    position: "absolute",
    right: 0,
  },
  safeArea: {
    height: "90%",
    justifyContent: "center", //Centered horizontally
    alignItems: "center",
  },
  titleText: {
    fontFamily: "Proximanova",
    fontSize: 25,
    textAlign: "center",
    justifyContent: "center", //Centered horizontally
    alignItems: "center",
  },
  textInputView: {
    justifyContent: "center", //Centered horizontally
    alignItems: "center",
    height: 80,
    width: "100%",
  },
  textInput: {
    height: 20,
    width: "70%",
    padding: 15,
    overflow: "hidden",
    borderColor: "black",
    borderTopLeftRadius: radius, //Top Left Corner
    borderTopRightRadius: radius, // Top Right Corner
    borderBottomLeftRadius: radius, // Bottom Left Corner
    borderBottomRightRadius: radius,
  },
});

const Text = styled.Text`
  color: ${(props) => props.theme.PRIMARY_TEXT_COLOR};
`;

const SafeAreaView = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props) => props.theme.PRIMARY_BACKGROUND_COLOR};
  align-items: center;
  justify-content: center;
`;

const TextContainer = styled.View`
  border: 1px solid ${(props) => props.theme.PRIMARY_TEXT_COLOR};
  padding: 30px;
  border-radius: 6px;
`;

const ButtonText = styled.Text`
  font-size: 15px;
  font-weight: 500;
  color: #ffffff;
`;

const Button = styled.TouchableOpacity`
  margin: 32px 0;
  background-color: #23a8d9;
  padding: 16px 32px;
  border-radius: 6px;
`;
