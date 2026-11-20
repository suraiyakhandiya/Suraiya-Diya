export interface MacroMetric {
  value: string;
  label: string;
  detail: string;
  source: string;
}

export interface CapabilityItem {
  index: string;
  title: string;
  banglaLabel: string;
  summary: string;
  outcome: string;
  featured?: boolean;
}

export interface CustomerSegment {
  id: string;
  name: string;
  banglaName: string;
  scale: string;
  primaryFriction: string;
  hisabproWorkflow: string;
  keyOutcome: string;
}

export interface CompetitorRow {
  dimension: string;
  tallykhata: string;
  hishab: string;
  sigmaturn: string;
  hisabpro: string;
}

export interface PricingTier {
  id: string;
  name: string;
  price: string;
  period: string;
  audience: string;
  features: string[];
  highlighted?: boolean;
  ctaLabel: string;
}

export interface RoadmapPhase {
  phase: string;
  window: string;
  title: string;
  target: string;
  deliverables: string[];
}

export interface RiskItem {
  dimension: string;
  severity: 'High' | 'Moderate';
  trigger: string;
  mitigation: string;
}

export const MACRO_METRICS: MacroMetric[] = [
  {
    value: '7.9M – 8.0M',
    label: 'Active CMSME Units',
    detail: 'Over 90% of all industrial units across urban and peri-urban Bangladesh',
    source: 'BBS / ADB Economic Census',
  },
  {
    value: '~80%',
    label: 'Non-Agricultural Workforce',
    detail: 'Approximately 24.5 million livelihoods anchored in small trade & services',
    source: 'Bangladesh Bureau of Statistics',
  },
  {
    value: '25% – 27%',
    label: 'National GDP Contribution',
    detail: 'Strategic policy priority targeting 32% GDP share through digital enablement',
    source: 'National CMSME Benchmark',
  },
  {
    value: '৳33,600 Cr',
    label: 'Unfunded MSME Credit Gap',
    detail: '~80% operate informally without bank-ready financial statements',
    source: 'IFC / LightCastle Partners (BDT)',
  },
];

export const CAPABILITIES: CapabilityItem[] = [
  {
    index: '01.',
    title: 'Daily Ledger (Pelam / Dilam)',
    banglaLabel: 'দৈনিক পেলাম ও দিলাম খাতা',
    summary:
      'Replaces confusing accounting debits and credits with intuitive Received (Pelam) and Paid (Dilam) entries logged in 3 to 5 seconds—even offline via local SQLite storage.',
    outcome: 'Eliminates manual bakir khata arithmetic errors and lost paper pages.',
    featured: true,
  },
  {
    index: '02.',
    title: 'Automated Real-Time Net P&L',
    banglaLabel: 'স্বয়ংক্রিয় লাভ-ক্ষতির হিসাব',
    summary:
      'Separates gross cash flow from actual operating margin by factoring supplier bills, rent, and delivery costs automatically across daily, weekly, and monthly views.',
    outcome: 'Gives merchants instant clarity on true net profitability without spreadsheets.',
    featured: true,
  },
  {
    index: '03.',
    title: 'Product Stock & Inventory Control',
    banglaLabel: 'পণ্য ও স্টক ব্যবস্থাপনা',
    summary:
      'Links every sale directly to item-level stock deduction, purchase cost tracking, and low-stock reorder alerts tailored for boutiques, shops, and wholesalers.',
    outcome: 'Prevents high-margin stockouts and undetected inventory shrinkage.',
  },
  {
    index: '04.',
    title: 'Customer & Supplier Baki Khata',
    banglaLabel: 'ক্রেতা ও সরবরাহকারী বাকি ম্যানেজার',
    summary:
      'Maintains itemized receivable profiles, running balances, and supplier payables with one-tap Bangla or English SMS and WhatsApp payment reminders.',
    outcome: 'Accelerates cash collection and reduces informal credit bottlenecks.',
  },
  {
    index: '05.',
    title: 'Dual-Language Digital Invoicing',
    banglaLabel: 'বাংলা ও ইংরেজি ডিজিটাল ইনভয়েস',
    summary:
      'Generates branded receipts in Bangla and English ready for instant WhatsApp sharing, SMS confirmation, or portable Bluetooth thermal POS printing.',
    outcome: 'Professionalizes F-commerce parcel billing and counter checkout.',
  },
  {
    index: '06.',
    title: 'Bank-Ready Credit Score Export',
    banglaLabel: 'ব্যাংক ঋণের ক্রেডিট প্রোফাইল',
    summary:
      'Transforms verified, timestamped transaction trails into a Merchant Credit Score Index (MCSI) aligned with Bangladesh Bank ICRR standards upon owner consent.',
    outcome: 'Unlocks collateral-free working capital from partner banks & NBFIs.',
  },
];

