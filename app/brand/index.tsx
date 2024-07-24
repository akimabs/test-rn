import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { useBrand } from "./logic/useBrand";
import { Header, ListBrand, SliderBrandIndex, TabContent } from "./components";

export default function BrandScreen() {
  const {
    dataBrandImage,
    dataTabContent,
    visibleTabSelected,
    mappedDataLetter,
    visibleLetterSelected,
    brandsLetterTemp,
    query,
    _handleSearch,
    _handleTogleSelectedBrandName,
    _handleTogleSelectedBrandOrigins,
    _handleTogleSelectedLetter,
  } = useBrand();

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Sociolla" />
      <SliderBrandIndex title="FEATURED BRANDS" data={dataBrandImage?.data} />
      <TabContent
        data={dataTabContent}
        visibleTabSelected={visibleTabSelected}
        handleTogleSelectedBrandName={_handleTogleSelectedBrandName}
        handleTogleSelectedBrandOrigins={_handleTogleSelectedBrandOrigins}
      />
      <ListBrand
        data={mappedDataLetter}
        handleTogleSelectedLetter={_handleTogleSelectedLetter}
        handleSearch={_handleSearch}
        visibleLetterSelected={visibleLetterSelected}
        brandsLetterTemp={brandsLetterTemp}
        query={query}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "flex-start",
  },
});
