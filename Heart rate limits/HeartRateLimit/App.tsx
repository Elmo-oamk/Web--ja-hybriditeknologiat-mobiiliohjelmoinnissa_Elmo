import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function App() {
  const [age, setAge] = useState<string>("")
  const ageAsNumber: number = !isNaN(Number(age)) === true ? Number(age) :0
  const lowerlimit = (220 - ageAsNumber) * 0.65
  const upperlimit = (220 - ageAsNumber) * 0.85

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Heart Rate Calculator</Text>
      <TextInput
        placeholder="Enter your age"
        keyboardType="numeric"
        value={age}
        onChangeText={ setAge}
      />
      <Text style={styles.text}>Lower Limit: {lowerlimit.toFixed(2)}</Text>
      <Text style={styles.text}>Upper Limit: {upperlimit.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16
  },
  heading: {
    fontSize: 24,
    marginTop: 32,
    marginBottom: 16
  },
  text: {
    marginVertical: 16
  }
});