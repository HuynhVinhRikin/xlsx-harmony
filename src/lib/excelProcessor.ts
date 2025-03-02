
import { Report } from "@/types/report";

export async function processExcelFile(files: { ban: File | null, ton: File | null }): Promise<Report> {
  return new Promise((resolve, reject) => {
    // In a real application, this would process the Excel files
    // For this demo, we'll simulate processing with a timeout
    
    setTimeout(() => {
      try {
        // Mock image URLs (in a real app, these would be generated from the Excel files)
        const mockImages = [
          "https://source.unsplash.com/random/800x600/?chart",
          "https://source.unsplash.com/random/800x600/?graph",
          "https://source.unsplash.com/random/800x600/?excel",
          "https://source.unsplash.com/random/800x600/?report"
        ];
        
        // This is mock data - in a real application,
        // you would parse the Excel files and generate real data
        const mockReport: Report = {
          files: {
            ban: files.ban?.name || "",
            ton: files.ton?.name || ""
          },
          images: mockImages,
          filename: `${files.ban?.name || "Unknown"} & ${files.ton?.name || "Unknown"}`,
          summary: {
            metrics: [
              { label: "Total Records", value: "1,245" },
              { label: "Total Revenue", value: "$847,291" },
              { label: "Avg. Transaction", value: "$680.55" }
            ],
            insights: [
              "Revenue increased by 12.3% compared to previous period",
              "Q3 sales exceeded targets by 8.7% across all regions",
              "Product category 'Electronics' showed highest growth at 18.2%",
              "Customer retention rate improved to 76% (up 5.3%)"
            ]
          },
          details: {
            headers: ["Region", "Product", "Q1", "Q2", "Q3", "Q4", "Total"],
            rows: [
              ["North", "Electronics", "$24,500", "$28,300", "$31,200", "$33,600", "$117,600"],
              ["North", "Furniture", "$18,700", "$19,200", "$20,100", "$22,400", "$80,400"],
              ["South", "Electronics", "$31,200", "$29,800", "$34,500", "$38,200", "$133,700"],
              ["South", "Furniture", "$22,300", "$24,600", "$26,800", "$29,100", "$102,800"],
              ["East", "Electronics", "$28,900", "$30,200", "$33,400", "$36,700", "$129,200"],
              ["East", "Furniture", "$20,100", "$22,400", "$25,000", "$28,300", "$95,800"],
              ["West", "Electronics", "$32,400", "$35,700", "$38,200", "$41,900", "$148,200"],
              ["West", "Furniture", "$23,600", "$25,900", "$28,200", "$30,500", "$108,200"]
            ]
          }
        };
        
        resolve(mockReport);
      } catch (error) {
        reject(error);
      }
    }, 1500); // Simulate processing time
  });
}
