import { useCountRenders } from "@/scripts/useCountRenders";
import { memo, useCallback, useMemo } from "react";
import { Dimensions, FlatList, Image, StyleSheet, Text, View } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";

type DataItem = {
  _id: string;
  name: string;
  featured_text: string;
  logo: string;
  slug: string;
};

type Props = {
  title: string;
  data?: DataItem[];
};

function SliderBrandIndex(props: Props) {
  const { width } = Dimensions.get("window");
  const { title, data } = props;
  const styledImageMemo = useMemo(() => [styles.itemImage, { width: width / 2 }], []);
  useCountRenders("Slider Brand");

  const renderItem = useCallback(({ item }: { item: DataItem }) => {
    return (
      <View style={styles.itemContainer}>
        <Image source={{ uri: item.logo }} style={styledImageMemo} />
      </View>
    );
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={data}
        keyExtractor={(i) => i._id}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

export default memo(SliderBrandIndex);

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    height: heightPercentageToDP(18),
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  listContainer: {
    paddingHorizontal: 13,
  },
  itemContainer: {
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 0.5,
    borderColor: "grey",
    marginRight: 20,
    height: 100,
  },
  itemImage: {
    height: 100,
    backgroundColor: "white",
    borderRadius: 8,
    resizeMode: "cover",
  },
});
