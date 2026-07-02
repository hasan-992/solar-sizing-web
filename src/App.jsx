import React, { useMemo, useState } from 'react'
import ApplianceTable from './components/ApplianceTable.jsx'
import ResultsCard from './components/ResultsCard.jsx'
import SettingsPanel from './components/SettingsPanel.jsx'

const DEFAULT_SETTINGS = {
  sunHours: 5,
  systemLosses: 20, // percent
  systemVoltage: 48, // V
  depthOfDischarge: 50, // percent
  autonomyDays: 1,
  inverterMargin: 125, // percent
}

const DEFAULT_APPLIANCES = [
  { id: 1, name: 'LED Lights', watts: 10, quantity: 8, hours: 5 },
  { id: 2, name: 'Refrigerator', watts: 150, quantity: 1, hours: 24 },
  { id: 3, name: 'Television', watts: 100, quantity: 1, hours: 4 },
]

export default function App() {
  const [appliances, setAppliances] = useState(DEFAULT_APPLIANCES)
  const [settings, setSettings] = useState(DEFAULT_SETTINGS)

  const totals = useMemo(() => {
    let connectedLoad = 0
    let dailyEnergy = 0
    for (const a of appliances) {
      const watts = Number(a.watts) || 0
      const qty = Number(a.quantity) || 0
      const hours = Number(a.hours) || 0
      connectedLoad += watts * qty
      dailyEnergy += watts * qty * hours
    }
    return { connectedLoad, dailyEnergy }
  }, [appliances])

  const sizing = useMemo(() => {
    const sunHours = Number(settings.sunHours) || 0
    const lossFactor = 1 - (Number(settings.systemLosses) || 0) / 100
    const voltage = Number(settings.systemVoltage) || 0
    const dod = (Number(settings.depthOfDischarge) || 0) / 100
    const autonomy = Number(settings.autonomyDays) || 0
    const margin = (Number(settings.inverterMargin) || 0) / 100

    // PV array (W): daily energy / (sun hours * loss factor)
    const pvArrayWatts =
      sunHours > 0 && lossFactor > 0
        ? totals.dailyEnergy / (sunHours * lossFactor)
        : 0

    // Battery bank (Ah): (daily energy * autonomy) / (voltage * DoD)
    const batteryAh =
      voltage > 0 && dod > 0
        ? (totals.dailyEnergy * autonomy) / (voltage * dod)
        : 0

    // Inverter rating (W): connected load * margin
    const inverterWatts = totals.connectedLoad * margin

    return { pvArrayWatts, batteryAh, inverterWatts }
  }, [totals, settings])

  return (
    <div className="app">
      <header className="app-header">
        <h1>Solar Load Sizing Calculator</h1>
        <p className="subtitle">
          Size your off-grid photovoltaic system from your appliance load.
        </p>
      </header>

      <main className="layout">
        <section className="main-column">
          <ApplianceTable
            appliances={appliances}
            setAppliances={setAppliances}
            totals={totals}
          />
        </section>

        <aside className="side-column">
          <ResultsCard sizing={sizing} settings={settings} />
          <SettingsPanel settings={settings} setSettings={setSettings} />
        </aside>
      </main>

      <footer className="app-footer">
        <p>
          Estimates are for planning purposes. Consult a qualified installer
          before purchasing equipment.
        </p>
        <p>
          Built by a solar projects engineer — digitizing a real-world PV
          sizing workflow.
        </p>
      </footer>
    </div>
  )
}
