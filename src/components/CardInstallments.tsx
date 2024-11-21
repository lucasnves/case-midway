import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../styles/Colors";
import Styles from "../styles/Styles";
import ButtonSelect from "./ButtonSelect";

type Props = {
  installment: number;
  amount: number;
  onPress?: () => void;
  isSelected: boolean;
};

export default function CardInstallments({
  installment,
  amount,
  onPress,
  isSelected = false,
}: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[Styles.CardShadow, Styles.cardPadding, { marginHorizontal: 16}]}
      onPress={onPress}
    >
      <View style={styles.row}>
        <ButtonSelect size={24} isSelected={isSelected} />

        <Text style={styles.title}>
        {installment} x de R$ {amount.toFixed(2).replace(".", ",")}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  title: {
    color: Colors.primary,
    fontSize: 18,
    fontWeight: "700",
  },
});
