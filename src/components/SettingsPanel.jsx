import React from 'react'

const FIELDS = [
  { key: 'sunHours', label: 'Peak Sun Hours', min: 0, max: 24, step: 0.1, unit: 'h' },
  { key: 'systemLosses', label: 'System Losses', min: 0, max: 90, step: 1, unit: '%' },
  { key: 'systemVoltage', label: 'System Voltage', min: 1, step: 1, unit: 'V' },
  { key: 'depthOfDischarge', label: 'Depth of Discharge', min: 1, max: 100, step: 1, unit: '%' },
  { key: 'autonomyDays', label: 'Days of Autonomy', min: 0, step: 0.5, unit: 'days' },
  { key: 'inverterMargin', label: 'Inverter Margin', min: 100, step: 5, unit: '%' },
]

export default function SettingsPanel({ settings, setSettings }) {
  const update = (key, value) => {
    setSettings((s) => ({ ...s, [key]: value }))
  }

  return (
    <div className="card settings-card">
      <div className="card-header">
        <h2>Assumptions &amp; Settings</h2>
      </div>
      <div className="settings-grid">
        {FIELDS.map((f) => (
          <label className="setting-field" key={f.key}>
            <span className="setting-label">
              {f.label} <span className="setting-unit">({f.unit})</span>
            </span>
            <input
              type="number"
              className="setting-input"
              min={f.min}
              max={f.max}
              step={f.step}
              value={settings[f.key]}
              aria-label={f.label}
              onChange={(e) => update(f.key, e.target.value)}
            />
          </label>
        ))}
      </div>
    </div>
  )
}
