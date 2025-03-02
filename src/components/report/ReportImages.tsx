
import { motion } from "framer-motion";
import { Report } from "@/types/report";

interface ReportImagesProps {
  report: Report;
}

const ReportImages = ({ report }: ReportImagesProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium mb-3">Report Images</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {report.images && report.images.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="rounded-lg overflow-hidden border"
          >
            <div className="bg-muted p-2 border-b">
              <h4 className="text-sm font-medium">Image {index + 1}</h4>
            </div>
            <img 
              src={image} 
              alt={`Report image ${index + 1}`} 
              className="w-full h-auto object-cover"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ReportImages;
