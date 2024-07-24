import { useCountRenders } from "@/scripts/useCountRenders";
import { FlashList } from "@shopify/flash-list";
import React, { memo, useCallback, useRef } from "react";
import { FlatList, StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";

type Props = {
  data?: any[];
  handleTogleSelectedLetter: (str: string) => void;
  visibleLetterSelected: string;
  brandsLetterTemp: any[];
  query: string;
  handleSearch: (str: string) => void;
};

function ListBrand(props: Props) {
  const { data = [], handleTogleSelectedLetter, visibleLetterSelected, query, brandsLetterTemp, handleSearch } = props;
  const flatListRef = useRef<any>(null);
  useCountRenders("List Brand");

  const letterToIndexMap = useRef(new Map<string, number>()).current;

  data.forEach((item, index) => {
    if (!letterToIndexMap.has(item.letter)) {
      letterToIndexMap.set(item.letter, index);
    }
  });

  const renderItemDataBrand = useCallback(
    ({ item }: { item: any }) => {
      return (
        <View style={styles.itemContainer}>
          <Text style={styles.itemText}>{item.name}</Text>
        </View>
      );
    },
    [query]
  );

  const renderItemLetter = useCallback(
    ({ item }: { item: { letter: string; items: any[] } }) => {
      if (item.items.length > 0) {
        return (
          <View>
            <Text style={styles.letterText}>{item.letter}</Text>
            <FlatList
              data={item.items}
              keyExtractor={(_, i) => i.toString()}
              renderItem={renderItemDataBrand}
              scrollEnabled={false}
            />
          </View>
        );
      }

      return null;
    },
    [query]
  );

  const renderItemLetterHorizontal = useCallback(
    ({ item }: { item: { letter: string; items: any[] } }) => {
      if (item.items.length > 0) {
        return (
          <TouchableOpacity
            onPress={() => {
              handleTogleSelectedLetter(item.letter);
              const index = letterToIndexMap.get(item.letter);
              if (index !== undefined && flatListRef.current) {
                flatListRef.current.scrollToIndex({ animated: true, index });
              }
            }}
          >
            <Text style={[styles.horizontalLetterText, visibleLetterSelected == item.letter && { fontWeight: "bold" }]}>
              {item.letter}
            </Text>
          </TouchableOpacity>
        );
      }

      return null;
    },
    [visibleLetterSelected]
  );

  return (
    <View style={styles.container}>
      <TextInput
        value={query}
        placeholder="Search Brand..."
        selectionColor="#ec559f"
        style={styles.searchInput}
        onChangeText={handleSearch}
      />
      <View>
        <FlatList
          data={data}
          keyExtractor={(_, i) => i.toString()}
          renderItem={renderItemLetterHorizontal}
          scrollEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalList}
        />
      </View>
      <FlashList
        ref={flatListRef}
        data={data}
        keyExtractor={(_, i) => i.toString()}
        renderItem={renderItemLetter}
        scrollEnabled
        estimatedItemSize={26}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: heightPercentageToDP(70),
  },
  searchInput: {
    borderWidth: 1,
    height: 50,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  horizontalList: {
    height: heightPercentageToDP(5),
    paddingLeft: 20,
  },
  itemContainer: {
    borderBottomWidth: 0.5,
    borderBottomColor: "black",
  },
  itemText: {
    padding: 15,
    paddingHorizontal: 20,
  },
  letterText: {
    padding: 10,
    paddingHorizontal: 20,
  },
  horizontalLetterText: {
    paddingRight: 30,
  },
});

export default memo(ListBrand);
