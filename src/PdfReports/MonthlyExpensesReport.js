import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import {
  Table,
  TableHeader,
  TableCell,
  TableRow,
} from "@ag-media/react-pdf-table";
import { simpleMonthConverter } from "../utils/monthConverter";
import { Font } from "@react-pdf/renderer";

Font.register({
  family: "Roboto",
  src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf", // Example URL
});

const styles = StyleSheet.create({
  page: { padding: 30 },
  tableCell: {
    fontFamily: "Roboto", // Use registered name
    fontSize: 11,
    paddingLeft: "3px",
  },
  header: {
    fontFamily: "Roboto", // Use registered name
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
    marginTop: "10px",
    marginBottom: "10px",
  },
});

export const MonthlyExpensesReport = ({
  monthlyExpenses,
  chosenMonth = "",
  totalMonthlyExpenses,
}) => {
  return (
    <>
      <Document>
        <Page size="A4" style={styles.page}>
          <View>
            <Text style={styles.header}>
              Місячний звіт по витратах за{" "}
              {simpleMonthConverter(chosenMonth).toLowerCase()}
            </Text>
          </View>
          <Table weightings={[0.05, 0.35, 0.15, 0.1, 0.15, 0.1, 0.1]}>
            <TableHeader fontWeight="bold">
              <TableCell style={styles.tableCell}>№</TableCell>
              <TableCell style={styles.tableCell}>Назва товару</TableCell>
              <TableCell style={styles.tableCell}>Закуп. ціна, грн</TableCell>
              <TableCell style={styles.tableCell}>К-сть</TableCell>
              <TableCell style={styles.tableCell}>Заг. вартість, грн</TableCell>
              <TableCell style={styles.tableCell}>Тип</TableCell>
              <TableCell style={styles.tableCell}>Дата</TableCell>
            </TableHeader>
            {monthlyExpenses.map(
              (
                {
                  id,
                  articleTitle,
                  expenseArticleAmount,
                  expenseDate,
                  expenseSum,
                  expenseType,
                },
                idx,
              ) => (
                <TableRow key={id} textAlign="center">
                  <TableCell style={styles.tableCell}>{idx + 1}</TableCell>
                  <TableCell textAlign="center" style={styles.tableCell}>
                    {articleTitle}
                  </TableCell>
                  <TableCell style={styles.tableCell}>
                    {expenseSum / expenseArticleAmount}
                  </TableCell>
                  <TableCell style={styles.tableCell}>
                    {expenseArticleAmount}
                  </TableCell>
                  <TableCell style={styles.tableCell}>{expenseSum}</TableCell>
                  <TableCell style={styles.tableCell}>
                    {expenseType === "primary" ? "первинна" : "повторна"}
                  </TableCell>
                  <TableCell style={styles.tableCell}>{expenseDate}</TableCell>
                </TableRow>
              ),
            )}
          </Table>
          <Text style={styles.header}>
            Загальна вартість витрат: {totalMonthlyExpenses} грн
          </Text>
        </Page>
      </Document>
    </>
  );
};
