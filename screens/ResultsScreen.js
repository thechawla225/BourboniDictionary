import React, { useState } from "react";
import { StyleSheet, FlatList, View } from "react-native";
import styled, { ThemeProvider } from "styled-components";
import { useSelector } from "react-redux";
import { useFonts } from "expo-font";
import { Appbar, TextInput, Snackbar, Provider } from "react-native-paper";
import { StackActions } from "@react-navigation/native";

const popAction = StackActions.pop(1);

export function ResultsScreen({ route, navigation }) {
  const { DATA } = route.params;
  const theme = useSelector((state) => state.themeReducer.theme);
  const isLight = theme.mode === "light";
  const Item = ({ title }) => (
    <View style={style.item}>
      <Text style={style.title}>{title}</Text>
      <View
        style={{
          marginTop: 20,
          borderBottomColor: isLight ? "black" : "white",
          borderBottomWidth: 1,
        }}
      />
    </View>
  );
  const renderItem = ({ item }) => <Item title={item.title} />;

  const [fontLoaded] = useFonts({
    Proximanova: require("../assets/fonts/Proxima-Nova-Regular.ttf"),
  });
  if (!fontLoaded) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <Appbar style={isLight ? style.appBarLight : style.appBarDark}>
        <Appbar.Action
          icon="arrow-left-thick"
          size={35}
          onPress={() => navigation.dispatch(popAction)}
        />
      </Appbar>
      <SafeAreaView>
        <FlatList data={DATA} renderItem={renderItem} />
      </SafeAreaView>
    </ThemeProvider>
  );
}
const style = StyleSheet.create({
  item: {
    padding: 10,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 17,
    fontFamily: "Proximanova",
  },
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

  safeArea: {
    height: "90%",
    justifyContent: "center", //Centered horizontally
    alignItems: "center",
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
