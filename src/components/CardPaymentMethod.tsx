import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Colors } from "../styles/Colors";
import Icon from "./Icon";
import Styles from "../styles/Styles";
import CardInstallments from "./CardInstallments";
import { getSimulations } from "../services/api";
import ButtonSelect from "./ButtonSelect";
import FooterPayment from "./FooterPayment";
import { Simulation } from "../interfaces/interfaces";

type Props = {
  isMidway?: boolean;
  paymentMethodName: string;
  description?: string;
  onPress?: () => void;
  isSelected?: boolean;
  amountToPay?: string;
  totalToPayDefault?: string;
  handlePaymentTotal?: (amount: string) => void;
  setInstallmentSelect?: (select: boolean) => void;
};

const getPaymentImage = (paymentMethodName: string) => {
  switch (paymentMethodName) {
    case "Visa":
      return require("../assets/images/payment-methods/visa.png");
    case "Master":
      return require("../assets/images/payment-methods/mastercard.png");
  }
};

function PaymentModal({
  visible,
  onClose,
  selectedInstallment,
  onSelectInstallment,
  amountToPay,
  handlePaymentTotal,
  continueModal,
  setInstallmentSelect,
}: {
  visible: boolean;
  onClose: () => void;
  selectedInstallment: Simulation | undefined;
  onSelectInstallment: (simulation: Simulation) => void;
  amountToPay: string;
  handlePaymentTotal: (amount: string) => void;
  continueModal: () => void;
  setInstallmentSelect?: (select: boolean) => void;
}) {
  const [simulationsInstallment, setSimulationsInstallment] =
    useState<Simulation[]>();

  useEffect(() => {
    getSimulations().then((simulations) => {
      setSimulationsInstallment(simulations);
    });
  }, []);
  
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalContentBody}>
            <View style={styles.modalContentHeader}>
              <Text style={styles.modalTitle}>Parcelas do pagamento</Text>
              <TouchableOpacity
                onPress={onClose}
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
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.modalLabel}>
                O destinatário receberá à vista e você pagará parcelado.
              </Text>
              {simulationsInstallment?.map((simulation, index) => (
                <CardInstallments
                  key={index}
                  installment={simulation.installments}
                  amount={simulation.installmentAmount}
                  isSelected={
                    selectedInstallment?.installments ===
                    simulation.installments
                  }
                  onPress={() => {
                    onSelectInstallment(simulation);
                    setInstallmentSelect && setInstallmentSelect(true);
                  }}
                />
              ))}
            </ScrollView>
          </View>
          <FooterPayment
            totalToPay={
              selectedInstallment
                ? `${
                    selectedInstallment?.installments
                  }x de R$ ${selectedInstallment?.installmentAmount
                    .toFixed(2)
                    .replace(".", ",")}`
                : amountToPay
            }
            label="Continuar"
            isSelected={!!selectedInstallment}
            onPress={handlePaymentTotal}
            closeModal={continueModal}
          />
        </View>
      </View>
    </Modal>
  );
}

const InfoInstallments = ({ title, info }: { title: string; info: string }) => (
  <View style={styles.infoInstallmentsContent}>
    <Text style={styles.infoInstallmentsTitle}>{title}</Text>
    <Text style={styles.infoInstallmentsInfo}>{info}</Text>
  </View>
);

