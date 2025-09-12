import { PurchaseRequestData } from "@/types/purchaseRequest";
import { MapPin, Calendar, FileText } from "lucide-react";

interface PurchaseRequestPreviewProps {
  data: PurchaseRequestData;
}

export const PurchaseRequestPreview = ({ data }: PurchaseRequestPreviewProps) => {
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
        <h2 className="text-lg font-bold text-foreground">DEMANDE D'ACHAT</h2>
        <p className="text-xs text-muted-foreground mt-1">Purchase Request</p>
      </div>

      {/* Requester Information */}
      <div className="receipt-section">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium">Demandeur:</span> <strong>{data.requester.name}</strong>
          </div>
          <div>
            <span className="font-medium">Département:</span> <strong>{data.requester.department}</strong>
          </div>
        </div>
      </div>

      {/* Requested Items List */}
      <div className="receipt-section">
        {data.requestedItems.length > 0 ? (
          <div className="border border-border rounded-lg overflow-hidden equipment-table">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-2 font-medium text-xs">Désignation de l'article</th>
                  <th className="text-left p-2 font-medium text-xs">Spécifications techniques</th>
                  <th className="text-center p-2 font-medium w-16 text-xs">Quantité</th>
                  <th className="text-center p-2 font-medium w-12 text-xs">Unité</th>
                  <th className="text-left p-2 font-medium text-xs">Observation</th>
                </tr>
              </thead>
              <tbody>
                {data.requestedItems.map((item, index) => (
                  <tr key={item.id} className={index % 2 === 0 ? "bg-background" : "bg-muted/30"}>
                    <td className="p-2">
                      <div className="font-medium text-xs">{item.itemName || "—"}</div>
                    </td>
                    <td className="p-2">
                      <div className="text-xs">{item.technicalSpecs || "—"}</div>
                    </td>
                    <td className="p-2 text-center font-medium text-xs">{item.quantity}</td>
                    <td className="p-2 text-center text-xs">{item.unit || "—"}</td>
                    <td className="p-2 text-xs">{item.observation || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="border border-dashed border-muted-foreground/30 rounded-lg p-6 text-center text-muted-foreground">
            No items added yet
          </div>
        )}
      </div>

      {/* Additional Notes */}
      {data.notes && (
        <div className="receipt-section">
          <h3 className="font-medium mb-1 text-sm">Additional Notes:</h3>
          <p className="text-xs bg-muted/50 p-2 rounded">{data.notes}</p>
        </div>
      )}

      {/* Signatures Section */}
      <div className="receipt-section mt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-medium mb-2 text-sm">Demandeur</h3>
            <div className="space-y-1">
              <p className="text-xs">
                Name: <strong>{data.requester.name}</strong>
              </p>
              <div className="signature-box">
                {data.requesterSignature ? (
                  <span className="text-primary text-xs">Signature provided</span>
                ) : (
                  <span className="text-xs">Signature: ________________________</span>
                )}
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-medium mb-2 text-sm">Chef de Département</h3>
            <div className="space-y-1">
              <p className="text-xs">
                Approval:
              </p>
              <div className="signature-box">
                {data.departmentHeadSignature ? (
                  <span className="text-primary text-xs">Signature provided</span>
                ) : (
                  <span className="text-xs">Signature: ________________________</span>
                )}
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-medium mb-2 text-sm">Responsable Achats/Magasin</h3>
            <div className="space-y-1">
              <p className="text-xs">
                Final Approval:
              </p>
              <div className="signature-box">
                {data.purchasingManagerSignature ? (
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