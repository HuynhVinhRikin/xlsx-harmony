
import { useState } from "react";
import { Image, List, FileSpreadsheet } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Report } from "@/types/report";
import ReportImages from "./ReportImages";
import ReportSummary from "./ReportSummary";
import ReportDetailsTable from "./ReportDetailsTable";

interface ReportTabsProps {
  report: Report;
}

const ReportTabs = ({ report }: ReportTabsProps) => {
  const [activeTab, setActiveTab] = useState("images");
  
  return (
    <Tabs defaultValue="images" className="w-full" onValueChange={setActiveTab}>
      <div className="px-6 pt-2">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="images" className="text-sm">
            <Image size={16} className="mr-2" />
            Images
          </TabsTrigger>
          <TabsTrigger value="summary" className="text-sm">
            <List size={16} className="mr-2" />
            Summary
          </TabsTrigger>
          <TabsTrigger value="details" className="text-sm">
            <FileSpreadsheet size={16} className="mr-2" />
            Detailed Data
          </TabsTrigger>
        </TabsList>
      </div>
      
      <TabsContent value="images" className="p-6 min-h-80">
        <ReportImages report={report} />
      </TabsContent>
      
      <TabsContent value="summary" className="p-6 min-h-80">
        <ReportSummary report={report} />
      </TabsContent>
      
      <TabsContent value="details" className="p-6 min-h-80">
        <ReportDetailsTable report={report} />
      </TabsContent>
    </Tabs>
  );
};

export default ReportTabs;
