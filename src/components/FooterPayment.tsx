import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../styles/Colors";

type Props = {
  totalToPay: string;
  label: string;
  isSelected: boolean;
  onPress?: (amount: string) => void;
  closeModal?: () => void;
  onPressToPay?: () => void;
};

export default function FooterPayment({
  totalToPay,
  label,
  isSelected,
  onPress,
  closeModal,
  onPressToPay,
}: Props) {
  return (
    <View
      style={[styles.footer, { paddingBottom: Platform.OS == "ios" ? 40 : 10 }]}
    >
      <View style={styles.footerText}>
        <Text style={styles.footerLabel}>Valor a ser pago</Text>
        <Text style={styles.footerPrice}>{totalToPay}</Text>
      </View>

      <TouchableOpacity
        style={[
          styles.payButton,
          { backgroundColor: isSelected ? Colors.primary : Colors.disable },
        ]}
        activeOpacity={0.7}
        disabled={isSelected ? false : true}
        onPress={() => {
          if (onPress && closeModal) {
            onPress(totalToPay);
            closeModal();
          }
          onPressToPay && onPressToPay();
        }}
      >
        <Text style={{ color: Colors.white }}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: Colors.white,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  footerText: {
    gap: 4,
  },
  footerLabel: {
    fontSize: 16,
  },
  footerPrice: {
    fontSize: 18,
    fontWeight: "700",
  },
  payButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
});
