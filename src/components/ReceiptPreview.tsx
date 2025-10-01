import { ReceiptData } from "@/types/receipt";
import { Building2, MapPin, Calendar, FileText } from "lucide-react";
import companyHeader from "@/assets/company-header.jpg";

interface ReceiptPreviewProps {
  data: ReceiptData;
}

export const ReceiptPreview = ({ data }: ReceiptPreviewProps) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="document-preview receipt-document print-page">
      {/* Header */}
      <div className="receipt-header print:mb-2">
        <div className="flex justify-center items-center">
          <img 
            src={companyHeader}
            alt="IMGSA Groupe - Company Header" 
            className="w-full max-w-2xl h-auto object-contain print:max-w-xl"
          />
        </div>
      </div>

      {/* Document Info */}
      <div className="flex justify-between items-center mb-2 text-xs print:mb-1">
        <div className="flex items-center gap-2">
          <MapPin className="h-3 w-3" />
          <span>Issued at: <strong>{data.document.place}</strong></span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-3 w-3" />
          <span>Date: <strong>{formatDate(data.document.date)}</strong></span>
        </div>
      </div>

      {/* Title */}
      <div className="text-center mb-3 print:mb-2">
        <h2 className="text-lg font-bold text-foreground print:text-base">DÉCHARGE</h2>
        <p className="text-xs text-muted-foreground">Equipment Receipt</p>
      </div>

      {/* Intro Paragraph */}
      <div className="receipt-section">
        <p className="text-sm leading-normal">
          I, <strong>{data.recipient.name}</strong>
          {data.recipient.jobTitle && ` (${data.recipient.jobTitle})`}
          {data.recipient.idNumber && `, ID: ${data.recipient.idNumber}`},
          acknowledge having received on <strong>{formatDate(data.document.date)}</strong> from{" "}
          <strong>{data.issuer.name}</strong>
          {data.issuer.jobTitle && ` (${data.issuer.jobTitle})`}
          {" "}the following equipment:
        </p>
      </div>

      {/* Equipment List */}
      <div className="receipt-section">
        {data.equipment.length > 0 ? (
          <div className="border border-border rounded-lg overflow-hidden equipment-table">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-2 font-medium text-xs">Description</th>
                  <th className="text-center p-2 font-medium w-16 text-xs">Qty</th>
                  <th className="text-center p-2 font-medium w-12 text-xs">Unit</th>
                  <th className="text-left p-2 font-medium w-24 text-xs">Reference</th>
                  <th className="text-left p-2 font-medium w-24 text-xs">Serial No.</th>
                </tr>
              </thead>
              <tbody>
                {data.equipment.map((item, index) => (
                  <tr key={item.id} className={index % 2 === 0 ? "bg-background" : "bg-muted/30"}>
                    <td className="p-2">
                      <div>
                        <div className="font-medium text-xs">{item.description || "—"}</div>
                        {item.notes && (
                          <div className="text-xs text-muted-foreground mt-0.5">{item.notes}</div>
                        )}
                      </div>
                    </td>
                    <td className="p-2 text-center font-medium text-xs">{item.quantity}</td>
                    <td className="p-2 text-center text-xs">{item.unit || "—"}</td>
                    <td className="p-2 text-xs">{item.reference || "—"}</td>
                    <td className="p-2 text-xs">{item.serialNumber || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="border border-dashed border-muted-foreground/30 rounded-lg p-6 text-center text-muted-foreground">
            No equipment items added yet
          </div>
        )}
      </div>

      {/* Confirmation Text */}
      {data.confirmationText && (
        <div className="mb-3 print:mb-2">
          <p className="text-sm leading-normal bg-accent/50 p-3 rounded-lg print:p-2 print:text-xs">
            {data.confirmationText}
          </p>
        </div>
      )}

      {/* Additional Notes */}
      {data.notes && (
        <div className="mb-3 print:mb-2">
          <h3 className="font-medium mb-1 text-sm print:text-xs">Additional Notes:</h3>
          <p className="text-xs bg-muted/50 p-2 rounded print:p-1">{data.notes}</p>
        </div>
      )}

      {/* Signatures Section */}
      <div className="mt-4 print:mt-3">
        <div className="grid grid-cols-2 gap-4 print:gap-2">
          <div>
            <h3 className="font-medium mb-1 text-xs print:text-[10px]">Recipient</h3>
            <p className="text-[10px] mb-1">Name: <strong>{data.recipient.name}</strong></p>
            <div className="border-b border-muted-foreground/30 pb-1 min-h-[40px] print:min-h-[30px]">
              <span className="text-[9px] text-muted-foreground">Signature</span>
            </div>
          </div>
          <div>
            <h3 className="font-medium mb-1 text-xs print:text-[10px]">Issuer</h3>
            <p className="text-[10px] mb-1">Name: <strong>{data.issuer.name}</strong></p>
            <div className="border-b border-muted-foreground/30 pb-1 min-h-[40px] print:min-h-[30px]">
              <span className="text-[9px] text-muted-foreground">Signature</span>
            </div>
          </div>
        </div>
      </div>

      {/* Document Footer */}
      <div className="mt-3 pt-2 border-t border-border text-center text-xs text-muted-foreground print:mt-2 print:pt-1">
        <div className="flex items-center justify-center gap-1">
          <FileText className="h-3 w-3" />
          <span>Document No: <strong>{data.document.number}</strong></span>
        </div>
      </div>
    </div>
  );
};