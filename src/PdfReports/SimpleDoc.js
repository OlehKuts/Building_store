import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 8, fontFamily: "Roboto" },
});

export const SimpleDoc = ({ content }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View>
        <Text>{content}</Text>
      </View>
    </Page>
  </Document>
);
