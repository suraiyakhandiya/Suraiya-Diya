import React, { useState } from 'react';
import { ShieldCheck } from 'lucide-react';

const PIPELINE_STEPS = [
  {
    step: '01',
    title: 'Daily Operational Logging',
    detail:
      'Merchant records daily sales, supplier bills, bKash/Nagad settlements, and baki repayments inside HisabPro.',
  },
  {
    step: '02',
    title: 'Algorithmic Risk Assessment',
    detail:
      'Analytics engine evaluates turnover stability, transaction frequency, repayment velocity, and stock turnover.',
  },
  {
    step: '03',
    title: 'Consented Credit Export',
    detail:
      'Merchant explicitly authorizes sharing a verified, tamper-evident summary aligned with Bangladesh Bank ICRR guidelines.',
  },
  {
    step: '04',
    title: 'Collateral-Free Loan Disbursement',
    detail:
      'Partner banks & NBFIs extend working capital loans without land collateral or audited corporate balance sheets.',
  },
];

export const CreditScoreSimulator: React.FC = () => {
  const [loggingDays, setLoggingDays] = useState(24);
  const [repaymentRate, setRepaymentRate] = useState(86);
  const [monthlyTurnoverLakh, setMonthlyTurnoverLakh] = useState(4.5);

  const rawScore = Math.round(
    300 +
      (loggingDays / 30) * 220 +
      (repaymentRate / 100) * 230 +
      Math.min(monthlyTurnoverLakh / 10, 1) * 150
  );
  const score = Math.min(900, Math.max(350, rawScore));

  const tierLabel =
    score >= 740
      ? 'Prime Bank-Ready (Tier A)'
      : score >= 620
      ? 'Credit Eligible (Tier B)'
      : 'Building History (Tier C)';

  const eligibleLoanBDT = Math.round(monthlyTurnoverLakh * 100000 * (score >= 740 ? 0.45 : score >= 620 ? 0.3 : 0.15));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
      {/* Left: 4-Step Pipeline */}
      <div className="lg:col-span-7 bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
        <div>
          <p className="text-xs font-medium text-emerald-800 tracking-wide">
            Bridging the ৳33,600 Crore IFC Credit Gap
          </p>
          <h3 className="mt-2 text-2xl font-bold tracking-tight text-stone-900">
            Merchant Credit Score Index (MCSI) Pipeline
          </h3>
          <p className="mt-2 text-sm text-stone-600 leading-relaxed max-w-2xl">
            Roughly 80% of Bangladeshi MSMEs fail bank evaluations under the Internal Credit Risk Rating (ICRR) framework because they lack formal records. HisabPro converts routine daily entries into verifiable creditworthiness.
          </p>
        </div>

        <ol className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {PIPELINE_STEPS.map((item) => (
            <li key={item.step} className="pt-4 border-t border-stone-200">
              <div className="font-mono text-xs font-semibold text-emerald-800 tabular-nums">
                {item.step}
              </div>
              <h4 className="mt-1.5 text-base font-semibold text-stone-900">{item.title}</h4>
              <p className="mt-1.5 text-sm text-stone-600 leading-relaxed">{item.detail}</p>
            </li>
          ))}
        </ol>
      </div>

      {/* Right: Interactive MCSI Readiness Estimator */}
      <div className="lg:col-span-5 bg-stone-900 text-stone-100 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-xs font-medium text-emerald-400">
              Interactive MCSI Estimator
            </span>
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
          </div>

          <div className="mt-5 pb-6 border-b border-stone-800">
            <div className="flex items-baseline justify-between gap-4">
              <div>
                <div className="text-xs text-stone-400">Projected MCSI Index</div>
                <div className="mt-1 font-mono text-4xl font-bold text-white tabular-nums">
                  {score}
                  <span className="text-lg font-normal text-stone-400"> / 900</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-stone-400">ICRR Readiness</div>
                <div className="mt-1 text-sm font-semibold text-emerald-400">{tierLabel}</div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-stone-800/80 flex items-baseline justify-between">
              <span className="text-xs text-stone-400">Est. Collateral-Free Working Capital</span>
              <span className="font-mono text-lg font-semibold text-white tabular-nums">
                ৳{eligibleLoanBDT.toLocaleString('en-US')}
              </span>
            </div>
          </div>

          {/* Interactive Sliders */}
          <div className="mt-6 space-y-5">
            <div>
              <div className="flex justify-between text-xs mb-2">
                <label htmlFor="mcsi-days" className="text-stone-300 font-medium">
                  Active Logging Days / Month
                </label>
                <span className="font-mono text-white tabular-nums">{loggingDays} days</span>
              </div>
              <input
                id="mcsi-days"
                type="range"
                min={5}
                max={30}
                value={loggingDays}
                onChange={(e) => setLoggingDays(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-2">
                <label htmlFor="mcsi-repay" className="text-stone-300 font-medium">
                  On-Time Baki Repayment Velocity
                </label>
                <span className="font-mono text-white tabular-nums">{repaymentRate}%</span>
              </div>
              <input
                id="mcsi-repay"
                type="range"
                min={40}
                max={100}
                value={repaymentRate}
                onChange={(e) => setRepaymentRate(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-2">
                <label htmlFor="mcsi-turnover" className="text-stone-300 font-medium">
                  Verified Monthly Sales Turnover
                </label>
                <span className="font-mono text-white tabular-nums">
                  ৳{(monthlyTurnoverLakh * 100000).toLocaleString('en-US')}
                </span>
              </div>
              <input
                id="mcsi-turnover"
                type="range"
                min={1}
                max={12}
                step={0.5}
                value={monthlyTurnoverLakh}
                onChange={(e) => setMonthlyTurnoverLakh(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>
          </div>
        </div>

        <p className="mt-6 pt-4 border-t border-stone-800 text-xs text-stone-400 leading-relaxed">
          Bank partners access MCSI data only upon explicit merchant opt-in. HisabPro earns a 1.0%–2.0% loan origination referral fee on disbursed SME working capital.
        </p>
      </div>
    </div>
  );
};
