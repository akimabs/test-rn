import { useCountRenders } from "@/scripts/useCountRenders";
import { memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";

type Props = {
  title: string;
};

function Header(props: Props) {
  useCountRenders("Header");
  const { title } = props;
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.textTitle}>{title}</Text>
    </View>
  );
}

export default memo(Header);

const styles = StyleSheet.create({
  headerContainer: {
    height: heightPercentageToDP(10),
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
  },
  textTitle: {
    fontWeight: "700",
    fontSize: 30,
  },
});
