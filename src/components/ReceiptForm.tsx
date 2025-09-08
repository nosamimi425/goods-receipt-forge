import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash2, Building2, FileText, Users, Package } from "lucide-react";
import { ReceiptData, EquipmentItem } from "@/types/receipt";

interface ReceiptFormProps {
  data: ReceiptData;
  onChange: (data: ReceiptData) => void;
}

export const ReceiptForm = ({ data, onChange }: ReceiptFormProps) => {
  const updateField = (section: keyof ReceiptData, field: string, value: any) => {
    onChange({
      ...data,
      [section]: {
        ...(data[section] as any),
        [field]: value,
      },
    });
  };

  const addEquipmentItem = () => {
    const newItem: EquipmentItem = {
      id: Date.now().toString(),
      description: "",
      quantity: 1,
      unit: "pcs",
    };
    onChange({
      ...data,
      equipment: [...data.equipment, newItem],
    });
  };

  const updateEquipmentItem = (id: string, field: keyof EquipmentItem, value: any) => {
    onChange({
      ...data,
      equipment: data.equipment.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    });
  };

  const removeEquipmentItem = (id: string) => {
    onChange({
      ...data,
      equipment: data.equipment.filter(item => item.id !== id),
    });
  };

  return (
    <div className="space-y-6">
      {/* Company Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Company Information
          </CardTitle>
        </CardHeader>
        <CardContent className="form-section">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="companyName">Company Name *</Label>
              <Input
                id="companyName"
                value={data.company.name}
                onChange={(e) => updateField("company", "name", e.target.value)}
                placeholder="Enter company name"
              />
            </div>
            <div>
              <Label htmlFor="regNumber">Registration Number</Label>
              <Input
                id="regNumber"
                value={data.company.registrationNumber || ""}
                onChange={(e) => updateField("company", "registrationNumber", e.target.value)}
                placeholder="Tax/Registration number"
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="address1">Address Line 1</Label>
              <Input
                id="address1"
                value={data.company.address1}
                onChange={(e) => updateField("company", "address1", e.target.value)}
                placeholder="Street address"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={data.company.phone || ""}
                onChange={(e) => updateField("company", "phone", e.target.value)}
                placeholder="Phone number"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={data.company.email || ""}
                onChange={(e) => updateField("company", "email", e.target.value)}
                placeholder="Email address"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Document Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Document Information
          </CardTitle>
        </CardHeader>
        <CardContent className="form-section">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="place">Place</Label>
              <Input
                id="place"
                value={data.document.place}
                onChange={(e) => updateField("document", "place", e.target.value)}
                placeholder="OULED GACEM"
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
              <Label htmlFor="docNumber">Document Number</Label>
              <Input
                id="docNumber"
                value={data.document.number}
                onChange={(e) => updateField("document", "number", e.target.value)}
                placeholder="REC-2024-0001"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Parties */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Parties
          </CardTitle>
        </CardHeader>
        <CardContent className="form-section">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-3">Recipient</h3>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="recipientName">Full Name *</Label>
                  <Input
                    id="recipientName"
                    value={data.recipient.name}
                    onChange={(e) => updateField("recipient", "name", e.target.value)}
                    placeholder="Recipient full name"
                  />
                </div>
                <div>
                  <Label htmlFor="recipientTitle">Job Title</Label>
                  <Input
                    id="recipientTitle"
                    value={data.recipient.jobTitle || ""}
                    onChange={(e) => updateField("recipient", "jobTitle", e.target.value)}
                    placeholder="Job title"
                  />
                </div>
                <div>
                  <Label htmlFor="recipientId">ID Number</Label>
                  <Input
                    id="recipientId"
                    value={data.recipient.idNumber || ""}
                    onChange={(e) => updateField("recipient", "idNumber", e.target.value)}
                    placeholder="ID number"
                  />
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-3">Issuer</h3>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="issuerName">Full Name *</Label>
                  <Input
                    id="issuerName"
                    value={data.issuer.name}
                    onChange={(e) => updateField("issuer", "name", e.target.value)}
                    placeholder="Issuer full name"
                  />
                </div>
                <div>
                  <Label htmlFor="issuerTitle">Job Title</Label>
                  <Input
                    id="issuerTitle"
                    value={data.issuer.jobTitle || ""}
                    onChange={(e) => updateField("issuer", "jobTitle", e.target.value)}
                    placeholder="Job title"
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Equipment List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Equipment List
            </div>
            <Button onClick={addEquipmentItem} size="sm" className="btn-gradient">
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="form-section">
          {data.equipment.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">
              No equipment items added yet. Click "Add Item" to start.
            </p>
          ) : (
            <div className="space-y-4">
              {data.equipment.map((item, index) => (
                <div key={item.id} className="border border-border rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Item {index + 1}</h4>
                    {data.equipment.length > 1 && (
                      <Button
                        onClick={() => removeEquipmentItem(item.id)}
                        size="sm"
                        variant="destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    <div className="md:col-span-2 lg:col-span-1">
                      <Label>Description *</Label>
                      <Input
                        value={item.description}
                        onChange={(e) => updateEquipmentItem(item.id, "description", e.target.value)}
                        placeholder="Equipment description"
                      />
                    </div>
                    <div>
                      <Label>Quantity *</Label>
                      <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateEquipmentItem(item.id, "quantity", parseInt(e.target.value) || 1)}
                      />
                    </div>
                    <div>
                      <Label>Unit</Label>
                      <Input
                        value={item.unit || ""}
                        onChange={(e) => updateEquipmentItem(item.id, "unit", e.target.value)}
                        placeholder="pcs, sets, etc."
                      />
                    </div>
                    <div>
                      <Label>Reference/Model</Label>
                      <Input
                        value={item.reference || ""}
                        onChange={(e) => updateEquipmentItem(item.id, "reference", e.target.value)}
                        placeholder="Model number"
                      />
                    </div>
                    <div>
                      <Label>Serial Number</Label>
                      <Input
                        value={item.serialNumber || ""}
                        onChange={(e) => updateEquipmentItem(item.id, "serialNumber", e.target.value)}
                        placeholder="Serial number"
                      />
                    </div>
                    <div>
                      <Label>Notes</Label>
                      <Input
                        value={item.notes || ""}
                        onChange={(e) => updateEquipmentItem(item.id, "notes", e.target.value)}
                        placeholder="Additional notes"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Confirmations & Notes */}
      <Card>
        <CardHeader>
          <CardTitle>Confirmations & Notes</CardTitle>
        </CardHeader>
        <CardContent className="form-section">
          <div className="space-y-4">
            <div>
              <Label htmlFor="confirmationText">Confirmation Text</Label>
              <Textarea
                id="confirmationText"
                value={data.confirmationText}
                onChange={(e) => onChange({ ...data, confirmationText: e.target.value })}
                placeholder="I hereby confirm that I have received the above-mentioned equipment in good condition and in the specified quantity."
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                value={data.notes || ""}
                onChange={(e) => onChange({ ...data, notes: e.target.value })}
                placeholder="Any additional notes or remarks"
                rows={2}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};