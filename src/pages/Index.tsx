import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FileDown, Printer, Eye, EyeOff, FileText, ShoppingCart } from "lucide-react";
import { ReceiptForm } from "@/components/ReceiptForm";
import { ReceiptPreview } from "@/components/ReceiptPreview";
import { PurchaseRequestForm } from "@/components/PurchaseRequestForm";
import { PurchaseRequestPreview } from "@/components/PurchaseRequestPreview";
import { ReceiptData } from "@/types/receipt";
import { PurchaseRequestData } from "@/types/purchaseRequest";

const Index = () => {
  const [showPreview, setShowPreview] = useState(true);
  const [activeSection, setActiveSection] = useState<'receipt' | 'purchase'>('receipt');
  
  const [receiptData, setReceiptData] = useState<ReceiptData>({
    company: {
      name: "GROUPE INDUSTRIE PHARMACEUTIQUE SPA",
      registrationNumber: "Capital Social 1 500 000 000,00DA",
      address1: "Siège Social : cité 156/554 logements BT.33 N 28 Said Hamdine",
      address2: "Bir Mourad Rais - Alger\nDirection administrative : 37 Rue Ain Sultane les oliviers - Kouba - Alger",
      phone: "044 95 16 01 • Tel/Fax: 044 95 19 06",
      email: "contact@imgsa.dz Site: www.imgsa.dz",
      logo: "/lovable-uploads/dd0ca01b-0b77-4c06-8ffa-5a71df8c6ae0.png",
    },
    document: {
      place: "OULED GACEM",
      date: new Date().toISOString().split('T')[0],
      number: `REC-${new Date().getFullYear()}-${String(Date.now() % 10000).padStart(4, '0')}`,
    },
    recipient: {
      name: "",
    },
    issuer: {
      name: "",
    },
    equipment: [{
      id: "1",
      description: "",
      quantity: 1,
      unit: "pcs",
    }],
    confirmationText: "I hereby confirm that I have received the above-mentioned equipment in good condition and in the specified quantity.",
  });

  const [purchaseRequestData, setPurchaseRequestData] = useState<PurchaseRequestData>({
    company: {
      name: "IMGSA TECHNOLOGY",
      registrationNumber: "RC N°: 215.815 B 2012",
      address1: "Zone Industrielle, Hay Riad",
      address2: "10100 Rabat - Maroc\nTél: 05 37 71 85 24 - 05 37 71 84 01\nFax: 05 37 71 86 00",
      phone: "05 37 71 85 24",
      email: "contact@imgsa-technology.com",
    },
    document: {
      place: "Rabat",
      date: new Date().toISOString().split('T')[0],
      number: "DA-" + Date.now().toString().slice(-6),
    },
    requester: {
      name: "",
      department: "",
    },
    requestedItems: [],
    notes: "",
  });

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    // For now, just trigger the browser's print dialog with PDF option
    // In a real implementation, you'd use a library like jsPDF or Puppeteer
    if (window.confirm("This will open the print dialog. Choose 'Save as PDF' in your browser's print options.")) {
      window.print();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="no-print border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-primary">IMGSA TECHNOLOGY</h1>
              <p className="text-muted-foreground">
                {activeSection === 'receipt' ? 'Professional Goods Handover Receipts' : 'Purchase Request Management'}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowPreview(!showPreview)}
                className="md:hidden"
              >
                {showPreview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
              <Button onClick={handlePrint} variant="outline" size="sm">
                <Printer className="h-4 w-4 mr-2" />
                Print
              </Button>
              <Button onClick={handleDownloadPDF} size="sm" className="btn-gradient">
                <FileDown className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>

          {/* Section Navigation */}
          <div className="mt-4 flex space-x-1 bg-muted p-1 rounded-lg w-fit">
            <Button
              variant={activeSection === 'receipt' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveSection('receipt')}
              className="flex items-center space-x-2"
            >
              <FileText className="h-4 w-4" />
              <span>Décharge</span>
            </Button>
            <Button
              variant={activeSection === 'purchase' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveSection('purchase')}
              className="flex items-center space-x-2"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Demande d'Achat</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form Section */}
          <div className={`no-print ${showPreview ? 'hidden lg:block' : 'block'}`}>
            <Card>
              <CardHeader>
                <CardTitle>
                  {activeSection === 'receipt' ? 'Receipt Details' : 'Purchase Request Details'}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {activeSection === 'receipt' 
                    ? 'Fill in the information below to generate your receipt'
                    : 'Fill in the information below to generate your purchase request'
                  }
                </p>
              </CardHeader>
              <CardContent>
                {activeSection === 'receipt' ? (
                  <ReceiptForm data={receiptData} onChange={setReceiptData} />
                ) : (
                  <PurchaseRequestForm data={purchaseRequestData} onChange={setPurchaseRequestData} />
                )}
              </CardContent>
            </Card>
          </div>

          {/* Preview Section */}
          <div className={`${!showPreview ? 'hidden lg:block' : 'block'}`}>
            <div className="sticky top-6">
              <Card className="no-print mb-4">
                <CardHeader>
                  <CardTitle>Live Preview</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {activeSection === 'receipt'
                      ? 'This is how your receipt will look when printed'
                      : 'This is how your purchase request will look when printed'
                    }
                  </p>
                </CardHeader>
              </Card>
              {activeSection === 'receipt' ? (
                <ReceiptPreview data={receiptData} />
              ) : (
                <PurchaseRequestPreview data={purchaseRequestData} />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
