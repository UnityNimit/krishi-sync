import { useState } from 'react'
import { TrendingUp, CreditCard, Shield, CheckCircle, AlertCircle, ArrowRight, Info } from 'lucide-react'
import { mockCreditEligibility, mockInsurancePlans } from '../data/mockData'
import { InsurancePlan } from '../types'
import { useNotificationContext } from '../context/NotificationContext'
import { useLoading } from '../hooks/useLoading'
import { LoadingSpinner } from '../components/ui/LoadingSpinner'
import { api } from '../services/api'

function CreditEligibilitySection() {
  const { showNotification } = useNotificationContext()
  const { isLoading, withLoading } = useLoading()
  const eligibility = mockCreditEligibility

  return (
    <div className="space-y-6">
      <div className="card bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 border-green-200 dark:border-green-700">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
              <CreditCard className="h-6 w-6 mr-3 text-green-600 dark:text-green-400" />
              Credit Eligibility Assessment
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mt-2">Based on AI-powered analysis of your farming profile</p>
          </div>
          {eligibility.isEligible ? (
            <div className="flex items-center bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 px-4 py-2 rounded-full">
              <CheckCircle className="h-5 w-5 mr-2" />
              <span className="font-semibold">Eligible</span>
            </div>
          ) : (
            <div className="flex items-center bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100 px-4 py-2 rounded-full">
              <AlertCircle className="h-5 w-5 mr-2" />
              <span className="font-semibold">Not Eligible</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Credit Score</p>
            <div className="flex items-baseline">
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{eligibility.score}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300 ml-2">/ 850</p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
              <div
                className="bg-green-600 h-2 rounded-full"
                style={{ width: `${(eligibility.score / 850) * 100}%` }}
              />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Maximum Loan Amount</p>
            <div className="flex items-baseline">
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                ₹{(eligibility.maxLoanAmount / 100000).toFixed(1)}L
              </p>
            </div>
            <p className="text-sm text-green-700 dark:text-green-300 mt-3">
              ✓ Pre-approved for instant processing
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Interest Rate</p>
            <div className="flex items-baseline">
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{eligibility.interestRate}%</p>
              <p className="text-sm text-gray-600 dark:text-gray-300 ml-2">p.a.</p>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-3">
              Repayment: {eligibility.repaymentPeriod} months
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <Info className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
            Score Breakdown
          </h3>
          <div className="space-y-4">
            {eligibility.factors.map((factor, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{factor.name}</span>
                    <span className="ml-2 text-xs text-gray-600 dark:text-gray-300">({factor.weight}% weight)</span>
                  </div>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">{factor.score}/100</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary-600 h-2 rounded-full transition-all"
                    style={{ width: `${factor.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Next Steps</h3>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
              <span className="text-primary-700 dark:text-primary-300 font-bold text-sm">1</span>
            </div>
            <div className="ml-4">
              <h4 className="font-semibold text-gray-900 dark:text-white">Review Loan Terms</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                Understand the interest rates, repayment schedule, and associated fees
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
              <span className="text-primary-700 dark:text-primary-300 font-bold text-sm">2</span>
            </div>
            <div className="ml-4">
              <h4 className="font-semibold text-gray-900 dark:text-white">Submit Required Documents</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                Land records, Aadhaar card, bank statements, and farming income proof
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
              <span className="text-primary-700 dark:text-primary-300 font-bold text-sm">3</span>
            </div>
            <div className="ml-4">
              <h4 className="font-semibold text-gray-900 dark:text-white">Loan Processing & Approval</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                Typically takes 3-5 business days for final approval and disbursement
              </p>
            </div>
          </div>
        </div>
        <button 
          onClick={async () => {
            await withLoading(async () => {
              const result = await api.submitLoanApplication({
                amount: eligibility.maxLoanAmount,
                purpose: 'Agricultural operations'
              })
              if (result.success) {
                showNotification('success', 'Loan application initiated! Our team will contact you within 24 hours with next steps.')
              } else {
                showNotification('error', result.error || 'Failed to submit application')
              }
            })
          }}
          disabled={isLoading}
          className="btn-primary w-full mt-6 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? <LoadingSpinner size="sm" /> : (
            <>
              Apply for Loan
              <ArrowRight className="h-5 w-5 ml-2" />
            </>
          )}
        </button>
      </div>
    </div>
  )
}

function InsurancePlanCard({ plan }: { plan: InsurancePlan }) {
  const [showDetails, setShowDetails] = useState(false)
  const { showNotification } = useNotificationContext()
  const { isLoading, withLoading } = useLoading()

  return (
    <div className={`card relative ${plan.recommended ? 'ring-2 ring-primary-500 dark:ring-primary-400 shadow-xl' : ''}`}>
      {plan.recommended && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-primary-600 dark:bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
            Recommended
          </span>
        </div>
      )}

      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{plan.name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{plan.coverage}</p>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-lg p-4 mb-4 border border-blue-200 dark:border-blue-700">
        <div className="flex items-baseline mb-2">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">₹{(plan.premium / 1000).toFixed(0)}k</span>
          <span className="text-sm text-gray-600 dark:text-gray-300 ml-2">/ season</span>
        </div>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Coverage up to <span className="font-bold text-gray-900 dark:text-white">₹{(plan.coverageAmount / 100000).toFixed(1)}L</span>
        </p>
      </div>

      <div className="mb-4">
        <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Covered Crops:</p>
        <div className="flex flex-wrap gap-2">
          {plan.crops.map((crop, index) => (
            <span key={index} className="badge bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100">
              {crop}
            </span>
          ))}
        </div>
      </div>

      <button
        onClick={() => setShowDetails(!showDetails)}
        className="btn-secondary w-full mb-3"
      >
        {showDetails ? 'Hide Benefits' : 'View Benefits'}
      </button>

      {showDetails && (
        <div className="mb-4 border-t border-gray-200 dark:border-gray-700 pt-4">
          <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Plan Benefits:</p>
          <ul className="space-y-2">
            {plan.benefits.map((benefit, index) => (
              <li key={index} className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
                <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <button 
        onClick={async () => {
          await withLoading(async () => {
            const result = await api.enrollInInsurance(plan.id)
            if (result.success) {
              showNotification('success', `${plan.name} selected! Your enrollment will be processed shortly.`)
            } else {
              showNotification('error', result.error || 'Failed to enroll in plan')
            }
          })
        }}
        disabled={isLoading}
        className={`w-full py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center ${
          plan.recommended
            ? 'bg-primary-600 dark:bg-primary-500 text-white hover:bg-primary-700 dark:hover:bg-primary-600'
            : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600'
        }`}
      >
        {isLoading ? <LoadingSpinner size="sm" /> : (plan.recommended ? 'Choose Recommended Plan' : 'Select Plan')}
      </button>
    </div>
  )
}

function InsuranceSection() {
  return (
    <div className="space-y-6">
      <div className="card bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 border-blue-200 dark:border-blue-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center mb-4">
          <Shield className="h-6 w-6 mr-3 text-blue-600 dark:text-blue-400" />
          Crop Insurance Plans
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Protect your investment against unpredictable weather, pests, and market fluctuations. Our AI analyzes your farm profile to recommend the most suitable insurance coverage.
        </p>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-blue-300 dark:border-blue-600">
          <div className="flex items-start">
            <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Why Insurance Matters</p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Farmers with crop insurance experience 40% less financial stress and can reinvest in their farms more confidently. Government subsidies may cover up to 50% of premium costs.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {mockInsurancePlans.map((plan) => (
          <InsurancePlanCard key={plan.id} plan={plan} />
        ))}
      </div>

      <div className="card">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">How to Apply</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-primary-700 dark:text-primary-300 font-bold">1</span>
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Select Plan</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">Choose the insurance plan that best fits your needs</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-primary-700 dark:text-primary-300 font-bold">2</span>
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Submit Details</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">Provide farm details and required documents</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-primary-700 dark:text-primary-300 font-bold">3</span>
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Pay Premium</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">Complete payment with available subsidy options</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-primary-700 dark:text-primary-300 font-bold">4</span>
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Get Covered</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">Receive policy document and start protection</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function CreditInsurance() {
  const [activeTab, setActiveTab] = useState<'credit' | 'insurance'>('credit')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
          <TrendingUp className="h-8 w-8 mr-3 text-primary-600 dark:text-primary-400" />
          Credit & Insurance
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">Financial services to support and protect your farming operations</p>
      </div>

      <div className="flex space-x-4 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveTab('credit')}
          className={`px-4 py-2 font-medium border-b-2 transition-colors ${
            activeTab === 'credit'
              ? 'border-primary-600 text-primary-600 dark:text-primary-400'
              : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
          }`}
        >
          <CreditCard className="h-4 w-4 inline mr-2" />
          Credit Eligibility
        </button>
        <button
          onClick={() => setActiveTab('insurance')}
          className={`px-4 py-2 font-medium border-b-2 transition-colors ${
            activeTab === 'insurance'
              ? 'border-primary-600 text-primary-600 dark:text-primary-400'
              : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
          }`}
        >
          <Shield className="h-4 w-4 inline mr-2" />
          Insurance Plans
        </button>
      </div>

      {activeTab === 'credit' && <CreditEligibilitySection />}
      {activeTab === 'insurance' && <InsuranceSection />}
    </div>
  )
}

export default CreditInsurance
