import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash2, Building2, FileText, Users, Package } from "lucide-react";
import { ReceiptData, EquipmentItem } from "@/types/receipt";
import { useLanguage } from "@/contexts/LanguageContext";

interface ReceiptFormProps {
  data: ReceiptData;
  onChange: (data: ReceiptData) => void;
}

export const ReceiptForm = ({ data, onChange }: ReceiptFormProps) => {
  const { t } = useLanguage();
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
            {t('companyInformation')}
          </CardTitle>
        </CardHeader>
        <CardContent className="form-section">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="companyName">{t('companyName_field')}</Label>
               <Input
                 id="companyName"
                 name="companyName"
                 autoComplete="organization"
                 value={data.company.name}
                 onChange={(e) => updateField("company", "name", e.target.value)}
                 placeholder={t('enterCompanyName')}
               />
            </div>
            <div>
              <Label htmlFor="regNumber">{t('registrationNumber')}</Label>
               <Input
                 id="regNumber"
                 name="registrationNumber"
                 autoComplete="off"
                 value={data.company.registrationNumber || ""}
                 onChange={(e) => updateField("company", "registrationNumber", e.target.value)}
                 placeholder={t('taxRegistration')}
               />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="address1">{t('addressLine1')}</Label>
               <Input
                 id="address1"
                 name="address1"
                 autoComplete="street-address"
                 value={data.company.address1}
                 onChange={(e) => updateField("company", "address1", e.target.value)}
                 placeholder={t('streetAddress')}
               />
            </div>
            <div>
              <Label htmlFor="phone">{t('phone')}</Label>
               <Input
                 id="phone"
                 name="phone"
                 autoComplete="tel"
                 value={data.company.phone || ""}
                 onChange={(e) => updateField("company", "phone", e.target.value)}
                 placeholder={t('phoneNumber')}
               />
            </div>
            <div>
              <Label htmlFor="email">{t('email')}</Label>
               <Input
                 id="email"
                 name="email"
                 type="email"
                 autoComplete="email"
                 value={data.company.email || ""}
                 onChange={(e) => updateField("company", "email", e.target.value)}
                 placeholder={t('emailAddress')}
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
            {t('documentInformation')}
          </CardTitle>
        </CardHeader>
        <CardContent className="form-section">
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
              <Label htmlFor="docNumber">{t('documentNumber')}</Label>
               <Input
                 id="docNumber"
                 name="documentNumber"
                 autoComplete="off"
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
            {t('parties')}
          </CardTitle>
        </CardHeader>
        <CardContent className="form-section">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-3">{t('recipient')}</h3>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="recipientName">{t('fullName')}</Label>
                   <Input
                     id="recipientName"
                     name="recipientName"
                     autoComplete="name"
                     value={data.recipient.name}
                     onChange={(e) => updateField("recipient", "name", e.target.value)}
                     placeholder={t('fullName')}
                   />
                </div>
                <div>
                  <Label htmlFor="recipientTitle">{t('jobTitle')}</Label>
                   <Input
                     id="recipientTitle"
                     name="recipientJobTitle"
                     autoComplete="organization-title"
                     value={data.recipient.jobTitle || ""}
                     onChange={(e) => updateField("recipient", "jobTitle", e.target.value)}
                     placeholder={t('jobTitle')}
                   />
                </div>
                <div>
                  <Label htmlFor="recipientId">{t('idNumber')}</Label>
                   <Input
                     id="recipientId"
                     name="recipientId"
                     autoComplete="off"
                     value={data.recipient.idNumber || ""}
                     onChange={(e) => updateField("recipient", "idNumber", e.target.value)}
                     placeholder={t('idNumber')}
                   />
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-3">{t('issuer')}</h3>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="issuerName">{t('fullName')}</Label>
                   <Input
                     id="issuerName"
                     name="issuerName"
                     autoComplete="name"
                     value={data.issuer.name}
                     onChange={(e) => updateField("issuer", "name", e.target.value)}
                     placeholder={t('fullName')}
                   />
                </div>
                <div>
                  <Label htmlFor="issuerTitle">{t('jobTitle')}</Label>
                   <Input
                     id="issuerTitle"
                     name="issuerJobTitle"
                     autoComplete="organization-title"
                     value={data.issuer.jobTitle || ""}
                     onChange={(e) => updateField("issuer", "jobTitle", e.target.value)}
                     placeholder={t('jobTitle')}
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
              {t('equipmentList')}
            </div>
            <Button onClick={addEquipmentItem} size="sm" className="btn-gradient">
              <Plus className="h-4 w-4 mr-2" />
              {t('addItem')}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="form-section">
          {data.equipment.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">
              {t('noItemsYet')}
            </p>
          ) : (
            <div className="space-y-4">
              {data.equipment.map((item, index) => (
                <div key={item.id} className="border border-border rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">{t('item')} {index + 1}</h4>
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
                      <Label>{t('description')}</Label>
                       <Input
                         name="equipmentDescription"
                         autoComplete="off"
                         value={item.description}
                         onChange={(e) => updateEquipmentItem(item.id, "description", e.target.value)}
                         placeholder={t('equipmentDescription')}
                       />
                    </div>
                    <div>
                      <Label>{t('quantity')}</Label>
                       <Input
                         name="quantity"
                         type="number"
                         min="1"
                         autoComplete="off"
                         value={item.quantity}
                         onChange={(e) => updateEquipmentItem(item.id, "quantity", parseInt(e.target.value) || 1)}
                       />
                    </div>
                    <div>
                      <Label>{t('unit')}</Label>
                       <Input
                         name="unit"
                         autoComplete="off"
                         value={item.unit || ""}
                         onChange={(e) => updateEquipmentItem(item.id, "unit", e.target.value)}
                         placeholder="pcs, sets, etc."
                       />
                    </div>
                    <div>
                      <Label>{t('reference')}</Label>
                       <Input
                         name="reference"
                         autoComplete="off"
                         value={item.reference || ""}
                         onChange={(e) => updateEquipmentItem(item.id, "reference", e.target.value)}
                         placeholder={t('modelNumber')}
                       />
                    </div>
                    <div>
                      <Label>{t('serialNumber')}</Label>
                       <Input
                         name="serialNumber"
                         autoComplete="off"
                         value={item.serialNumber || ""}
                         onChange={(e) => updateEquipmentItem(item.id, "serialNumber", e.target.value)}
                         placeholder={t('serialNumberPlaceholder')}
                       />
                    </div>
                    <div>
                      <Label>{t('notes_field')}</Label>
                       <Input
                         name="notes"
                         autoComplete="off"
                         value={item.notes || ""}
                         onChange={(e) => updateEquipmentItem(item.id, "notes", e.target.value)}
                         placeholder={t('additionalNotesItem')}
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
          <CardTitle>{t('confirmationsNotes')}</CardTitle>
        </CardHeader>
        <CardContent className="form-section">
          <div className="space-y-4">
            <div>
              <Label htmlFor="confirmationText">{t('confirmationText')}</Label>
               <Textarea
                 id="confirmationText"
                 name="confirmationText"
                 autoComplete="off"
                 value={data.confirmationText}
                 onChange={(e) => onChange({ ...data, confirmationText: e.target.value })}
                 placeholder={t('confirmationTextPlaceholder')}
                 rows={3}
               />
            </div>
            <div>
              <Label htmlFor="notes">{t('additionalNotes')}</Label>
               <Textarea
                 id="notes"
                 name="notes"
                 autoComplete="off"
                 value={data.notes || ""}
                 onChange={(e) => onChange({ ...data, notes: e.target.value })}
                 placeholder={t('anyAdditionalNotes')}
                 rows={2}
               />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};