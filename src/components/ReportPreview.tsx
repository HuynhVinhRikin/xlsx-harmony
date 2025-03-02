
import { motion } from "framer-motion";
import { ArrowLeft, FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Report } from "@/types/report";
import ReportTabs from "./report/ReportTabs";
import GroupSelection from "./report/GroupSelection";

interface ReportPreviewProps {
  report: Report;
  onSend: (selectedGroups: string[]) => void;
  onBack: () => void;
}

const ReportPreview = ({ report, onSend, onBack }: ReportPreviewProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <Button 
          variant="ghost" 
          onClick={onBack} 
          className="flex items-center"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back
        </Button>
        
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-primary/5 hover:bg-primary/10">
            <FileSpreadsheet size={14} className="mr-1" />
            {report.filename}
          </Badge>
        </div>
      </div>
      
      <Card className="overflow-hidden glass">
        <div className="px-6 py-4 bg-card border-b">
          <h2 className="text-xl font-medium">Report Preview</h2>
          <p className="text-sm text-muted-foreground">
            Review your generated report before sending
          </p>
        </div>
        
        <ReportTabs report={report} />
      </Card>
      
      <Card className="glass">
        <GroupSelection onSend={onSend} />
      </Card>
    </motion.div>
  );
};

export default ReportPreview;
