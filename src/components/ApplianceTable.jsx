import React from 'react'

let nextId = 1000

function formatNumber(n) {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(n)
}

export default function ApplianceTable({ appliances, setAppliances, totals }) {
  const updateRow = (id, field, value) => {
    setAppliances((rows) =>
      rows.map((r) => (r.id === id ? { ...r, [field]: value } : r))
    )
  }

  const deleteRow = (id) => {
    setAppliances((rows) => rows.filter((r) => r.id !== id))
  }

  const addRow = () => {
    setAppliances((rows) => [
      ...rows,
      { id: ++nextId, name: '', watts: 0, quantity: 1, hours: 1 },
    ])
  }

  return (
    <div className="card">
      <div className="card-header">
        <h2>Appliances</h2>
        <button type="button" className="btn btn-primary" onClick={addRow}>
          + Add appliance
        </button>
      </div>

      <div className="table-wrapper">
        <table className="appliance-table" aria-label="Appliance load table">
          <thead>
            <tr>
              <th>Appliance</th>
              <th>Power (W)</th>
              <th>Qty</th>
              <th>Hours/day</th>
              <th>Energy (Wh/day)</th>
              <th aria-label="Actions"></th>
            </tr>
          </thead>
          <tbody>
            {appliances.length === 0 && (
              <tr>
                <td colSpan={6} className="empty-row">
                  No appliances yet. Click "Add appliance" to begin.
                </td>
              </tr>
            )}
            {appliances.map((a) => {
              const rowEnergy =
                (Number(a.watts) || 0) *
                (Number(a.quantity) || 0) *
                (Number(a.hours) || 0)
              return (
                <tr key={a.id}>
                  <td data-label="Appliance">
                    <input
                      type="text"
                      className="cell-input"
                      value={a.name}
                      placeholder="e.g. Ceiling fan"
                      aria-label="Appliance name"
                      onChange={(e) => updateRow(a.id, 'name', e.target.value)}
                    />
                  </td>
                  <td data-label="Power (W)">
                    <input
                      type="number"
                      min="0"
                      className="cell-input num"
                      value={a.watts}
                      aria-label="Power in watts"
                      onChange={(e) => updateRow(a.id, 'watts', e.target.value)}
                    />
                  </td>
                  <td data-label="Qty">
                    <input
                      type="number"
                      min="0"
                      className="cell-input num"
                      value={a.quantity}
                      aria-label="Quantity"
                      onChange={(e) =>
                        updateRow(a.id, 'quantity', e.target.value)
                      }
                    />
                  </td>
                  <td data-label="Hours/day">
                    <input
                      type="number"
                      min="0"
                      max="24"
                      step="0.5"
                      className="cell-input num"
                      value={a.hours}
                      aria-label="Hours of use per day"
                      onChange={(e) => updateRow(a.id, 'hours', e.target.value)}
                    />
                  </td>
                  <td data-label="Energy (Wh/day)" className="num readonly-cell">
                    {formatNumber(rowEnergy)}
                  </td>
                  <td className="action-cell">
                    <button
                      type="button"
                      className="btn btn-danger"
                      aria-label={`Delete ${a.name || 'appliance'}`}
                      onClick={() => deleteRow(a.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="totals-bar">
        <div className="total-item">
          <span className="total-label">Total Connected Load</span>
          <span className="total-value" data-testid="total-connected-load">
            {formatNumber(totals.connectedLoad)} W
          </span>
        </div>
        <div className="total-item">
          <span className="total-label">Total Daily Energy</span>
          <span className="total-value" data-testid="total-daily-energy">
            {formatNumber(totals.dailyEnergy)} Wh/day
          </span>
        </div>
      </div>
    </div>
  )
}
