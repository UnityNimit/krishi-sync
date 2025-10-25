// Simulated API service for demo purposes
// In production, these would be real API calls
/* eslint-disable @typescript-eslint/no-unused-vars */

const SIMULATED_DELAY = 800

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

export const api = {
  // Crop recommendations
  async submitCropSelection(_cropId: string): Promise<ApiResponse<{ message: string }>> {
    await delay(SIMULATED_DELAY)
    return {
      success: true,
      data: { message: 'Crop selection saved to your plan' }
    }
  },

  // Advisory status
  async updateAdvisoryStatus(_advisoryId: string, status: string): Promise<ApiResponse<{ message: string }>> {
    await delay(SIMULATED_DELAY)
    return {
      success: true,
      data: { message: `Advisory updated to ${status}` }
    }
  },

  // Loan application
  async submitLoanApplication(_data: {
    amount: number
    purpose: string
  }): Promise<ApiResponse<{ applicationId: string }>> {
    await delay(SIMULATED_DELAY)
    return {
      success: true,
      data: { applicationId: `LOAN-${Date.now()}` }
    }
  },

  // Insurance enrollment
  async enrollInInsurance(_planId: string): Promise<ApiResponse<{ policyId: string }>> {
    await delay(SIMULATED_DELAY)
    return {
      success: true,
      data: { policyId: `POL-${Date.now()}` }
    }
  },

  // Marketplace operations
  async raiseMarketplaceOffer(_lotId: string, _offerAmount: number): Promise<ApiResponse<{ offerId: string }>> {
    await delay(SIMULATED_DELAY)
    return {
      success: true,
      data: { offerId: `OFF-${Date.now()}` }
    }
  },

  // Traceability
  async createBatch(_batchData: {
    crop: string
    quantity: string
    originFarm: string
    actor: string
  }): Promise<ApiResponse<{ batchId: string }>> {
    await delay(SIMULATED_DELAY)
    return {
      success: true,
      data: { batchId: `BATCH-${Date.now()}` }
    }
  },

  // Reports
  async exportReport(_reportType: string, _filters: Record<string, unknown>): Promise<ApiResponse<{ downloadUrl: string }>> {
    await delay(SIMULATED_DELAY)
    return {
      success: true,
      data: { downloadUrl: `/downloads/report-${Date.now()}.pdf` }
    }
  },

  // Weather data refresh
  async refreshWeatherData(_location: string): Promise<ApiResponse<{ lastUpdate: string }>> {
    await delay(SIMULATED_DELAY)
    return {
      success: true,
      data: { lastUpdate: new Date().toISOString() }
    }
  }
}