export default function CardPaymentMethod({
  isMidway = false,
  paymentMethodName,
  description,
  onPress,
  isSelected = false,
  amountToPay,
  handlePaymentTotal,
  setInstallmentSelect,
}: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedInstallment, setSelectedInstallment] = useState<Simulation>();

  const toggleModal = useCallback((visible: boolean) => {
    setModalVisible(visible);
    if (!visible) setSelectedInstallment(undefined);
  }, []);

  const continueModal = () => {
    setModalVisible(!modalVisible);
  };

  const calculateFee = (amount: number, fees: any) => {
    return `R$ ${(fees.amount + amount * fees.percentage)
      .toFixed(2)
      .replace(".", ",")}`;
  };

  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.6}
        style={[Styles.CardShadow, Styles.cardPadding, { marginHorizontal: 2 }]}
        onPress={() => {
          setLoading(true);

          const handlePress = () => {
            onPress?.();
            setSelectedInstallment(undefined);
            setLoading(false);
          };

          if (!isSelected && !isMidway) {
            setTimeout(handlePress, 500);
          } else {
            handlePress();
          }
        }}
      >
        <View style={styles.cardContent}>
          <ButtonSelect isSelected={isSelected} />
          <View style={styles.textContainer}>
            <View style={styles.paymentContainer}>
              {!isMidway && (
                <Image
                  source={getPaymentImage(paymentMethodName)}
                  resizeMode="contain"
                />
              )}
              <Text style={styles.name}>
                {!isMidway && "Cartão "}
                {paymentMethodName}
              </Text>
            </View>
            {description && (
              <Text style={styles.description}>{description}</Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
      {!isMidway && loading ? (
        <View style={{ marginBottom: 20 }}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      ) : (
        isSelected &&
        !isMidway && (
          <View>
            <TouchableOpacity
              style={styles.installments}
              onPress={() => {
                setModalVisible(true);
              }}
            >
              <Text style={styles.installmentsText}>
                {selectedInstallment ? amountToPay : "Escolher parcelas"}
              </Text>
              <Icon
                icon={"MaterialIcons"}
                icon_name={"arrow-forward-ios"}
                size={22}
                color={Colors.primary}
              />
            </TouchableOpacity>
            {selectedInstallment && (
              <View style={styles.infoInstallmentsContainer}>
                <InfoInstallments
                  title={"Valor a transferir"}
                  info={`R$ ${selectedInstallment.amountToPay
                    .toFixed(2)
                    .replace(".", ",")}`}
                />
                <InfoInstallments
                  title={"Taxa do cartão"}
                  info={calculateFee(
                    selectedInstallment.amountToPay,
                    selectedInstallment.fees.fixed
                  )}
                />
                <InfoInstallments
                  title={"Taxa de parcelamento"}
                  info={calculateFee(
                    selectedInstallment.amountToPay,
                    selectedInstallment.fees.installments
                  )}
                />
                <InfoInstallments
                  title={"Valor a transferir + taxas "}
                  info={amountToPay ?? "-"}
                />
              </View>
            )}
          </View>
        )
      )}

      <PaymentModal
        visible={modalVisible}
        onClose={() => toggleModal(false)}
        selectedInstallment={selectedInstallment}
        onSelectInstallment={setSelectedInstallment}
        amountToPay={amountToPay ?? ""}
        handlePaymentTotal={handlePaymentTotal || (() => {})}
        continueModal={continueModal}
        setInstallmentSelect={setInstallmentSelect}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  cardContent: {
    gap: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  textContainer: {
    marginLeft: 10,
    gap: 8,
  },
  paymentContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  name: {
    color: Colors.primary,
    fontSize: 18,
    fontWeight: "600",
  },
  description: {
    color: Colors.black_800,
    fontSize: 14,
  },
  installments: {
    marginBottom: 20,
    backgroundColor: Colors.white,
    borderRadius: 10,
    paddingLeft: 16,
    paddingRight: 8,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  installmentsText: {
    fontSize: 18,
    color: Colors.primary,
    fontWeight: "600",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.08)",
  },
  modalContent: {
    height: "91%",
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
  },
  modalContentBody: {
    flex: 1,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
  },
  modalContentHeader: {
    paddingTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    marginHorizontal: 16,
  },
  modalLabel: {
    marginBottom: 20,
    fontSize: 16,
    marginHorizontal: 16,
  },
  infoInstallmentsContainer: {
    backgroundColor: Colors.white,
    padding: 16,
    marginBottom: 20,
    gap: 10,
  },
  infoInstallmentsContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  infoInstallmentsTitle: {
    color: Colors.black_800,
    fontSize: 16,
  },
  infoInstallmentsInfo: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
