import { ReceiptData } from "@/types/receipt";
import { Building2, MapPin, Calendar, FileText } from "lucide-react";

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
      <div className="receipt-header">
        <div className="flex justify-center items-center">
          <img 
            src="/lovable-uploads/3feefa29-c6a2-4dec-b348-5a827b8aea8f.png" 
            alt="IMGSA Groupe - Company Header" 
            className="w-full max-w-2xl h-auto object-contain"
          />
        </div>
      </div>

      {/* Document Info */}
      <div className="flex justify-between items-center mb-4 text-xs">
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
      <div className="text-center mb-4">
        <h2 className="text-lg font-bold text-foreground">IMGSA TECHNOLOGY</h2>
        <p className="text-xs text-muted-foreground mt-1">Professional Equipment Management</p>
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
        <div className="receipt-section">
          <p className="text-sm leading-normal bg-accent/50 p-3 rounded-lg">
            {data.confirmationText}
          </p>
        </div>
      )}

      {/* Additional Notes */}
      {data.notes && (
        <div className="receipt-section">
          <h3 className="font-medium mb-1 text-sm">Additional Notes:</h3>
          <p className="text-xs bg-muted/50 p-2 rounded">{data.notes}</p>
        </div>
      )}

      {/* Signatures Section */}
      <div className="receipt-section mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium mb-2 text-sm">Recipient</h3>
            <div className="space-y-1">
              <p className="text-xs">
                Name: <strong>{data.recipient.name}</strong>
              </p>
              <div className="signature-box">
                {data.recipientSignature ? (
                  <span className="text-primary text-xs">Signature provided</span>
                ) : (
                  <span className="text-xs">Signature: ________________________</span>
                )}
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-medium mb-2 text-sm">Issuer</h3>
            <div className="space-y-1">
              <p className="text-xs">
                Name: <strong>{data.issuer.name}</strong>
              </p>
              <div className="signature-box">
                {data.issuerSignature ? (
                  <span className="text-primary text-xs">Signature provided</span>
                ) : (
                  <span className="text-xs">Signature: ________________________</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Document Footer */}
      <div className="mt-4 pt-2 border-t border-border text-center text-xs text-muted-foreground">
        <div className="flex items-center justify-center gap-1">
          <FileText className="h-3 w-3" />
          <span>Document No: <strong>{data.document.number}</strong></span>
        </div>
      </div>
    </div>
  );
};