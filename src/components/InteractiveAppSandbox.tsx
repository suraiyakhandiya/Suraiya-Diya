import React, { useState } from 'react';
import {
  ArrowDownLeft,
  ArrowUpRight,
  Check,
  MessageSquare,
  Package,
  Plus,
  RefreshCw,
  Wifi,
  WifiOff,
} from 'lucide-react';

type Lang = 'en' | 'bn';
type SandboxTab = 'ledger' | 'stock' | 'baki';

interface LedgerEntry {
  id: string;
  type: 'pelam' | 'dilam';
  titleEn: string;
  titleBn: string;
  channel: string;
  amount: number;
  time: string;
  synced: boolean;
}

interface StockItem {
  id: string;
  nameEn: string;
  nameBn: string;
  sku: string;
  qty: number;
  reorderAt: number;
  unitCost: number;
}

interface BakiCustomer {
  id: string;
  nameEn: string;
  nameBn: string;
  phone: string;
  due: number;
  daysOverdue: number;
  reminded: boolean;
}

const INITIAL_LEDGER: LedgerEntry[] = [
  {
    id: 'tx-1',
    type: 'pelam',
    titleEn: 'Cotton Jamdani Saree (2 pcs)',
    titleBn: 'কটন জামদানি শাড়ি (২ পিস)',
    channel: 'bKash',
    amount: 4600,
    time: '10:42 AM',
    synced: true,
  },
  {
    id: 'tx-2',
    type: 'dilam',
    titleEn: 'Islampur Wholesale Restock',
    titleBn: 'ইসলামপুর পাইকারি মাল ক্রয়',
    channel: 'Cash',
    amount: 1850,
    time: '11:15 AM',
    synced: true,
  },
  {
    id: 'tx-3',
    type: 'pelam',
    titleEn: 'F-Commerce COD Settlement',
    titleBn: 'এফ-কমার্স সিওডি পেমেন্ট',
    channel: 'Nagad',
    amount: 3250,
    time: '01:08 PM',
    synced: true,
  },
];

const INITIAL_STOCK: StockItem[] = [
  {
    id: 'st-1',
    nameEn: 'Handloom Panjabi (Olive L)',
    nameBn: 'হ্যান্ডলুম পাঞ্জাবি (অলিভ এল)',
    sku: 'HP-OLV-L',
    qty: 14,
    reorderAt: 5,
    unitCost: 980,
  },
  {
    id: 'st-2',
    nameEn: 'Block Print Three-Piece',
    nameBn: 'ব্লক প্রিন্ট থ্রি-পিস',
    sku: 'BP-3PC-12',
    qty: 4,
    reorderAt: 6,
    unitCost: 1150,
  },
  {
    id: 'st-3',
    nameEn: 'Pure Mustard Oil (5L Jar)',
    nameBn: 'খাঁটি সরিষার তেল (৫ লিটার)',
    sku: 'MO-5L-BD',
    qty: 22,
    reorderAt: 8,
    unitCost: 1240,
  },
];

const INITIAL_BAKI: BakiCustomer[] = [
  {
    id: 'bk-1',
    nameEn: 'Tariqul Islam (Mirpur-10)',
    nameBn: 'তারিকুল ইসলাম (মিরপুর-১০)',
    phone: '+880 1712-449102',
    due: 2450,
    daysOverdue: 6,
    reminded: false,
  },
  {
    id: 'bk-2',
    nameEn: 'Nusrat Boutique House',
    nameBn: 'নুসরাত বুটিক হাউস',
    phone: '+880 1819-302814',
    due: 6800,
    daysOverdue: 12,
    reminded: false,
  },
];

const formatBDT = (val: number) => `৳${val.toLocaleString('en-US')}`;