export const CUSTOMER_SEGMENTS: CustomerSegment[] = [
  {
    id: 'mudidokan',
    name: 'Neighborhood Micro-Retailers',
    banglaName: 'মুদিদোকান ও কনভেনিয়েন্স শপ',
    scale: 'High daily transaction velocity & frequent household credit',
    primaryFriction:
      'Handwritten bakir khata pages tear or miscalculate, while customers delay settling informal monthly tabs.',
    hisabproWorkflow:
      '3-second Pelam/Dilam counter logging offline via SQLite, paired with automated Bangla SMS due reminders every week.',
    keyOutcome: 'Faster baki recovery and exact daily cash reconciliation at shop closing.',
  },
  {
    id: 'fcommerce',
    name: 'Online & F-Commerce Merchants',
    banglaName: 'ফেসবুক ও অনলাইন উদ্যোক্তা',
    scale: '400,000+ active Facebook apparel, cosmetics & lifestyle sellers',
    primaryFriction:
      'Cash-on-delivery (COD) courier reconciliation, untracked variant stock, and scattered messenger orders.',
    hisabproWorkflow:
      'One-tap WhatsApp digital invoices, automatic variant stock deduction, and delivery expense tracking inside Net P&L.',
    keyOutcome: 'Clear per-order profit margin after courier fees and ad spend.',
  },
  {
    id: 'boutiques',
    name: 'Boutiques & Lifestyle Retailers',
    banglaName: 'বুটিক ও ফ্যাশন আউটলেট',
    scale: 'Multi-SKU seasonal inventory and wholesale supplier payables',
    primaryFriction:
      'Confusing gross Eid/seasonal revenue with net profit while missing supplier installment dates.',
    hisabproWorkflow:
      'Purchase-cost linked stock control, supplier payable ledgers, and Bluetooth POS thermal receipt printing.',
    keyOutcome: 'Zero dead-stock blindspots and accurate seasonal margin reporting.',
  },
  {
    id: 'freelancers',
    name: 'Service Providers & Freelancers',
    banglaName: 'সার্ভিস প্রোভাইডার ও ফ্রিল্যান্সার',
    scale: 'Skilled technicians, studios, and independent consultants',
    primaryFriction:
      'Informal client billing without itemized receipts makes income verification impossible for bank loans.',
    hisabproWorkflow:
      'Clean English/Bangla PDF invoices, client expense tagging, and verified monthly cash-flow exports.',
    keyOutcome: 'Auditable income history ready for formal financial onboarding.',
  },
  {
    id: 'wholesalers',
    name: 'Peri-Urban Wholesalers',
    banglaName: 'পাইকারি ও পরিবেশক ব্যবসা',
    scale: 'Islampur, Chawkbazar, Narayanganj & regional supply hubs',
    primaryFriction:
      'Managing multi-carton batch inventory and setting safe credit ceilings for dozens of retail buyers.',
    hisabproWorkflow:
      'Multi-staff login permissions, retail buyer credit limits, and batch stock reorder alerts.',
    keyOutcome: 'Controlled receivables exposure and real-time warehouse visibility.',
  },
];

export const COMPETITOR_MATRIX: CompetitorRow[] = [
  {
    dimension: 'Primary Focus',
    tallykhata: 'Basic Due Book',
    hishab: 'Retail / F-Commerce',
    sigmaturn: 'Cloud ERP / NBR VAT',
    hisabpro: 'Smart Scale-Up Accounting',
  },
  {
    dimension: 'User Onboarding',
    tallykhata: 'Frictionless (Pelam/Dilam)',
    hishab: 'Moderate Setup',
    sigmaturn: 'Complex Enterprise Setup',
    hisabpro: 'Frictionless Dual-Language',
  },
  {
    dimension: 'Inventory Control',
    tallykhata: 'Minimal',
    hishab: 'Advanced',
    sigmaturn: 'Enterprise Warehousing',
    hisabpro: 'Practical Stock Management',
  },
  {
    dimension: 'Automated P&L',
    tallykhata: 'Basic Cash Flow',
    hishab: 'Standard',
    sigmaturn: 'Full Double-Entry',
    hisabpro: 'Automated Real-Time Net P&L',
  },
  {
    dimension: 'Tax Compliance',
    tallykhata: 'None',
    hishab: 'Basic Export',
    sigmaturn: 'Full NBR (Mushak 9.1)',
    hisabpro: 'Standard Statement Export',
  },
  {
    dimension: 'Banking Pipeline',
    tallykhata: 'TallyPay Wallet',
    hishab: 'Limited',
    sigmaturn: 'Bank Reconciliation',
    hisabpro: 'Bank Credit Rating API',
  },
  {
    dimension: 'Monthly Pricing',
    tallykhata: 'Freemium / Utility',
    hishab: 'Custom SaaS',
    sigmaturn: '৳1,499 / Month',
    hisabpro: '৳199 – ৳499 / Month',
  },
];

