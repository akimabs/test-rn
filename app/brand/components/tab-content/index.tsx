import { useCountRenders } from "@/scripts/useCountRenders";
import { memo, useCallback, useMemo } from "react";
import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";

type Props = {
  data: string[];
  visibleTabSelected: string;
  handleTogleSelectedBrandName: () => void;
  handleTogleSelectedBrandOrigins: () => void;
};

function TabContent(props: Props) {
  const { width } = Dimensions.get("window");
  const { data, visibleTabSelected, handleTogleSelectedBrandName, handleTogleSelectedBrandOrigins } = props;
  useCountRenders("Tab Content");

  const renderItem = useCallback(
    ({ item, index }: { item: string; index: number }) => {
      const isItemSelected = item == visibleTabSelected;
      const tabItemStyle = [
        styles.tabItem,
        {
          width: width / 2,
          borderColor: isItemSelected ? "lightgray" : "#ec559f",
        },
      ];

      return (
        <TouchableOpacity
          onPress={index == 0 ? handleTogleSelectedBrandOrigins : handleTogleSelectedBrandName}
          activeOpacity={0.7}
          style={tabItemStyle}
        >
          <Text style={{ fontWeight: "600" }}>{item}</Text>
        </TouchableOpacity>
      );
    },
    [visibleTabSelected]
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(_, i) => i.toString()}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

export default memo(TabContent);

const styles = StyleSheet.create({
  container: {
    height: heightPercentageToDP(4),
    marginTop: -heightPercentageToDP(2),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tabItem: {
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 3,
  },
});
