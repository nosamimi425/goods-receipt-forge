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
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-primary mb-2">{data.company.name}</h1>
            {data.company.registrationNumber && (
              <p className="text-sm text-muted-foreground mb-1">
                Registration No: {data.company.registrationNumber}
              </p>
            )}
            <div className="text-sm space-y-1">
              <p>{data.company.address1}</p>
              {data.company.address2 && <p>{data.company.address2}</p>}
              <div className="flex gap-4 text-muted-foreground">
                {data.company.phone && <span>Tel: {data.company.phone}</span>}
                {data.company.email && <span>Email: {data.company.email}</span>}
              </div>
            </div>
          </div>
          {data.company.logo && (
            <div className="w-20 h-20 bg-muted rounded flex items-center justify-center">
              <Building2 className="h-10 w-10 text-muted-foreground" />
            </div>
          )}
        </div>
      </div>

      {/* Document Info */}
      <div className="flex justify-between items-center mb-6 text-sm">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          <span>Issued at: <strong>{data.document.place}</strong></span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <span>Date: <strong>{formatDate(data.document.date)}</strong></span>
        </div>
      </div>

      {/* Title */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground">GOODS HANDOVER RECEIPT</h2>
        <p className="text-sm text-muted-foreground mt-2">Décharge de Réception</p>
      </div>

      {/* Intro Paragraph */}
      <div className="receipt-section">
        <p className="text-base leading-relaxed">
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
          <div className="border border-border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-3 font-medium">Description</th>
                  <th className="text-center p-3 font-medium w-20">Qty</th>
                  <th className="text-center p-3 font-medium w-16">Unit</th>
                  <th className="text-left p-3 font-medium w-32">Reference</th>
                  <th className="text-left p-3 font-medium w-32">Serial No.</th>
                </tr>
              </thead>
              <tbody>
                {data.equipment.map((item, index) => (
                  <tr key={item.id} className={index % 2 === 0 ? "bg-background" : "bg-muted/30"}>
                    <td className="p-3">
                      <div>
                        <div className="font-medium">{item.description || "—"}</div>
                        {item.notes && (
                          <div className="text-sm text-muted-foreground mt-1">{item.notes}</div>
                        )}
                      </div>
                    </td>
                    <td className="p-3 text-center font-medium">{item.quantity}</td>
                    <td className="p-3 text-center">{item.unit || "—"}</td>
                    <td className="p-3">{item.reference || "—"}</td>
                    <td className="p-3">{item.serialNumber || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="border border-dashed border-muted-foreground/30 rounded-lg p-8 text-center text-muted-foreground">
            No equipment items added yet
          </div>
        )}
      </div>

      {/* Confirmation Text */}
      {data.confirmationText && (
        <div className="receipt-section">
          <p className="text-base leading-relaxed bg-accent/50 p-4 rounded-lg">
            {data.confirmationText}
          </p>
        </div>
      )}

      {/* Additional Notes */}
      {data.notes && (
        <div className="receipt-section">
          <h3 className="font-medium mb-2">Additional Notes:</h3>
          <p className="text-sm bg-muted/50 p-3 rounded">{data.notes}</p>
        </div>
      )}

      {/* Signatures Section */}
      <div className="receipt-section mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-medium mb-3">Recipient</h3>
            <div className="space-y-2">
              <p className="text-sm">
                Name: <strong>{data.recipient.name}</strong>
              </p>
              <div className="signature-box">
                {data.recipientSignature ? (
                  <span className="text-primary">Signature provided</span>
                ) : (
                  <span>Signature: ________________________</span>
                )}
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-medium mb-3">Issuer</h3>
            <div className="space-y-2">
              <p className="text-sm">
                Name: <strong>{data.issuer.name}</strong>
              </p>
              <div className="signature-box">
                {data.issuerSignature ? (
                  <span className="text-primary">Signature provided</span>
                ) : (
                  <span>Signature: ________________________</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Document Footer */}
      <div className="mt-8 pt-4 border-t border-border text-center text-sm text-muted-foreground">
        <div className="flex items-center justify-center gap-2">
          <FileText className="h-4 w-4" />
          <span>Document No: <strong>{data.document.number}</strong></span>
        </div>
      </div>
    </div>
  );
};