export const InteractiveAppSandbox: React.FC = () => {
  const [lang, setLang] = useState<Lang>('en');
  const [activeTab, setActiveTab] = useState<SandboxTab>('ledger');
  const [isOffline, setIsOffline] = useState(false);

  const [entries, setEntries] = useState<LedgerEntry[]>(INITIAL_LEDGER);
  const [stock, setStock] = useState<StockItem[]>(INITIAL_STOCK);
  const [bakiList, setBakiList] = useState<BakiCustomer[]>(INITIAL_BAKI);

  const [entryType, setEntryType] = useState<'pelam' | 'dilam'>('pelam');
  const [noteInput, setNoteInput] = useState('');
  const [amountInput, setAmountInput] = useState('');
  const [formError, setFormError] = useState('');

  const totalPelam = entries
    .filter((e) => e.type === 'pelam')
    .reduce((acc, cur) => acc + cur.amount, 0);
  const totalDilam = entries
    .filter((e) => e.type === 'dilam')
    .reduce((acc, cur) => acc + cur.amount, 0);
  const netProfit = totalPelam - totalDilam;
  const totalBaki = bakiList.reduce((acc, cur) => acc + cur.due, 0);
  const pendingSyncCount = entries.filter((e) => !e.synced).length;

  const handleToggleOffline = () => {
    if (isOffline) {
      setIsOffline(false);
      setEntries((prev) => prev.map((e) => ({ ...e, synced: true })));
    } else {
      setIsOffline(true);
    }
  };

  const handleAddEntry = (e: React.FormEvent) => {
    e.preventDefault();
    const numericAmount = Number(amountInput);
    if (!noteInput.trim()) {
      setFormError(lang === 'en' ? 'Enter a short description' : 'বিবরণ লিখুন');
      return;
    }
    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      setFormError(lang === 'en' ? 'Enter a valid amount in ৳' : 'সঠিক টাকার পরিমাণ লিখুন');
      return;
    }

    setFormError('');
    const newEntry: LedgerEntry = {
      id: `tx-${Date.now()}`,
      type: entryType,
      titleEn: noteInput.trim(),
      titleBn: noteInput.trim(),
      channel: entryType === 'pelam' ? 'bKash' : 'Cash',
      amount: Math.round(numericAmount),
      time: lang === 'en' ? 'Just now' : 'এইমাত্র',
      synced: !isOffline,
    };

    setEntries((prev) => [newEntry, ...prev]);
    setNoteInput('');
    setAmountInput('');
  };

  const handleDecrementStock = (id: string) => {
    setStock((prev) =>
      prev.map((item) => (item.id === id && item.qty > 0 ? { ...item, qty: item.qty - 1 } : item))
    );
  };

  const handleSendReminder = (id: string) => {
    setBakiList((prev) =>
      prev.map((c) => (c.id === id ? { ...c, reminded: true } : c))
    );
  };

  return (
    <div className="bg-white border border-stone-200 rounded-2xl shadow-sm overflow-hidden">
      {/* Device Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 bg-stone-50 border-b border-stone-200">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-stone-900 whitespace-nowrap">
            {lang === 'en' ? 'Bismillah Traders · Dhaka' : 'বিসমিল্লাহ ট্রেডার্স · ঢাকা'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleToggleOffline}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              isOffline
                ? 'bg-amber-50 border-amber-300 text-amber-900'
                : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-100'
            }`}
            title="Simulate SQLite offline mode"
          >
            {isOffline ? (
              <>
                <WifiOff className="w-3.5 h-3.5" />
                <span>{lang === 'en' ? 'Offline SQLite' : 'অফলাইন মোড'}</span>
              </>
            ) : (
              <>
                <Wifi className="w-3.5 h-3.5 text-emerald-700" />
                <span>{lang === 'en' ? 'Cloud Synced' : 'ক্লাউড সিঙ্ক'}</span>
              </>
            )}
          </button>

          <div
            className="inline-flex items-center p-0.5 bg-stone-200/80 rounded-lg"
            role="group"
            aria-label="App language switcher"
          >
            <button
              type="button"
              onClick={() => setLang('en')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                lang === 'en'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLang('bn')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                lang === 'bn'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              বাংলা
            </button>
          </div>
        </div>
      </div>

      {/* Live KPI Summary Strip */}
      <div className="grid grid-cols-3 divide-x divide-stone-200 border-b border-stone-200 bg-white">
        <div className="p-4">
          <div className="text-xs text-stone-500">
            {lang === 'en' ? 'Pelam (Received)' : 'পেলাম (আয়)'}
          </div>
          <div className="mt-1 font-mono text-lg font-semibold text-emerald-800 tabular-nums">
            {formatBDT(totalPelam)}
          </div>
        </div>
        <div className="p-4">
          <div className="text-xs text-stone-500">
            {lang === 'en' ? 'Dilam (Paid)' : 'দিলাম (ব্যয়)'}
          </div>
          <div className="mt-1 font-mono text-lg font-semibold text-stone-800 tabular-nums">
            {formatBDT(totalDilam)}
          </div>
        </div>
        <div className="p-4 bg-emerald-50/40">
          <div className="text-xs text-stone-600">
            {lang === 'en' ? 'Net P&L Today' : 'আজকের নিট লাভ'}
          </div>
          <div
            className={`mt-1 font-mono text-lg font-semibold tabular-nums ${
              netProfit >= 0 ? 'text-emerald-800' : 'text-amber-800'
            }`}
          >
            {formatBDT(netProfit)}
          </div>
        </div>
      </div>

      {/* Segmented Navigation Tabs */}
      <div className="px-5 pt-4">
        <div className="grid grid-cols-3 gap-1 p-1 bg-stone-100 rounded-xl">
          <button
            type="button"
            onClick={() => setActiveTab('ledger')}
            className={`py-2 px-3 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'ledger'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {lang === 'en' ? 'Daily Ledger' : 'দৈনিক খাতা'}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('stock')}
            className={`py-2 px-3 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'stock'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {lang === 'en' ? 'Stock Control' : 'স্টক হিসাব'}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('baki')}
            className={`py-2 px-3 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'baki'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {lang === 'en' ? `Baki (${formatBDT(totalBaki)})` : `বাকি (${formatBDT(totalBaki)})`}
          </button>
        </div>
      </div>

      {/* Tab Body */}
      <div className="p-5">
        {activeTab === 'ledger' && (
          <div>
            {/* Quick Entry Form */}
            <form onSubmit={handleAddEntry} className="space-y-3 pb-4 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setEntryType('pelam')}
                  className={`flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap cursor-pointer ${
                    entryType === 'pelam'
                      ? 'bg-emerald-800 text-white border-emerald-800'
                      : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  <ArrowDownLeft className="w-3.5 h-3.5" />
                  <span>{lang === 'en' ? 'Pelam (In)' : 'পেলাম (জমা)'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setEntryType('dilam')}
                  className={`flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap cursor-pointer ${
                    entryType === 'dilam'
                      ? 'bg-stone-900 text-white border-stone-900'
                      : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>{lang === 'en' ? 'Dilam (Out)' : 'দিলাম (খরচ)'}</span>
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={noteInput}
                  onChange={(e) => setNoteInput(e.target.value)}
                  placeholder={
                    lang === 'en' ? 'Item or customer note...' : 'পণ্য বা ক্রেতার নাম লিখুন...'
                  }
                  aria-label="Transaction note"
                  className="flex-1 px-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-lg text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="1"
                    value={amountInput}
                    onChange={(e) => setAmountInput(e.target.value)}
                    placeholder="৳ 500"
                    aria-label="Amount in Taka"
                    className="w-28 px-3 py-2 text-sm font-mono bg-stone-50 border border-stone-200 rounded-lg text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-700 tabular-nums"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-1 px-4 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{lang === 'en' ? 'Log' : 'যোগ করুন'}</span>
                  </button>
                </div>
              </div>
              {formError && <p className="text-xs text-amber-800">{formError}</p>}
            </form>

            {/* Offline Queue Notice */}
            {pendingSyncCount > 0 && (
              <div className="mt-3 flex items-center justify-between text-xs text-amber-900 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                <span>
                  {lang === 'en'
                    ? `${pendingSyncCount} entry queued locally in SQLite`
                    : `${pendingSyncCount}টি হিসাব অফলাইন SQLite-এ সংরক্ষিত`}
                </span>
                <button
                  type="button"
                  onClick={handleToggleOffline}
                  className="inline-flex items-center gap-1 font-semibold underline cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>{lang === 'en' ? 'Sync now' : 'সিঙ্ক করুন'}</span>
                </button>
              </div>
            )}

            {/* Ledger Rows */}
            <ul className="mt-3 divide-y divide-stone-100 max-h-60 overflow-y-auto">
              {entries.map((entry) => (
                <li key={entry.id} className="py-2.5 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-stone-900 truncate">
                      {lang === 'en' ? entry.titleEn : entry.titleBn}
                    </p>
                    <p className="text-xs text-stone-500">
                      {entry.channel} · {entry.time}
                      {!entry.synced &&
                        (lang === 'en' ? ' · Local SQLite' : ' · অফলাইন সেভ')}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span
                      className={`font-mono text-sm font-semibold tabular-nums ${
                        entry.type === 'pelam' ? 'text-emerald-800' : 'text-stone-700'
                      }`}
                    >
                      {entry.type === 'pelam' ? '+' : '−'}
                      {formatBDT(entry.amount)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === 'stock' && (
          <div className="space-y-3">
            <p className="text-xs text-stone-500">
              {lang === 'en'
                ? 'Tap "Record Sale" on any SKU to test automatic stock deduction & low-stock alerts.'
                : 'স্টক স্বয়ংক্রিয়ভাবে কমতে দেখতে যেকোনো পণ্যে "বিক্রয় লিখুন" চাপুন।'}
            </p>
            <ul className="divide-y divide-stone-100">
              {stock.map((item) => {
                const isLow = item.qty <= item.reorderAt;
                return (
                  <li key={item.id} className="py-3 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-stone-900 truncate">
                        {lang === 'en' ? item.nameEn : item.nameBn}
                      </p>
                      <p className="text-xs text-stone-500 font-mono tabular-nums">
                        {item.sku} · {formatBDT(item.unitCost)} ·{' '}
                        <span className={isLow ? 'text-amber-800 font-semibold' : ''}>
                          {item.qty} {lang === 'en' ? 'left' : 'টি বাকি'}
                          {isLow ? (lang === 'en' ? ' (Reorder Alert)' : ' (রি-অর্ডার অ্যালার্ট)') : ''}
                        </span>
                      </p>
                    </div>
                    <button
                      type="button"
                      disabled={item.qty === 0}
                      onClick={() => handleDecrementStock(item.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-800 bg-stone-100 hover:bg-stone-200 disabled:opacity-40 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <Package className="w-3.5 h-3.5" />
                      <span>{lang === 'en' ? 'Record Sale (-1)' : 'বিক্রয় (-১)'}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {activeTab === 'baki' && (
          <div className="space-y-3">
            <p className="text-xs text-stone-500">
              {lang === 'en'
                ? 'Send instant SMS or WhatsApp due reminders to speed up baki collection.'
                : 'বাকি আদায়ে দ্রুততা আনতে এক ক্লিকে এসএমএস বা হোয়াটসঅ্যাপ রিমাইন্ডার পাঠান।'}
            </p>
            <ul className="divide-y divide-stone-100">
              {bakiList.map((customer) => (
                <li key={customer.id} className="py-3 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-stone-900 truncate">
                      {lang === 'en' ? customer.nameEn : customer.nameBn}
                    </p>
                    <p className="text-xs text-stone-500 font-mono tabular-nums">
                      {customer.phone} · {customer.daysOverdue}d{' '}
                      {lang === 'en' ? 'overdue' : 'দিন বকেয়া'}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="font-mono text-sm font-semibold text-stone-900 tabular-nums">
                      {formatBDT(customer.due)}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleSendReminder(customer.id)}
                      disabled={customer.reminded}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                        customer.reminded
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-emerald-800 text-white hover:bg-emerald-900'
                      }`}
                    >
                      {customer.reminded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>{lang === 'en' ? 'Sent' : 'পাঠানো হয়েছে'}</span>
                        </>
                      ) : (
                        <>
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>{lang === 'en' ? 'Remind' : 'তাগাদা'}</span>
                        </>
                      )}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
