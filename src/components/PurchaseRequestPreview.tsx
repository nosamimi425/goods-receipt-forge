import { PurchaseRequestData } from "@/types/purchaseRequest";
import { MapPin, Calendar, FileText } from "lucide-react";
import companyHeader from "@/assets/company-header.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

interface PurchaseRequestPreviewProps {
  data: PurchaseRequestData;
}

export const PurchaseRequestPreview = ({ data }: PurchaseRequestPreviewProps) => {
  const { t, language } = useLanguage();
  
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'ar' ? 'ar-DZ' : 'fr-FR', {
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

      {/* Document Info and Title - Combined for compact layout */}
      <div className="flex justify-between items-center mb-2 text-xs print:mb-1">
        <div className="flex items-center gap-2">
          <MapPin className="h-3 w-3" />
          <span>{t('issuedAt')}: <strong>{data.document.place}</strong></span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-3 w-3" />
          <span>{t('date')}: <strong>{formatDate(data.document.date)}</strong></span>
        </div>
      </div>

      {/* Title */}
      <div className="text-center mb-3 print:mb-2">
        <h2 className="text-lg font-bold text-foreground print:text-base">{t('purchaseRequestTitle')}</h2>
        <p className="text-xs text-muted-foreground">{t('purchaseRequestSubtitle_doc')}</p>
      </div>

      {/* Requester Information - Inline */}
      <div className="mb-3 print:mb-2">
        <div className="flex items-center gap-4 text-sm print:text-xs">
          <div>
            <span className="font-medium">{t('requester')}:</span> <strong>{data.requester.name}</strong>
          </div>
          <div>
            <span className="font-medium">{t('department')}:</span> <strong>{data.requester.department}</strong>
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
                  <th className="text-left p-2 font-medium text-xs">{t('itemNameHeader')}</th>
                  <th className="text-left p-2 font-medium text-xs">{t('technicalSpecsHeader')}</th>
                  <th className="text-center p-2 font-medium w-16 text-xs">{t('quantityHeader')}</th>
                  <th className="text-center p-2 font-medium w-12 text-xs">{t('unitHeader')}</th>
                  <th className="text-left p-2 font-medium text-xs">{t('observationHeader')}</th>
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
            {t('noItemsYet')}
          </div>
        )}
      </div>

      {/* Additional Notes */}
      {data.notes && (
        <div className="mb-3 print:mb-2">
          <h3 className="font-medium mb-1 text-sm print:text-xs">{t('additionalNotes')}:</h3>
          <p className="text-xs bg-muted/50 p-2 rounded print:p-1">{data.notes}</p>
        </div>
      )}

      {/* Signatures Section - Compact */}
      <div className="mt-4 print:mt-3">
        <div className="grid grid-cols-3 gap-4 print:gap-2">
          <div>
            <h3 className="font-medium mb-1 text-xs print:text-[10px]">{t('requester')}</h3>
            <p className="text-[10px] mb-1">{t('name')}: <strong>{data.requester.name}</strong></p>
            <div className="border-b border-muted-foreground/30 pb-1 min-h-[40px] print:min-h-[30px]">
              <span className="text-[9px] text-muted-foreground">{t('signature')}</span>
            </div>
          </div>
          <div>
            <h3 className="font-medium mb-1 text-xs print:text-[10px]">{t('departmentHead')}</h3>
            <p className="text-[10px] mb-1">{t('approval')}:</p>
            <div className="border-b border-muted-foreground/30 pb-1 min-h-[40px] print:min-h-[30px]">
              <span className="text-[9px] text-muted-foreground">{t('signature')}</span>
            </div>
          </div>
          <div>
            <h3 className="font-medium mb-1 text-xs print:text-[10px]">{t('purchasingManager')}</h3>
            <p className="text-[10px] mb-1">{t('finalApproval')}:</p>
            <div className="border-b border-muted-foreground/30 pb-1 min-h-[40px] print:min-h-[30px]">
              <span className="text-[9px] text-muted-foreground">{t('signature')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Document Footer */}
      <div className="mt-3 pt-2 border-t border-border text-center text-xs text-muted-foreground print:mt-2 print:pt-1">
        <div className="flex items-center justify-center gap-1">
          <FileText className="h-3 w-3" />
          <span>{t('documentNo')}: <strong>{data.document.number}</strong></span>
        </div>
      </div>
    </div>
  );
};
