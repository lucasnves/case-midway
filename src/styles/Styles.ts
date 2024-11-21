import { StyleSheet } from "react-native";
import { Colors } from "./Colors";

export default StyleSheet.create({
  CardShadow: {
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardPadding: {
    paddingVertical: 12,
    paddingLeft: 16,
    borderRadius: 10,
    marginBottom: 20,
  },
  backCloseButton: {
    height: 32,
    width: 32,
    backgroundColor: "#E5FFFE",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  }
});
