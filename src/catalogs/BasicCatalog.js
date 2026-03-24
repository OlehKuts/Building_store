import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import {
  Table,
  TableHeader,
  TableCell,
  TableRow,
} from "@ag-media/react-pdf-table";

const styles = StyleSheet.create({
  page: { padding: 30 },
  tableCell: {
    fontFamily: "Roboto",
    fontSize: 11,
    paddingLeft: "3px",
  },
  header: {
    fontFamily: "Roboto",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
    marginTop: "10px",
    marginBottom: "10px",
  },
});

export const BasicCatalog = ({ catalogArticles, currentDate, catalogName }) => {
  return (
    <>
      <Document>
        <Page size="A4" style={styles.page}>
          <View>
            <Text style={styles.header}>
              {catalogName} {currentDate}
            </Text>
          </View>
          <Table weightings={[0.05, 0.4, 0.15, 0.1, 0.15, 0.15]}>
            <TableHeader fontWeight="bold">
              <TableCell style={styles.tableCell}>№</TableCell>
              <TableCell style={styles.tableCell}>Назва товару</TableCell>
              <TableCell style={styles.tableCell}>Закуп. ціна, грн</TableCell>
              <TableCell style={styles.tableCell}>Ціна, грн</TableCell>
              <TableCell style={styles.tableCell}>В наявності, шт</TableCell>
              <TableCell style={styles.tableCell}>Є прибутковим</TableCell>
            </TableHeader>
            {catalogArticles.map(
              (
                {
                  id,
                  title,
                  price,
                  purchasePrice,
                  amount,
                  articleExpense,
                  articleIncome,
                },
                idx,
              ) => (
                <TableRow key={id} textAlign="center">
                  <TableCell style={styles.tableCell}>{idx + 1}</TableCell>
                  <TableCell textAlign="center" style={styles.tableCell}>
                    {title}
                  </TableCell>
                  <TableCell style={styles.tableCell}>
                    {purchasePrice}
                  </TableCell>
                  <TableCell style={styles.tableCell}>{price}</TableCell>
                  <TableCell style={styles.tableCell}>{amount}</TableCell>
                  <TableCell style={styles.tableCell}>
                    {articleIncome > articleExpense ? "Так" : "Ні"}
                  </TableCell>
                </TableRow>
              ),
            )}
          </Table>
        </Page>
      </Document>
    </>
  );
};
