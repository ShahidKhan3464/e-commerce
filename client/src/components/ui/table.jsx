import React from 'react';
import { FiLoader } from 'react-icons/fi';

export default function Table({ 
  columns, 
  data, 
  loading, 
  emptyMessage = "No records found",
  className = ""
}) {
  return (
    <div className={`bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden ${className}`}>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-gradient-to-r from-slate-50 to-slate-100">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider"
                >
                  {col.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-100">
            {loading ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-12 text-center"
                >
                  <div className="flex flex-col items-center gap-3">
                    <FiLoader className="w-8 h-8 text-blue-500 animate-spin" />
                    <span className="text-slate-500 font-medium">Loading data...</span>
                  </div>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-12 text-center"
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
                      <span className="text-2xl text-slate-400">📄</span>
                    </div>
                    <div>
                      <h3 className="text-slate-700 font-medium mb-1">No Data Available</h3>
                      <p className="text-slate-500 text-sm">{emptyMessage}</p>
                    </div>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((row, index) => (
                <tr 
                  key={row._id || index} 
                  className="hover:bg-slate-50 transition-colors duration-150 group"
                >
                  {columns.map((col) => (
                    <td 
                      key={col.key} 
                      className="px-6 py-4 text-sm text-slate-700 group-hover:text-slate-900 transition-colors duration-150"
                    >
                      {col.render ? col.render(row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
