
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { Report } from "@/types/report";

interface ReportSummaryProps {
  report: Report;
}

const ReportSummary = ({ report }: ReportSummaryProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-3">Report Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {report.summary.metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-secondary rounded-lg p-4"
            >
              <p className="text-sm text-muted-foreground mb-1">{metric.label}</p>
              <p className="text-2xl font-semibold">{metric.value}</p>
            </motion.div>
          ))}
        </div>
      </div>
      
      <Separator />
      
      <div>
        <h3 className="text-lg font-medium mb-3">Key Insights</h3>
        <ul className="space-y-2">
          {report.summary.insights.map((insight, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="flex items-start"
            >
              <div className="min-w-4 h-4 mt-1 mr-3 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
              </div>
              <p>{insight}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ReportSummary;