export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'freemium',
    name: 'Freemium Acquisition',
    price: '৳0',
    period: '/ month',
    audience: 'Micro-merchants transitioning off paper notebooks',
    features: [
      'Daily Pelam / Dilam cash & expense entry',
      'Customer Baki Khata (up to 30 monthly entries)',
      'Offline-first SQLite recording with auto cloud sync',
      'Dual Bangla & English interface',
    ],
    ctaLabel: 'Start Free Ledger',
  },
  {
    id: 'standard',
    name: 'Standard Growth',
    price: '৳199',
    period: '/ month',
    audience: 'Growing shops & F-commerce sellers tracking net profit',
    features: [
      'Unlimited daily transactions & customer profiles',
      'Automated real-time daily, weekly & monthly Net P&L',
      'Automated SMS & WhatsApp baki payment reminders',
      'Expense category analytics & supplier due tracking',
    ],
    highlighted: true,
    ctaLabel: 'Select Standard Plan',
  },
  {
    id: 'premium',
    name: 'Premium Business Suite',
    price: '৳499',
    period: '/ month',
    audience: 'Boutiques, multi-staff outlets & wholesale traders',
    features: [
      'Full product-wise inventory & reorder alerts',
      'Multi-staff access permissions & audit trail',
      'Custom Bangla/English digital & Bluetooth POS invoices',
      'CSV/PDF tax export & consented Bank Credit Score API',
    ],
    ctaLabel: 'Select Premium Suite',
  },
];

export const ROADMAP_PHASES: RoadmapPhase[] = [
  {
    phase: 'Phase 01',
    window: 'Months 1 – 6',
    title: 'Product Foundation & Core Growth',
    target: '100,000 registered active merchants',
    deliverables: [
      'Dual Bangla-English Android release with SQLite offline-first sync',
      'Freemium Pelam/Dilam ledger & Baki Khata rollout',
      'Field ambassador onboarding in Islampur, Chawkbazar & Narayanganj',
    ],
  },
  {
    phase: 'Phase 02',
    window: 'Months 7 – 14',
    title: 'Monetization & Inventory Suite',
    target: '5% paid conversion across ৳199 & ৳499 tiers',
    deliverables: [
      'Item-level inventory control & low-stock alerts',
      'WhatsApp & Bluetooth POS bilingual invoicing module',
      'Targeted digital acquisition across 400,000+ F-commerce sellers',
    ],
  },
  {
    phase: 'Phase 03',
    window: 'Months 15 – 24',
    title: 'Financial Inclusion & Credit API',
    target: '500,000 active users & bank loan pipeline',
    deliverables: [
      'Merchant Credit Score Index (MCSI) partner bank portal',
      'Collateral-free SME working capital pilots (1.0%–2.0% referral)',
      'Integration with MFS & Bangladesh Bank refinancing channels',
    ],
  },
];

export const RISK_MATRIX: RiskItem[] = [
  {
    dimension: 'User Retention / Churn',
    severity: 'High',
    trigger: 'Merchant drop-off after initial download',
    mitigation: 'Automated daily SMS closing summaries, stock alerts, and instant baki reminder utility',
  },
  {
    dimension: 'Data Security & Privacy',
    severity: 'High',
    trigger: 'Merchant concern over sensitive revenue records',
    mitigation: 'Bank-grade end-to-end encryption with explicit merchant-controlled credit sharing consent',
  },
  {
    dimension: 'Regulatory & VAT Pressure',
    severity: 'Moderate',
    trigger: 'Shifts in NBR tax reporting rules',
    mitigation: 'Standardized CSV/PDF financial exports aligned with formal bookkeeping requirements',
  },
  {
    dimension: 'Subscription Conversion',
    severity: 'Moderate',
    trigger: 'Price sensitivity on monthly SaaS fees',
    mitigation: 'Utility-gated invoicing and stock tools tied directly to measurable time & loss savings',
  },
];
