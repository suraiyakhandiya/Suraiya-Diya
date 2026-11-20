import React, { useState } from 'react';
import {
  ArrowRight,
  Check,
  Menu,
  X,
} from 'lucide-react';
import {
  CAPABILITIES,
  COMPETITOR_MATRIX,
  CUSTOMER_SEGMENTS,
  MACRO_METRICS,
  PRICING_TIERS,
  RISK_MATRIX,
  ROADMAP_PHASES,
} from './data/hisabproData';
import { ResilientImage } from './components/ResilientImage';
import { InteractiveAppSandbox } from './components/InteractiveAppSandbox';
import { CreditScoreSimulator } from './components/CreditScoreSimulator';

const HERO_IMG = '/src/assets/images/hero_merchant_bangladesh_1795173590003.jpg';
const FCOMMERCE_IMG = '/src/assets/images/fcommerce_seller_studio_1795173589532.jpg';
const WHOLESALE_IMG = '/src/assets/images/wholesale_inventory_hub_1795173589591.jpg';

export function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedSegmentId, setSelectedSegmentId] = useState<string>(CUSTOMER_SEGMENTS[0].id);
  const [selectedPlanId, setSelectedPlanId] = useState<string>('standard');

  // Early Access / Partner Inquiry Form State
  const [businessName, setBusinessName] = useState('');
  const [contactInput, setContactInput] = useState('');
  const [segmentInput, setSegmentInput] = useState('Neighborhood Micro-Retailer');
  const [formError, setFormError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const activeSegment =
    CUSTOMER_SEGMENTS.find((s) => s.id === selectedSegmentId) ?? CUSTOMER_SEGMENTS[0];

  const handleSelectPlan = (planId: string) => {
    setSelectedPlanId(planId);
    const el = document.getElementById('early-access');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = businessName.trim();
    const trimmedContact = contactInput.trim();

    if (trimmedName.length < 2) {
      setFormError('Please enter your business or shop name.');
      return;
    }

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedContact);
    const isBDPhone = /^(\+?880|0)1[3-9]\d{8}$/.test(trimmedContact.replace(/[\s-]/g, ''));

    if (!isEmail && !isBDPhone) {
      setFormError('Enter a valid Bangladeshi mobile number (+8801XXXXXXXXX) or email address.');
      return;
    }

    setFormError('');
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#fafaf8] text-stone-900">
      {/* Top Bar Contract: 3 zones separated by gap-8 */}
      <header className="sticky top-0 z-40 bg-[#fafaf8]/95 backdrop-blur-sm border-b border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single-element Brand Wordmark */}
          <a
            href="#top"
            className="text-xl font-bold tracking-tight text-stone-900 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-emerald-800 rounded"
          >
            HisabPro
          </a>

          {/* Zone 2: 4 concise single-line nav links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600"
          >
            <a
              href="#capabilities"
              className="hover:text-stone-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Capabilities
            </a>
            <a
              href="#market"
              className="hover:text-stone-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Market
            </a>
            <a
              href="#credit-score"
              className="hover:text-stone-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Credit Score
            </a>
            <a
              href="#pricing"
              className="hover:text-stone-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Pricing
            </a>
          </nav>

          {/* Zone 3: 1 primary CTA (+ mobile menu button on small screens) */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#early-access"
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-800"
            >
              Get Early Access
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-stone-200 text-stone-700 hover:bg-stone-100 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-stone-200 bg-white px-4 py-4 space-y-2">
            <a
              href="#capabilities"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-stone-700 hover:text-stone-900"
            >
              Capabilities
            </a>
            <a
              href="#market"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-stone-700 hover:text-stone-900"
            >
              Market
            </a>
            <a
              href="#credit-score"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-stone-700 hover:text-stone-900"
            >
              Credit Score
            </a>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-stone-700 hover:text-stone-900"
            >
              Pricing
            </a>
            <a
              href="#early-access"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 inline-flex w-full items-center justify-center px-4 py-2.5 text-sm font-semibold text-white bg-emerald-800 rounded-lg"
            >
              Get Early Access
            </a>
          </div>
        )}
      </header>

      <main id="top">
        {/* SECTION 1: HERO PROPOSITION + INTERACTIVE SANDBOX */}
        <section className="pt-10 pb-16 sm:pt-14 sm:pb-20 border-b border-stone-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              {/* Left Column: Core Proposition + Hero Merchant Photo */}
              <div className="lg:col-span-6 space-y-6">
                <p className="text-xs sm:text-sm font-medium text-emerald-800">
                  Bangladesh CMSME Platform · Dual Bangla–English · Offline-First SQLite
                </p>

                <h1
                  className="font-bold tracking-tight text-stone-900 leading-[1.08]"
                  style={{
                    fontSize: 'clamp(2.25rem, 4vw, 3.65rem)',
                    textWrap: 'balance',
                  }}
                >
                  From paper bakir khata to bank-ready business records.
                </h1>

                <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-xl">
                  HisabPro gives Bangladeshi micro-retailers, boutiques, and F-commerce merchants 3-second daily cash logging, automated net profit &amp; loss, practical stock control, and a verified credit trail—without corporate ERP complexity or cost.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-1">
                  <a
                    href="#early-access"
                    className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-800"
                  >
                    <span>Start Free Merchant Ledger</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    href="#market"
                    className="inline-flex items-center gap-1.5 px-4 py-3 text-sm font-medium text-stone-700 hover:text-stone-900 underline underline-offset-4 whitespace-nowrap shrink-0"
                  >
                    Read Business Strategy
                  </a>
                </div>

                {/* Documentary Hero Image */}
                <div className="pt-2">
                  <div className="relative rounded-2xl overflow-hidden border border-stone-200 aspect-[16/9]">
                    <ResilientImage
                      src={HERO_IMG}
                      alt="Bangladeshi retail shop owner using a smartphone at his wooden counter with neatly stocked shelves"
                      fallbackTitle="Bangladeshi CMSME Counter Operations"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-5">
                      <p className="text-xs sm:text-sm text-stone-100 font-medium">
                        Built for 7.9M–8.0M enterprises across Dhaka, Chattogram, Narayanganj, and nationwide F-commerce.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive Live Product Sandbox */}
              <div className="lg:col-span-6">
                <div className="mb-3 flex items-center justify-between text-xs text-stone-500">
                  <span className="font-medium text-stone-700">
                    Interactive Product Preview — Try Pelam / Dilam, Stock &amp; Baki
                  </span>
                  <span className="font-mono">EN / বাংলা</span>
                </div>
                <InteractiveAppSandbox />
              </div>
            </div>

            {/* 4-Column Macro Proof Strip Below Hero Split */}
            <div className="mt-14 pt-10 border-t border-stone-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {MACRO_METRICS.map((metric) => (
                <div key={metric.label} className="space-y-1.5">
                  <div className="font-mono text-2xl sm:text-3xl font-bold text-stone-900 tabular-nums">
                    {metric.value}
                  </div>
                  <div className="text-sm font-semibold text-stone-900">{metric.label}</div>
                  <p className="text-xs text-stone-600 leading-relaxed">{metric.detail}</p>
                  <div className="text-[11px] text-stone-500 pt-0.5">{metric.source}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 2: CORE CAPABILITIES BENTO GRID + REAL COMMERCE SCENES */}
        <section id="capabilities" className="py-16 sm:py-24 border-b border-stone-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="text-xs font-medium text-emerald-800">
                Modular Product Architecture
              </p>
              <h2
                className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-stone-900"
                style={{ textWrap: 'balance' }}
              >
                Practical bookkeeping rigor engineered for 3-second mobile entry.
              </h2>
              <p className="mt-3 text-base text-stone-600 leading-relaxed">
                HisabPro bridges ultra-basic digital due books and costly corporate ERPs by uniting cash logging, automated net P&amp;L, stock control, and invoicing in one bilingual workflow.
              </p>
            </div>

            {/* Asymmetric Bento Grid */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              {CAPABILITIES.map((cap, idx) => (
                <article
                  key={cap.index}
                  className={`rounded-2xl border border-stone-200 p-6 sm:p-7 flex flex-col justify-between bg-[#fafaf8] ${
                    idx === 0 || idx === 1 ? 'md:col-span-1 lg:col-span-1' : ''
                  } ${idx === 0 ? 'md:col-span-2 lg:col-span-2 bg-emerald-950 text-stone-100 border-emerald-900' : ''}`}
                >
                  <div>
                    <div className="flex items-baseline justify-between gap-4">
                      <span
                        className={`font-mono text-xs font-semibold tabular-nums ${
                          idx === 0 ? 'text-emerald-400' : 'text-emerald-800'
                        }`}
                      >
                        {cap.index}
                      </span>
                      <span
                        className={`text-xs ${
                          idx === 0 ? 'text-stone-300' : 'text-stone-500'
                        }`}
                      >
                        {cap.banglaLabel}
                      </span>
                    </div>

                    <h3
                      className={`mt-4 text-xl font-bold tracking-tight ${
                        idx === 0 ? 'text-white' : 'text-stone-900'
                      }`}
                    >
                      {cap.title}
                    </h3>
                    <p
                      className={`mt-3 text-sm leading-relaxed ${
                        idx === 0 ? 'text-stone-300' : 'text-stone-600'
                      }`}
                    >
                      {cap.summary}
                    </p>
                  </div>

                  <div
                    className={`mt-6 pt-4 border-t text-xs font-medium ${
                      idx === 0
                        ? 'border-emerald-800/80 text-emerald-300'
                        : 'border-stone-200 text-stone-800'
                    }`}
                  >
                    Outcome: {cap.outcome}
                  </div>
                </article>
              ))}
            </div>

            {/* Documentary Field Scenes: F-Commerce & Wholesale Hubs */}
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative rounded-2xl overflow-hidden border border-stone-200 aspect-[4/3]">
                <ResilientImage
                  src={FCOMMERCE_IMG}
                  alt="Bangladeshi F-commerce entrepreneur packing boutique orders and checking mobile ledger"
                  fallbackTitle="F-Commerce Order & Parcel Reconciliation"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent p-6">
                  <div className="text-xs font-medium text-emerald-300">
                    400,000+ Active Facebook Sellers
                  </div>
                  <h3 className="mt-1 text-lg font-bold text-white">
                    Instant WhatsApp Invoices &amp; COD Reconciliation
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-stone-200 leading-relaxed">
                    Generate dual-language customer bills in seconds while deducting parcel stock automatically.
                  </p>
                </div>
              </div>

              <div className="relative rounded-2xl overflow-hidden border border-stone-200 aspect-[4/3]">
                <ResilientImage
                  src={WHOLESALE_IMG}
                  alt="Bangladeshi wholesale merchant reviewing stacked carton inventory with mobile app"
                  fallbackTitle="Wholesale & Commercial Hub Inventory"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent p-6">
                  <div className="text-xs font-medium text-emerald-300">
                    Islampur · Chawkbazar · Narayanganj
                  </div>
                  <h3 className="mt-1 text-lg font-bold text-white">
                    Batch Stock &amp; Retail Buyer Credit Limits
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-stone-200 leading-relaxed">
                    Track supplier payables, carton quantities, and multi-staff permissions across wholesale counters.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: TARGET SEGMENTS & COMPETITIVE POSITIONING */}
        <section id="market" className="py-16 sm:py-24 border-b border-stone-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            {/* Interactive 5-Segment Explorer */}
            <div>
              <div className="max-w-2xl">
                <p className="text-xs font-medium text-emerald-800">
                  Target Customer Segmentation
                </p>
                <h2
                  className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-stone-900"
                  style={{ textWrap: 'balance' }}
                >
                  Engineered for five high-velocity MSME profiles.
                </h2>
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {CUSTOMER_SEGMENTS.map((seg) => {
                  const isActive = seg.id === activeSegment.id;
                  return (
                    <button
                      key={seg.id}
                      type="button"
                      onClick={() => setSelectedSegmentId(seg.id)}
                      className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        isActive
                          ? 'bg-emerald-800 text-white border-emerald-800'
                          : 'bg-white text-stone-700 border-stone-200 hover:border-stone-300 hover:bg-stone-50'
                      }`}
                    >
                      {seg.name}
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-stone-200 pb-6 lg:pb-0 lg:pr-8">
                  <div className="text-xs text-stone-500">{activeSegment.banglaName}</div>
                  <h3 className="mt-1 text-2xl font-bold text-stone-900">{activeSegment.name}</h3>
                  <p className="mt-3 text-sm font-medium text-emerald-800">{activeSegment.scale}</p>
                </div>

                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div>
                    <div className="text-xs font-semibold text-stone-500">Operational Friction</div>
                    <p className="mt-2 text-sm text-stone-700 leading-relaxed">
                      {activeSegment.primaryFriction}
                    </p>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-stone-500">HisabPro Workflow</div>
                    <p className="mt-2 text-sm text-stone-700 leading-relaxed">
                      {activeSegment.hisabproWorkflow}
                    </p>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-stone-500">Measured Outcome</div>
                    <p className="mt-2 text-sm font-medium text-stone-900 leading-relaxed">
                      {activeSegment.keyOutcome}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Competitive Matrix */}
            <div>
              <div className="max-w-2xl">
                <p className="text-xs font-medium text-emerald-800">
                  The Smart Scale-Up Positioning Thesis
                </p>
                <h3 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-stone-900">
                  Capturing the gap between basic due books and heavy corporate ERP.
                </h3>
              </div>

              <div className="mt-8 overflow-x-auto bg-white border border-stone-200 rounded-2xl">
                <table className="w-full text-left border-collapse min-w-[680px]">
                  <thead>
                    <tr className="border-b border-stone-200 bg-stone-50 text-xs font-semibold text-stone-600">
                      <th className="py-4 px-5">Feature / Dimension</th>
                      <th className="py-4 px-5">TallyKhata</th>
                      <th className="py-4 px-5">Hishab.com.bd</th>
                      <th className="py-4 px-5">SigmaTurn ERP</th>
                      <th className="py-4 px-5 bg-emerald-950 text-white">HisabPro</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 text-sm">
                    {COMPETITOR_MATRIX.map((row) => (
                      <tr key={row.dimension} className="hover:bg-stone-50/70 transition-colors">
                        <td className="py-3.5 px-5 font-medium text-stone-900">{row.dimension}</td>
                        <td className="py-3.5 px-5 text-stone-600">{row.tallykhata}</td>
                        <td className="py-3.5 px-5 text-stone-600">{row.hishab}</td>
                        <td className="py-3.5 px-5 text-stone-600 tabular-nums">{row.sigmaturn}</td>
                        <td className="py-3.5 px-5 font-semibold text-emerald-900 bg-emerald-50/50 tabular-nums">
                          {row.hisabpro}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: CREDIT SCORING (MCSI) & COMMERCIAL PRICING */}
        <section id="credit-score" className="py-16 sm:py-24 border-b border-stone-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
            <CreditScoreSimulator />

            {/* Pricing Tiers */}
            <div id="pricing">
              <div className="max-w-2xl">
                <p className="text-xs font-medium text-emerald-800">
                  Hybrid SaaS &amp; Fintech Revenue Architecture
                </p>
                <h2
                  className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-stone-900"
                  style={{ textWrap: 'balance' }}
                >
                  Free core ledger to build trust. Practical SaaS tiers as merchants scale.
                </h2>
                <p className="mt-3 text-base text-stone-600 leading-relaxed">
                  Core Pelam/Dilam logging remains ৳0 forever to onboard merchants across Bangladesh, paired with ৳199–৳499 monthly automation and 1.0%–2.0% bank loan origination commissions.
                </p>
              </div>

              <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                {PRICING_TIERS.map((tier) => (
                  <div
                    key={tier.id}
                    className={`rounded-2xl p-7 flex flex-col justify-between border ${
                      tier.highlighted
                        ? 'bg-emerald-950 text-stone-100 border-emerald-900'
                        : 'bg-[#fafaf8] text-stone-900 border-stone-200'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-lg font-bold">{tier.name}</h3>
                        {tier.highlighted && (
                          <span className="text-xs font-medium text-emerald-300">
                            Recommended
                          </span>
                        )}
                      </div>

                      <div className="mt-4 flex items-baseline gap-1">
                        <span className="font-mono text-4xl font-bold tabular-nums">
                          {tier.price}
                        </span>
                        <span
                          className={`text-sm ${
                            tier.highlighted ? 'text-stone-300' : 'text-stone-500'
                          }`}
                        >
                          {tier.period}
                        </span>
                      </div>

                      <p
                        className={`mt-2 text-sm leading-relaxed ${
                          tier.highlighted ? 'text-stone-300' : 'text-stone-600'
                        }`}
                      >
                        {tier.audience}
                      </p>

                      <ul className="mt-6 pt-6 border-t border-current/15 space-y-3">
                        {tier.features.map((feat) => (
                          <li key={feat} className="flex items-start gap-2.5 text-sm">
                            <Check
                              className={`w-4 h-4 mt-0.5 shrink-0 ${
                                tier.highlighted ? 'text-emerald-400' : 'text-emerald-800'
                              }`}
                            />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleSelectPlan(tier.id)}
                      className={`mt-8 w-full py-2.5 px-4 text-sm font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                        tier.highlighted
                          ? 'bg-white text-emerald-950 hover:bg-stone-100'
                          : 'bg-stone-900 text-white hover:bg-stone-800'
                      }`}
                    >
                      {tier.ctaLabel}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: ROADMAP, RISK MITIGATION & EARLY ACCESS FORM */}
        <section className="py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            {/* 24-Month Execution Roadmap */}
            <div>
              <div className="max-w-2xl">
                <p className="text-xs font-medium text-emerald-800">
                  24-Month Execution &amp; Go-To-Market Plan
                </p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight text-stone-900">
                  Phased rollout to 500,000 active merchants.
                </h2>
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                {ROADMAP_PHASES.map((item) => (
                  <div
                    key={item.phase}
                    className="bg-white border border-stone-200 rounded-2xl p-6 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-mono font-semibold text-emerald-800">
                          {item.phase}
                        </span>
                        <span className="text-stone-500 font-mono">{item.window}</span>
                      </div>
                      <h3 className="mt-3 text-lg font-bold text-stone-900">{item.title}</h3>
                      <p className="mt-1 text-xs font-semibold text-emerald-800">
                        Target: {item.target}
                      </p>
                      <ul className="mt-4 pt-4 border-t border-stone-100 space-y-2.5 text-sm text-stone-600">
                        {item.deliverables.map((del) => (
                          <li key={del} className="leading-relaxed">
                            · {del}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Risk Governance + Early Access Form Split */}
            <div
              id="early-access"
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4"
            >
              {/* Risk Table */}
              <div className="lg:col-span-7 bg-white border border-stone-200 rounded-2xl p-6 sm:p-8">
                <h3 className="text-xl font-bold text-stone-900">
                  Operational Risk &amp; Compliance Governance
                </h3>
                <p className="mt-1 text-sm text-stone-600">
                  Proactive technical and distribution safeguards for the Bangladesh MSME ecosystem.
                </p>

                <div className="mt-6 divide-y divide-stone-100">
                  {RISK_MATRIX.map((risk) => (
                    <div key={risk.dimension} className="py-4 first:pt-0 last:pb-0">
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-sm font-semibold text-stone-900">
                          {risk.dimension}
                        </span>
                        <span
                          className={`text-xs font-medium ${
                            risk.severity === 'High' ? 'text-amber-800' : 'text-stone-600'
                          }`}
                        >
                          Severity: {risk.severity}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-stone-500">Trigger: {risk.trigger}</p>
                      <p className="mt-1.5 text-sm text-stone-700 leading-relaxed">
                        {risk.mitigation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lead Capture / Onboarding Form */}
              <div className="lg:col-span-5 bg-white border border-stone-200 rounded-2xl p-6 sm:p-8">
                <p className="text-xs font-medium text-emerald-800">
                  Merchant &amp; Banking Partner Onboarding
                </p>
                <h3 className="mt-1.5 text-2xl font-bold text-stone-900">
                  Request HisabPro Early Access
                </h3>
                <p className="mt-2 text-sm text-stone-600 leading-relaxed">
                  Join our Dhaka &amp; F-commerce launch cohort, or connect as a commercial bank / MFI credit partner.
                </p>

                {submitted ? (
                  <div className="mt-6 p-5 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2">
                    <div className="flex items-center gap-2 text-emerald-900 font-semibold text-sm">
                      <Check className="w-4 h-4" />
                      <span>Onboarding Request Registered</span>
                    </div>
                    <p className="text-sm text-emerald-800 leading-relaxed">
                      Thank you, <strong>{businessName}</strong>. Our Dhaka onboarding team will reach out via{' '}
                      <span className="font-mono">{contactInput}</span> for the{' '}
                      <strong>
                        {PRICING_TIERS.find((p) => p.id === selectedPlanId)?.name}
                      </strong>{' '}
                      tier.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setBusinessName('');
                        setContactInput('');
                      }}
                      className="mt-2 text-xs font-semibold text-emerald-900 underline cursor-pointer"
                    >
                      Submit another business
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleLeadSubmit} className="mt-6 space-y-4" noValidate>
                    <div>
                      <label
                        htmlFor="biz-name"
                        className="block text-xs font-semibold text-stone-700 mb-1.5"
                      >
                        Business or Shop Name
                      </label>
                      <input
                        id="biz-name"
                        type="text"
                        required
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        placeholder="e.g. Dhaka Jamdani House"
                        className="w-full px-3.5 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-800"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="biz-contact"
                        className="block text-xs font-semibold text-stone-700 mb-1.5"
                      >
                        Bangladeshi Mobile (+880) or Email
                      </label>
                      <input
                        id="biz-contact"
                        type="text"
                        required
                        value={contactInput}
                        onChange={(e) => setContactInput(e.target.value)}
                        placeholder="+8801711000000 or owner@shop.com.bd"
                        className="w-full px-3.5 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-800"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label
                          htmlFor="biz-segment"
                          className="block text-xs font-semibold text-stone-700 mb-1.5"
                        >
                          Business Category
                        </label>
                        <select
                          id="biz-segment"
                          value={segmentInput}
                          onChange={(e) => setSegmentInput(e.target.value)}
                          className="w-full px-3 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-800"
                        >
                          <option>Neighborhood Micro-Retailer</option>
                          <option>Online / F-Commerce Seller</option>
                          <option>Boutique &amp; Lifestyle Shop</option>
                          <option>Service Provider / Freelancer</option>
                          <option>Wholesaler / Distributor</option>
                          <option>Bank / NBFI / MFI Partner</option>
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="biz-plan"
                          className="block text-xs font-semibold text-stone-700 mb-1.5"
                        >
                          Preferred Tier
                        </label>
                        <select
                          id="biz-plan"
                          value={selectedPlanId}
                          onChange={(e) => setSelectedPlanId(e.target.value)}
                          className="w-full px-3 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-800"
                        >
                          <option value="freemium">Freemium (৳0/mo)</option>
                          <option value="standard">Standard Growth (৳199/mo)</option>
                          <option value="premium">Premium Suite (৳499/mo)</option>
                        </select>
                      </div>
                    </div>

                    {formError && (
                      <p className="text-xs font-medium text-amber-800" role="alert">
                        {formError}
                      </p>
                    )}

                    <button
                      type="submit"
                      className="w-full py-3 px-4 text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors cursor-pointer"
                    >
                      Register for Early Access
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Quiet Footer */}
      <footer className="border-t border-stone-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="text-lg font-bold tracking-tight text-stone-900">HisabPro</div>
            <p className="mt-1 text-xs text-stone-500">
              Dhaka Field Hubs: Islampur · Chawkbazar · Narayanganj · Nationwide F-Commerce
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-medium text-stone-600">
            <a href="#capabilities" className="hover:text-stone-900">
              Capabilities
            </a>
            <a href="#market" className="hover:text-stone-900">
              Market
            </a>
            <a href="#credit-score" className="hover:text-stone-900">
              Credit Score
            </a>
            <a href="#pricing" className="hover:text-stone-900">
              Pricing
            </a>
            <a href="#early-access" className="hover:text-stone-900">
              Early Access
            </a>
          </div>

          <p className="text-xs text-stone-500">
            © 2026 HisabPro Bangladesh · Macro benchmarks via BBS, ADB, IFC &amp; Bangladesh Bank ICRR
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
