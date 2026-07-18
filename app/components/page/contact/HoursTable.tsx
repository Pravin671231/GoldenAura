import { SITE } from "@/lib/site-config";

export function HoursTable() {
  return (
    <table className="w-full text-sm">
      <caption className="mb-2 text-left font-semibold">Store Hours</caption>
      <tbody>
        {SITE.hours.map((row) => (
          <tr key={row.days} className="border-t border-black/10 first:border-t-0">
            <th scope="row" className="py-2 pr-4 text-left font-normal text-black/70">
              {row.days}
            </th>
            <td className="py-2 text-right">{row.hours}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
