export type Language = 'ar' | 'fr';

export const translations = {
  ar: {
    // Header
    companyName: 'IMGSA TECHNOLOGY',
    receiptSubtitle: 'إيصالات تسليم البضائع الاحترافية',
    purchaseRequestSubtitle: 'إدارة طلبات الشراء',
    print: 'طباعة',
    downloadPDF: 'تحميل PDF',
    
    // Navigation
    receipt: 'إيصال',
    purchaseRequest: 'طلب شراء',
    
    // Form titles
    receiptDetails: 'تفاصيل الإيصال',
    purchaseRequestDetails: 'تفاصيل طلب الشراء',
    receiptFormDescription: 'املأ المعلومات أدناه لإنشاء الإيصال',
    purchaseRequestFormDescription: 'املأ المعلومات أدناه لإنشاء طلب الشراء',
    livePreview: 'معاينة مباشرة',
    receiptPreviewDescription: 'هكذا سيبدو الإيصال عند الطباعة',
    purchaseRequestPreviewDescription: 'هكذا سيبدو طلب الشراء عند الطباعة',
    
    // Company Information
    companyInformation: 'معلومات الشركة',
    companyName_field: 'اسم الشركة *',
    registrationNumber: 'رقم التسجيل',
    addressLine1: 'العنوان - السطر 1',
    phone: 'الهاتف',
    email: 'البريد الإلكتروني',
    
    // Document Information
    documentInformation: 'معلومات المستند',
    place: 'المكان',
    date: 'التاريخ',
    documentNumber: 'رقم المستند',
    
    // Parties
    parties: 'الأطراف',
    recipient: 'المستلم',
    issuer: 'المُصدر',
    fullName: 'الاسم الكامل *',
    jobTitle: 'المسمى الوظيفي',
    idNumber: 'رقم الهوية',
    
    // Requester Information
    requesterInformation: 'معلومات الطالب',
    requesterName: 'اسم الطالب',
    department: 'القسم',
    
    // Equipment/Items
    equipmentList: 'قائمة المعدات',
    requestedItems: 'العناصر المطلوبة',
    addItem: 'إضافة عنصر',
    item: 'عنصر',
    noItemsYet: 'لم يتم إضافة عناصر بعد. انقر على "إضافة عنصر" للبدء.',
    description: 'الوصف *',
    quantity: 'الكمية *',
    unit: 'الوحدة',
    reference: 'المرجع/الموديل',
    serialNumber: 'الرقم التسلسلي',
    notes_field: 'ملاحظات',
    itemName: 'اسم العنصر/الوصف',
    technicalSpecs: 'المواصفات الفنية',
    observation: 'الملاحظة',
    
    // Confirmations & Notes
    confirmationsNotes: 'التأكيدات والملاحظات',
    confirmationText: 'نص التأكيد',
    additionalNotes: 'ملاحظات إضافية',
    additionalNotesPlaceholder: 'أي ملاحظات أو تعليقات إضافية...',
    
    // Preview Document
    issuedAt: 'صدر في',
    receiptTitle: 'إيصال',
    receiptSubtitle_doc: 'إيصال استلام المعدات',
    purchaseRequestTitle: 'طلب شراء',
    purchaseRequestSubtitle_doc: 'طلب الشراء',
    documentNo: 'رقم المستند',
    
    // Receipt Preview
    acknowledgeReceived: 'أنا',
    acknowledgeReceivedPart2: 'أقر باستلام بتاريخ',
    acknowledgeReceivedPart3: 'من',
    acknowledgeReceivedPart4: 'المعدات التالية:',
    
    // Table Headers
    descriptionHeader: 'الوصف',
    qtyHeader: 'الكمية',
    unitHeader: 'الوحدة',
    referenceHeader: 'المرجع',
    serialNoHeader: 'الرقم التسلسلي',
    itemNameHeader: 'تسمية العنصر',
    technicalSpecsHeader: 'المواصفات الفنية',
    quantityHeader: 'الكمية',
    observationHeader: 'الملاحظة',
    
    // Signatures
    requester: 'الطالب',
    departmentHead: 'رئيس القسم',
    purchasingManager: 'مسؤول المشتريات/المخزن',
    name: 'الاسم',
    approval: 'الموافقة',
    finalApproval: 'الموافقة النهائية',
    signature: 'التوقيع',
    
    // Placeholders
    enterCompanyName: 'أدخل اسم الشركة',
    taxRegistration: 'رقم الضريبة/التسجيل',
    streetAddress: 'عنوان الشارع',
    phoneNumber: 'رقم الهاتف',
    emailAddress: 'عنوان البريد الإلكتروني',
    documentPlace: 'مكان المستند',
    equipmentDescription: 'وصف المعدات',
    modelNumber: 'رقم الموديل',
    serialNumberPlaceholder: 'الرقم التسلسلي',
    additionalNotesItem: 'ملاحظات إضافية',
    confirmationTextPlaceholder: 'أقر بأنني استلمت المعدات المذكورة أعلاه بحالة جيدة وبالكمية المحددة.',
    anyAdditionalNotes: 'أي ملاحظات أو تعليقات إضافية',
    requesterFullName: 'الاسم الكامل للطالب',
    departmentName: 'اسم القسم',
    itemNameDescription: 'اسم/وصف العنصر',
    technicalRequirements: 'المواصفات والمتطلبات الفنية',
    additionalObservations: 'ملاحظات أو تعليقات إضافية',
  },
  fr: {
    // Header
    companyName: 'IMGSA TECHNOLOGY',
    receiptSubtitle: 'Décharges professionnelles de remise de marchandises',
    purchaseRequestSubtitle: 'Gestion des demandes d\'achat',
    print: 'Imprimer',
    downloadPDF: 'Télécharger PDF',
    
    // Navigation
    receipt: 'Décharge',
    purchaseRequest: 'Demande d\'Achat',
    
    // Form titles
    receiptDetails: 'Détails de la décharge',
    purchaseRequestDetails: 'Détails de la demande d\'achat',
    receiptFormDescription: 'Remplissez les informations ci-dessous pour générer votre décharge',
    purchaseRequestFormDescription: 'Remplissez les informations ci-dessous pour générer votre demande d\'achat',
    livePreview: 'Aperçu en direct',
    receiptPreviewDescription: 'Voici à quoi ressemblera votre décharge lors de l\'impression',
    purchaseRequestPreviewDescription: 'Voici à quoi ressemblera votre demande d\'achat lors de l\'impression',
    
    // Company Information
    companyInformation: 'Informations sur l\'entreprise',
    companyName_field: 'Nom de l\'entreprise *',
    registrationNumber: 'Numéro d\'enregistrement',
    addressLine1: 'Adresse - Ligne 1',
    phone: 'Téléphone',
    email: 'E-mail',
    
    // Document Information
    documentInformation: 'Informations sur le document',
    place: 'Lieu',
    date: 'Date',
    documentNumber: 'Numéro de document',
    
    // Parties
    parties: 'Parties',
    recipient: 'Destinataire',
    issuer: 'Émetteur',
    fullName: 'Nom complet *',
    jobTitle: 'Poste',
    idNumber: 'Numéro d\'identité',
    
    // Requester Information
    requesterInformation: 'Informations sur le demandeur',
    requesterName: 'Nom du demandeur',
    department: 'Département',
    
    // Equipment/Items
    equipmentList: 'Liste des équipements',
    requestedItems: 'Articles demandés',
    addItem: 'Ajouter un article',
    item: 'Article',
    noItemsYet: 'Aucun article ajouté pour le moment. Cliquez sur "Ajouter un article" pour commencer.',
    description: 'Description *',
    quantity: 'Quantité *',
    unit: 'Unité',
    reference: 'Référence/Modèle',
    serialNumber: 'Numéro de série',
    notes_field: 'Notes',
    itemName: 'Nom de l\'article/Description',
    technicalSpecs: 'Spécifications techniques',
    observation: 'Observation',
    
    // Confirmations & Notes
    confirmationsNotes: 'Confirmations et notes',
    confirmationText: 'Texte de confirmation',
    additionalNotes: 'Notes supplémentaires',
    additionalNotesPlaceholder: 'Toutes notes ou commentaires supplémentaires...',
    
    // Preview Document
    issuedAt: 'Émis à',
    receiptTitle: 'DÉCHARGE',
    receiptSubtitle_doc: 'Reçu d\'équipement',
    purchaseRequestTitle: 'DEMANDE D\'ACHAT',
    purchaseRequestSubtitle_doc: 'Demande d\'achat',
    documentNo: 'N° de document',
    
    // Receipt Preview
    acknowledgeReceived: 'Je soussigné(e)',
    acknowledgeReceivedPart2: 'reconnais avoir reçu le',
    acknowledgeReceivedPart3: 'de',
    acknowledgeReceivedPart4: 'les équipements suivants:',
    
    // Table Headers
    descriptionHeader: 'Description',
    qtyHeader: 'Qté',
    unitHeader: 'Unité',
    referenceHeader: 'Référence',
    serialNoHeader: 'N° de série',
    itemNameHeader: 'Désignation de l\'article',
    technicalSpecsHeader: 'Spécifications techniques',
    quantityHeader: 'Quantité',
    observationHeader: 'Observation',
    
    // Signatures
    requester: 'Demandeur',
    departmentHead: 'Chef de Département',
    purchasingManager: 'Responsable Achats/Magasin',
    name: 'Nom',
    approval: 'Approbation',
    finalApproval: 'Approbation finale',
    signature: 'Signature',
    
    // Placeholders
    enterCompanyName: 'Entrez le nom de l\'entreprise',
    taxRegistration: 'Numéro fiscal/d\'enregistrement',
    streetAddress: 'Adresse',
    phoneNumber: 'Numéro de téléphone',
    emailAddress: 'Adresse e-mail',
    documentPlace: 'Lieu du document',
    equipmentDescription: 'Description de l\'équipement',
    modelNumber: 'Numéro de modèle',
    serialNumberPlaceholder: 'Numéro de série',
    additionalNotesItem: 'Notes supplémentaires',
    confirmationTextPlaceholder: 'Je confirme par la présente avoir reçu l\'équipement susmentionné en bon état et dans la quantité spécifiée.',
    anyAdditionalNotes: 'Toutes remarques ou notes supplémentaires',
    requesterFullName: 'Nom complet du demandeur',
    departmentName: 'Nom du département',
    itemNameDescription: 'Nom/description de l\'article',
    technicalRequirements: 'Spécifications et exigences techniques',
    additionalObservations: 'Observations ou notes supplémentaires',
  },
};
