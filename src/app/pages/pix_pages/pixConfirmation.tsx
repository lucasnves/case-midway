import Icon from "@/src/components/Icon";
import { Payment } from "@/src/interfaces/interfaces";
import { getPaymentByTransactionId, processPix } from "@/src/services/api";
import { Colors } from "@/src/styles/Colors";
import Styles from "@/src/styles/Styles";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const TextInfo = ({ title, info }: { title: string; info: string }) => (
  <View style={styles.textInfoContent}>
    <Text style={styles.InfoContentTitle}>{title}</Text>
    <Text style={styles.InfoContentText}>{info}</Text>
  </View>
);

const LoadingConfirmation = () => (
  <View style={styles.loadingContainer}>
    <View style={styles.largeActivityIndicator}>
      <ActivityIndicator size="large" color={"#E5FFFE"} />
    </View>
    <Text style={styles.loadingText}>Processando sua transferência</Text>
  </View>
);

export default function PixConfirmation() {
  const { transactionId, midway } = useLocalSearchParams();

  const [date, setDate] = useState<string>();
  const [infoPix, setInfoPix] = useState<Payment>();
  const [isPixProcessed, setIsPixProcessed] = useState<boolean>(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentDate = new Date();
    setDate(String(currentDate.toLocaleDateString("pt-BR")));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const account = await getPaymentByTransactionId(String(transactionId));
        if (account) {
          if(midway == "true") {
            const processPixs = await processPix(account.amount);
            setIsPixProcessed(processPixs);
          }
          setInfoPix(account);
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <LoadingConfirmation />;
  }

  return (
    <SafeAreaView style={styles.flex}>
      <View style={styles.close}>
        <TouchableOpacity
          onPress={() => router.replace("/")}
          style={Styles.backCloseButton}
        >
          <Icon
            icon={"Ionicons"}
            icon_name={"close"}
            size={24}
            color={Colors.primary}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>{isPixProcessed ? 'Pix realizado com sucesso!' : 'Falha ao realizar o Pix.'}</Text>

      <View style={styles.pixContainer}>
        <View style={[styles.backgroundIcon, { backgroundColor: !isPixProcessed ? '#ff3d28' : Colors.primary }]}>
          <Icon
            icon={"Octicons"}
            icon_name={isPixProcessed ? "check-circle" : "x-circle"}
            size={55}
            color={Colors.white}
          />
        </View>
        <View style={{alignItems: 'center'}}>
          <Text style={{ fontSize: 18 }}>Para</Text>
          <Text style={styles.pixName}>{infoPix?.receiver.name}</Text>
        </View>
        <View style={styles.textInfoContainer}>
          <TextInfo title={"Valor"} info={`R$ ${infoPix?.amount.toFixed(2).replace('.', ',')}`} />
          <TextInfo title={"Data"} info={date ?? ""} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    marginHorizontal: 16,
  },
  close: {
    alignItems: "flex-end",
    marginBottom: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
  },
  pixContainer: {
    marginTop: 90,
    alignItems: "center",
    gap: 16,
  },
  backgroundIcon: {
    width: 96,
    height: 96,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  pixName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  textInfoContainer: {
    gap: 16,
    flexDirection: "row",
  },
  textInfoContent: {
    alignItems: "center",
  },
  InfoContentTitle: {
    fontSize: 18,
  },
  InfoContentText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: Colors.primary,
    gap: 20,
  },
  largeActivityIndicator: {
    width: 200,
    paddingBottom: 20,
    justifyContent: "center",
    transform: [{ scale: 2 }],
  },
  loadingText: {
    color: Colors.white,
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
});
