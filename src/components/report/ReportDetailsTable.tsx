
import { Report } from "@/types/report";

interface ReportDetailsTableProps {
  report: Report;
}

const ReportDetailsTable = ({ report }: ReportDetailsTableProps) => {
  // Function to determine cell background color based on column index
  const getCellBackgroundColor = (colIndex: number, isHeader: boolean, isFirstRow: boolean) => {
    if (isHeader) {
      if (colIndex === 0) return "bg-[#C4E0F4]"; // QLTP header
      if (colIndex === 1) return "bg-[#FAE1B8]"; // Target header
      if (colIndex === 2) return "bg-[#F8C8C8]"; // Sales header
      if (colIndex === 3) return "bg-[#F8C8C8]"; // Inventory header
      if (colIndex === 4) return "bg-[#E6D7F2]"; // Achievement header
      return "bg-gray-100";
    }
    
    if (isFirstRow) {
      return "bg-[#F8C8C8] text-black font-medium"; // First data row (summary)
    }
    
    return "bg-white";
  };

  // Function to determine text color based on column index
  const getCellTextColor = (colIndex: number, isHeader: boolean) => {
    if (isHeader) {
      if (colIndex === 2 || colIndex === 3) return "text-red-600"; // Sales & Inventory headers
      return "text-black";
    }
    
    if (colIndex === 4) {
      return "text-blue-700 font-medium"; // Achievement percentage
    }
    
    return "text-black";
  };

  // Function to format percentage values
  const formatPercentage = (value: string) => {
    if (value.endsWith("%")) return value;
    return `${value}%`;
  };

  return (
    <div className="space-y-6">
      {report.title && (
        <h2 className="text-2xl font-bold text-center mb-4 font-serif">{report.title}</h2>
      )}
      
      <div className="rounded-md overflow-hidden border border-gray-300 mb-6 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                {report.details.headers.map((header, index) => (
                  <th 
                    key={index}
                    className={`
                      ${getCellBackgroundColor(index, true, false)} 
                      ${getCellTextColor(index, true)}
                      border border-gray-300 px-4 py-2 text-center font-bold
                    `}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {report.details.rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td 
                      key={cellIndex}
                      className={`
                        ${getCellBackgroundColor(cellIndex, false, rowIndex === 0)} 
                        ${getCellTextColor(cellIndex, false)}
                        border border-gray-300 px-4 py-2 text-center
                        ${cellIndex === 0 ? 'text-left font-medium' : ''}
                      `}
                    >
                      {cellIndex === 4 ? formatPercentage(cell) : cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="text-sm text-gray-500 italic text-right">
        Note: "QLTP" represents store managers, "Mục tiêu (Lốc)" is the sales target, 
        "Bán (Lốc)" shows units sold, "Tồn (Lốc)" shows remaining inventory, and 
        "% HT mục tiêu" shows the percentage of target achievement.
      </div>
    </div>
  );
};

export default ReportDetailsTable;
