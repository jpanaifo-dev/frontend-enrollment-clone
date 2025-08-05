import React from 'react'

export default function Loading() {
  return (
    <div className="p-6 space-y-6 animate-pulse">
      {/* Mis Matrículas Actuales section */}
      <div className="space-y-4">
        <div className="bg-gray-200 h-8 w-1/3 rounded-lg"></div>
        <div className="bg-gray-200 h-px w-full"></div>
        <div className="bg-gray-200 h-6 w-1/4 rounded-lg"></div>

        {/* Matrícula card */}
        <div className="bg-gray-200 p-4 rounded-lg h-40 w-full space-y-3">
          <div className="bg-gray-300 h-5 w-3/4 rounded-lg"></div>
          <div className="bg-gray-300 h-4 w-full rounded-lg"></div>
          <div className="bg-gray-300 h-4 w-1/2 rounded-lg"></div>
          <div className="bg-gray-300 h-4 w-1/2 rounded-lg"></div>
          <div className="bg-gray-300 h-6 w-1/4 rounded-lg mt-4"></div>
        </div>
      </div>

      {/* Mis Programas Académicos section */}
      <div className="space-y-4">
        <div className="bg-gray-200 h-8 w-1/3 rounded-lg"></div>
        <div className="bg-gray-200 h-px w-full"></div>

        {/* Program checkbox */}
        <div className="flex items-center space-x-2">
          <div className="bg-gray-300 h-5 w-5 rounded"></div>
          <div className="bg-gray-300 h-5 w-1/3 rounded-lg"></div>
        </div>

        {/* Faculty table */}
        <div className="bg-gray-200 h-20 w-full rounded-lg"></div>

        {/* Inexigencia checkbox */}
        <div className="flex items-center space-x-2">
          <div className="bg-gray-300 h-5 w-5 rounded"></div>
          <div className="bg-gray-300 h-5 w-1/4 rounded-lg"></div>
        </div>
      </div>

      {/* Historial de Matrículas button */}
      <div className="bg-gray-200 h-12 w-full rounded-lg"></div>
    </div>
  )
}
