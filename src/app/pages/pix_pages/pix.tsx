import CardPaymentMethod from "@/src/components/CardPaymentMethod";
import Icon from "@/src/components/Icon";
import { Colors } from "@/src/styles/Colors";
import Styles from "@/src/styles/Styles";
import {
  fetchCreditCards,
  getAcountInfo,
  getPayment,
} from "@/src/services/api";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import FooterPayment from "@/src/components/FooterPayment";
import { SafeAreaView } from "react-native-safe-area-context";
import { Account, Card, Payment } from "@/src/interfaces/interfaces";

export default function Pix() {
  const [creditCards, setCreditCards] = useState<Card[]>();
  const [selectedCard, setSelectedCard] = useState<Card>();
  const [loading, setLoading] = useState<boolean>(true);
  const [acountInfo, setAcountInfo] = useState<Account>();
  const [paymentInfo, setPaymentInfo] = useState<Payment>();
  const [totalToPay, setTotalToPay] = useState<string>();
  const [totalToPayDefault, setTotalToPayDefault] = useState<string>();
  const [installmentSelect, setInstallmentSelect] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [account, payment] = await Promise.all([
          getAcountInfo(),
          getPayment(),
        ]);
        setAcountInfo(account);
        setPaymentInfo(payment);
        const totalPay = `R$ ${payment.amount.toFixed(2).replace(".", ",")}`;
        setTotalToPay(totalPay);
        setTotalToPayDefault(totalPay);

        const cards = await fetchCreditCards();
        setCreditCards(cards);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePaymentTotal = (total: string) => {
    setTotalToPay(total);
  };

  const handleCardSelection = (card: any) => {
    setInstallmentSelect(false);
    setSelectedCard((prevSelectedCard) => {
      if (prevSelectedCard === card) {
        setTotalToPay(totalToPayDefault);
        return null;
      } else {
        return card;
      }
    });
  };

  const handlePay = () => {
    const isAccountMidway = selectedCard == acountInfo?.accountId;
    router.push(
      `../pages/pixConfirmation?transactionId=${paymentInfo?.transactionId}&midway=${isAccountMidway}`
    );
  };

  return (
    <View style={styles.flex}>
      <SafeAreaView style={styles.flex}>
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity
            style={[Styles.backCloseButton, { paddingLeft: 7 }]}
            onPress={() => router.back()}
          >
            <Icon
              icon={"MaterialIcons"}
              icon_name={"arrow-back-ios"}
              size={20}
              color={Colors.primary}
            />
          </TouchableOpacity>

          <View style={styles.labels}>
            <Text style={styles.textTitle}>Transferência Pix</Text>
            <Text style={styles.textSubtitle}>
              Escolha uma forma de pagamento
            </Text>
            <Text style={styles.textSubtitle}>Conta Midway</Text>
          </View>

          <CardPaymentMethod
            isMidway={true}
            paymentMethodName={"Saldo em conta"}
            description={`Disponível: R$ ${acountInfo?.balance
              .toFixed(2)
              .replace(".", ",")}`}
            onPress={() => {
              handleCardSelection(acountInfo?.accountId);
              setInstallmentSelect(true);
            }}
            isSelected={selectedCard === acountInfo?.accountId}
          />

          <Text style={styles.creditCards}>Cartões de crédito</Text>

          {loading ? (
            <ActivityIndicator size="large" color={Colors.primary} />
          ) : creditCards && creditCards.length > 0 ? (
            creditCards.map((card: any) => (
              <CardPaymentMethod
                key={card.cardId}
                paymentMethodName={card.brand}
                description={`Final ${card.cardNumber.slice(-7)}`}
                onPress={() => handleCardSelection(card.cardId)}
                isSelected={selectedCard === card.cardId}
                amountToPay={totalToPay}
                handlePaymentTotal={handlePaymentTotal}
                setInstallmentSelect={setInstallmentSelect}
              />
            ))
          ) : (
            <Text style={styles.noCreditCards}>Sem cartão disponível</Text>
          )}
        </ScrollView>
      </SafeAreaView>

      <FooterPayment
        totalToPay={totalToPay ?? ""}
        label="Pagar"
        isSelected={!!selectedCard && installmentSelect}
        onPressToPay={handlePay}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  labels: {
    marginTop: 30,
    gap: 35,
    marginBottom: 20,
  },
  textTitle: {
    fontSize: 24,
    fontWeight: "600",
  },
  textSubtitle: {
    fontSize: 18,
    fontWeight: "500",
  },
  creditCards: {
    fontSize: 20,
    textAlign: "center",
    margin: 20,
    marginBottom: 40,
    fontWeight: "600",
  },
  noCreditCards: {
    textAlign: "center",
    fontSize: 18,
  },
});
