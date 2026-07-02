import React from 'react'

function formatNumber(n, digits = 0) {
  if (!isFinite(n)) return '0'
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: digits,
  }).format(n)
}

export default function ResultsCard({ sizing, settings }) {
  return (
    <div className="card results-card">
      <div className="card-header">
        <h2>System Sizing Results</h2>
      </div>

      <div className="result-list">
        <div className="result-item">
          <div className="result-title">Recommended PV Array</div>
          <div className="result-value" data-testid="pv-array">
            {formatNumber(sizing.pvArrayWatts)} <span className="unit">W</span>
          </div>
          <div className="result-note">
            Based on {settings.sunHours} peak sun hours and{' '}
            {settings.systemLosses}% system losses
          </div>
        </div>

        <div className="result-item">
          <div className="result-title">Battery Bank Capacity</div>
          <div className="result-value" data-testid="battery-capacity">
            {formatNumber(sizing.batteryAh)} <span className="unit">Ah</span>
          </div>
          <div className="result-note">
            {settings.systemVoltage}V system, {settings.depthOfDischarge}% DoD,{' '}
            {settings.autonomyDays} day(s) autonomy
          </div>
        </div>

        <div className="result-item">
          <div className="result-title">Inverter Rating</div>
          <div className="result-value" data-testid="inverter-rating">
            {formatNumber(sizing.inverterWatts)} <span className="unit">W</span>
          </div>
          <div className="result-note">
            {settings.inverterMargin}% of total connected load
          </div>
        </div>
      </div>
    </div>
  )
}
