import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { PurchaseRequestData, RequestedItem } from "@/types/purchaseRequest";
import { Plus, Trash2 } from "lucide-react";

interface PurchaseRequestFormProps {
  data: PurchaseRequestData;
  onChange: (data: PurchaseRequestData) => void;
}

export const PurchaseRequestForm = ({ data, onChange }: PurchaseRequestFormProps) => {
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
        <h3 className="text-lg font-semibold mb-4">Document Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="place">Place</Label>
            <Input
              id="place"
              value={data.document.place}
              onChange={(e) => updateField("document", "place", e.target.value)}
              placeholder="Document place"
            />
          </div>
          <div>
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={data.document.date}
              onChange={(e) => updateField("document", "date", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="number">Document Number</Label>
            <Input
              id="number"
              value={data.document.number}
              onChange={(e) => updateField("document", "number", e.target.value)}
              placeholder="Document number"
            />
          </div>
        </div>
      </Card>

      {/* Requester Information */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Requester Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="requesterName">Requester Name</Label>
            <Input
              id="requesterName"
              value={data.requester.name}
              onChange={(e) => updateField("requester", "name", e.target.value)}
              placeholder="Requester's full name"
            />
          </div>
          <div>
            <Label htmlFor="department">Department</Label>
            <Input
              id="department"
              value={data.requester.department}
              onChange={(e) => updateField("requester", "department", e.target.value)}
              placeholder="Department name"
            />
          </div>
        </div>
      </Card>

      {/* Requested Items */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Requested Items</h3>
          <Button onClick={addRequestedItem} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </div>
        
        {data.requestedItems.length > 0 ? (
          <div className="space-y-4">
            {data.requestedItems.map((item, index) => (
              <div key={item.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Item {index + 1}</h4>
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
                    <Label htmlFor={`itemName-${item.id}`}>Item Name</Label>
                    <Input
                      id={`itemName-${item.id}`}
                      value={item.itemName}
                      onChange={(e) => updateRequestedItem(item.id, "itemName", e.target.value)}
                      placeholder="Item name/description"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`quantity-${item.id}`}>Quantity</Label>
                    <Input
                      id={`quantity-${item.id}`}
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateRequestedItem(item.id, "quantity", parseInt(e.target.value) || 1)}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`unit-${item.id}`}>Unit</Label>
                    <Input
                      id={`unit-${item.id}`}
                      value={item.unit || ""}
                      onChange={(e) => updateRequestedItem(item.id, "unit", e.target.value)}
                      placeholder="pcs, kg, m, etc."
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor={`technicalSpecs-${item.id}`}>Technical Specifications</Label>
                  <Textarea
                    id={`technicalSpecs-${item.id}`}
                    value={item.technicalSpecs}
                    onChange={(e) => updateRequestedItem(item.id, "technicalSpecs", e.target.value)}
                    placeholder="Technical specifications and requirements"
                    className="min-h-16"
                  />
                </div>
                
                <div>
                  <Label htmlFor={`observation-${item.id}`}>Observation</Label>
                  <Textarea
                    id={`observation-${item.id}`}
                    value={item.observation || ""}
                    onChange={(e) => updateRequestedItem(item.id, "observation", e.target.value)}
                    placeholder="Additional observations or notes"
                    className="min-h-12"
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="border border-dashed border-muted-foreground/30 rounded-lg p-8 text-center text-muted-foreground">
            <p>No items added yet. Click "Add Item" to start.</p>
          </div>
        )}
      </Card>

      {/* Additional Notes */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Additional Notes</h3>
        <Textarea
          value={data.notes || ""}
          onChange={(e) => onChange({ ...data, notes: e.target.value })}
          placeholder="Any additional notes or comments..."
          className="min-h-20"
        />
      </Card>
    </div>
  );
};