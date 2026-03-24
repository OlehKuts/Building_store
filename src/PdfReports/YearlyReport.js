import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import {
  Table,
  TableHeader,
  TableCell,
  TableRow,
} from "@ag-media/react-pdf-table";
import { simpleMonthConverter } from "../utils/monthConverter";

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

export const YearlyReport = ({ yearlyData, chosenYear = "" }) => {
  return (
    <>
      <Document>
        <Page size="A4" style={styles.page}>
          <View>
            <Text style={styles.header}>
              Річний фінансовий звіт за {chosenYear} рік
            </Text>
          </View>
          <Table weightings={[0.1, 0.2, 0.2, 0.15, 0.15, 0.15]}>
            <TableHeader fontWeight="bold">
              <TableCell style={styles.tableCell}>Місяць</TableCell>
              <TableCell style={styles.tableCell}>Доходи, готівка</TableCell>
              <TableCell style={styles.tableCell}>Доходи, карта</TableCell>
              <TableCell style={styles.tableCell}>Заг. доходи</TableCell>
              <TableCell style={styles.tableCell}>Заг. витрати</TableCell>
              <TableCell style={styles.tableCell}>Прибуток</TableCell>
            </TableHeader>
            {yearlyData.map(
              ({
                incomeTotalCard,
                incomeTotalCash,
                expenseTotal,
                difference,
                month,
              }) => (
                <TableRow key={month} textAlign="center">
                  <TableCell style={styles.tableCell}>
                    {simpleMonthConverter(month).replace(/\d/g, "")}
                  </TableCell>
                  <TableCell textAlign="center" style={styles.tableCell}>
                    {incomeTotalCard}
                  </TableCell>
                  <TableCell style={styles.tableCell}>
                    {incomeTotalCash}
                  </TableCell>
                  <TableCell style={styles.tableCell}>
                    {incomeTotalCard + incomeTotalCash}
                  </TableCell>
                  <TableCell style={styles.tableCell}>{expenseTotal}</TableCell>
                  <TableCell style={styles.tableCell}>{difference}</TableCell>
                </TableRow>
              ),
            )}
          </Table>
        </Page>
      </Document>
    </>
  );
};
