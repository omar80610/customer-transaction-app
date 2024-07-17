import React from 'react'
import CustomerTransactionChart from '../BarChart/BarChart'
export default function Statistics() {
  return (
    <>
      <div className="container mt-4">
      <h2 className="h1 fw-bold mb-4">Statistics</h2>
      <CustomerTransactionChart/>
    </div>
    </>
  )
}
