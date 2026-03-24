import { PDFDownloadLink } from "@react-pdf/renderer";
import Spinner from "react-bootstrap/Spinner";

export const PdfLink = ({ document, filename, linkName = "Download PDF" }) => (
  <PDFDownloadLink document={document} fileName={filename}>
    {({ loading }) =>
      loading ? (
        <Spinner variant="primary" animation="grow" size="sm" />
      ) : (
        linkName
      )
    }
  </PDFDownloadLink>
);
export default PdfLink;
