import React from "react";
import { StyleSheet, View } from "react-native";
import { Colors } from "../styles/Colors";

type Props = {
  size?: number;
  isSelected: boolean;
};

export default function ButtonSelect({ size = 32, isSelected }: Props) {
  return (
    <View style={[styles.circle, { height: size, width: size }]}>
      <View
        style={[
          styles.innerCircle,
          {
            height: size - 10,
            width: size - 10,
            backgroundColor: isSelected ? Colors.primary : "transparent",
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    borderWidth: 2,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderColor: Colors.primary,
  },
  innerCircle: {
    borderRadius: 12,
  },
});
