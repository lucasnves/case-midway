import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

import ParallaxScrollView from "@/src/components/ParallaxScrollView";
import CardService from "@/src/components/CardService";
import { useEffect, useState } from "react";
import HeaderAmount from "@/src/components/HeaderAmount";
import { services } from "@/src/lists/services";
import { getAcountInfo } from "@/src/services/api";
import { Account } from "@/src/interfaces/interfaces";

export default function TabTwoScreen() {
  const [fullAmount, setFullAmount] = useState<number>(0);
  const [showMore, setShowMore] = useState(false);

  const maxVisibleRows = 2;
  const itemsPerRow = 3;
  const visibleItems = maxVisibleRows * itemsPerRow;
  const visibleServices = showMore ? services : services.slice(0, visibleItems);

  useEffect(() => {
    getAcountInfo().then((account: Account) => {
      setFullAmount(account.balance);
    });
  }, []);

  return (
    <ParallaxScrollView header={<HeaderAmount amount={fullAmount} />}>
      <View style={styles.content}>
        <View style={styles.cardService}>
          {visibleServices.map((service, index) => (
            <View key={index} style={styles.cardRow}>
              <CardService
                icon={service.icon}
                icon_name={service.icon_name}
                title={service.title}
                page={service.page}
              />
            </View>
          ))}
        </View>
        {services.length > visibleItems && (
          <TouchableOpacity
            style={styles.showMoreButton}
            onPress={() => setShowMore(!showMore)}
          >
            <Text style={styles.showMoreText}>
              {showMore ? "Ver menos" : "Ver mais"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: "#f6f6f6",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 16,
  },
  cardService: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 10,
  },
  cardRow: {
    width: "31.4%",
  },
  showMoreButton: {
    marginTop: 16,
    backgroundColor: "#004C48",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: "center",
  },
  showMoreText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
