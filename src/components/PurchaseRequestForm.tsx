import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { PurchaseRequestData, RequestedItem } from "@/types/purchaseRequest";
import { Plus, Trash2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface PurchaseRequestFormProps {
  data: PurchaseRequestData;
  onChange: (data: PurchaseRequestData) => void;
}

export const PurchaseRequestForm = ({ data, onChange }: PurchaseRequestFormProps) => {
  const { t } = useLanguage();
  
  const updateField = (section: keyof PurchaseRequestData, field: string, value: any) => {
    onChange({
      ...data,
      [section]: {
        ...(data[section] as any),
        [field]: value,
      },
    });
  };

  const addRequestedItem = () => {
    const newItem: RequestedItem = {
      id: Date.now().toString(),
      itemName: "",
      technicalSpecs: "",
      quantity: 1,
      unit: "",
      observation: "",
    };
    onChange({
      ...data,
      requestedItems: [...data.requestedItems, newItem],
    });
  };

  const updateRequestedItem = (id: string, field: keyof RequestedItem, value: any) => {
    onChange({
      ...data,
      requestedItems: data.requestedItems.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    });
  };

  const removeRequestedItem = (id: string) => {
    onChange({
      ...data,
      requestedItems: data.requestedItems.filter((item) => item.id !== id),
    });
  };

  return (
    <div className="space-y-6">
      {/* Document Information */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">{t('documentInformation')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="place">{t('place')}</Label>
            <Input
              id="place"
              name="place"
              autoComplete="address-line1"
              value={data.document.place}
              onChange={(e) => updateField("document", "place", e.target.value)}
              placeholder={t('documentPlace')}
            />
          </div>
          <div>
            <Label htmlFor="date">{t('date')}</Label>
            <Input
              id="date"
              name="date"
              type="date"
              autoComplete="off"
              value={data.document.date}
              onChange={(e) => updateField("document", "date", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="number">{t('documentNumber')}</Label>
            <Input
              id="number"
              name="documentNumber"
              autoComplete="off"
              value={data.document.number}
              onChange={(e) => updateField("document", "number", e.target.value)}
              placeholder={t('documentNumber')}
            />
          </div>
        </div>
      </Card>

      {/* Requester Information */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">{t('requesterInformation')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="requesterName">{t('requesterName')}</Label>
            <Input
              id="requesterName"
              name="requesterName"
              autoComplete="name"
              value={data.requester.name}
              onChange={(e) => updateField("requester", "name", e.target.value)}
              placeholder={t('requesterFullName')}
            />
          </div>
          <div>
            <Label htmlFor="department">{t('department')}</Label>
            <Input
              id="department"
              name="department"
              autoComplete="organization"
              value={data.requester.department}
              onChange={(e) => updateField("requester", "department", e.target.value)}
              placeholder={t('departmentName')}
            />
          </div>
        </div>
      </Card>

      {/* Requested Items */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{t('requestedItems')}</h3>
          <Button onClick={addRequestedItem} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            {t('addItem')}
          </Button>
        </div>
        
        {data.requestedItems.length > 0 ? (
          <div className="space-y-4">
            {data.requestedItems.map((item, index) => (
              <div key={item.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">{t('item')} {index + 1}</h4>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeRequestedItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor={`itemName-${item.id}`}>{t('itemName')}</Label>
                    <Input
                      id={`itemName-${item.id}`}
                      name="itemName"
                      autoComplete="off"
                      value={item.itemName}
                      onChange={(e) => updateRequestedItem(item.id, "itemName", e.target.value)}
                      placeholder={t('itemNameDescription')}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`quantity-${item.id}`}>{t('quantity')}</Label>
                    <Input
                      id={`quantity-${item.id}`}
                      name="quantity"
                      type="number"
                      min="1"
                      autoComplete="off"
                      value={item.quantity}
                      onChange={(e) => updateRequestedItem(item.id, "quantity", parseInt(e.target.value) || 1)}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`unit-${item.id}`}>{t('unit')}</Label>
                    <Input
                      id={`unit-${item.id}`}
                      name="unit"
                      autoComplete="off"
                      value={item.unit || ""}
                      onChange={(e) => updateRequestedItem(item.id, "unit", e.target.value)}
                      placeholder="pcs, kg, m, etc."
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor={`technicalSpecs-${item.id}`}>{t('technicalSpecs')}</Label>
                  <Textarea
                    id={`technicalSpecs-${item.id}`}
                    name="technicalSpecs"
                    autoComplete="off"
                    value={item.technicalSpecs}
                    onChange={(e) => updateRequestedItem(item.id, "technicalSpecs", e.target.value)}
                    placeholder={t('technicalRequirements')}
                    className="min-h-16"
                  />
                </div>
                
                <div>
                  <Label htmlFor={`observation-${item.id}`}>{t('observation')}</Label>
                  <Textarea
                    id={`observation-${item.id}`}
                    name="observation"
                    autoComplete="off"
                    value={item.observation || ""}
                    onChange={(e) => updateRequestedItem(item.id, "observation", e.target.value)}
                    placeholder={t('additionalObservations')}
                    className="min-h-12"
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="border border-dashed border-muted-foreground/30 rounded-lg p-8 text-center text-muted-foreground">
            <p>{t('noItemsYet')}</p>
          </div>
        )}
      </Card>

      {/* Additional Notes */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">{t('additionalNotes')}</h3>
        <Textarea
          name="notes"
          autoComplete="off"
          value={data.notes || ""}
          onChange={(e) => onChange({ ...data, notes: e.target.value })}
          placeholder={t('additionalNotesPlaceholder')}
          className="min-h-20"
        />
      </Card>
    </div>
  );
};
