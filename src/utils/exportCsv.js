export function exportCsv(filename, rows, columns) {
  const header = columns.map((c) => c.header).join(',')
  const body = rows.map((row) =>
    columns.map((c) => {
      const val = typeof c.accessor === 'function' ? c.accessor(row) : row[c.accessor]
      return `"${String(val ?? '').replace(/"/g, '""')}"`
    }).join(',')
  )
  const csv = [header, ...body].join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
