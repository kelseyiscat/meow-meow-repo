/** The table view every chart on the page can fall back to. */
export function DataTable({ open, caption, head, rows }) {
  if (!open) return null
  return (
    <div className="dt">
      <table>
        <caption>{caption}</caption>
        <thead>
          <tr>{head.map((h) => <th key={h} scope="col">{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>{row.map((cell, j) => <td key={j}>{cell}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
