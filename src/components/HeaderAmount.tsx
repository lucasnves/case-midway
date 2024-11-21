import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "./Icon";

type IconData = { icon: any; icon_name: string };
type Props = { amount: number };

const icons: IconData[] = [
  { icon: "Feather", icon_name: "headphones" },
  { icon: "Ionicons", icon_name: "notifications-outline" },
  { icon: "Feather", icon_name: "user" },
];

export default function HeaderAmount({ amount = 0 }: Props) {
  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <View style={styles.containerHeader}>
      <SafeAreaView style={styles.header}>
        <Image
          source={require("@/src/assets/images/logo-midway.png")}
          resizeMode="contain"
          style={styles.logo}
        />
        <View style={styles.headerIcons}>
          {icons.map((icon, index) => (
            <Icon
              key={index}
              icon={icon.icon}
              icon_name={icon.icon_name}
              color="#fff"
              size={22}
            />
          ))}
        </View>
      </SafeAreaView>

      <View style={styles.headerAmount}>
        <View style={styles.containerAmount}>
          <Text style={styles.textAmount}>
            {isVisible
              ? `R$ ${amount.toFixed(2).replace(".", ",")}`
              : "R$ " + "*".repeat(amount.toString().length)}
          </Text>
          <TouchableOpacity onPress={toggleVisibility}>
            <Icon
              icon="Feather"
              icon_name={isVisible ? "eye-off" : "eye"}
              color="#fff"
              size={20}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.extractButton}>
          <TouchableOpacity>
            <Text style={styles.textExtract}>Extrato</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerHeader: {
    backgroundColor: "#01716D",
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  header: {
    marginTop: 55,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  logo: {
    width: 120,
    height: 40,
  },
  headerIcons: {
    flexDirection: "row",
    gap: 20,
  },
  headerAmount: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  containerAmount: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  extractButton: {
    backgroundColor: "#004C48",
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
  },
  textAmount: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "800",
  },
  textExtract: {
    color: "#fff",
    fontSize: 16,
  },
});
