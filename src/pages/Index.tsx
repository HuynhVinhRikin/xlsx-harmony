
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FileSpreadsheet, Upload, ArrowRight, Check, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import FileUploader from "@/components/FileUploader";
import ReportPreview from "@/components/ReportPreview";
import LoadingSpinner from "@/components/LoadingSpinner";
import { processExcelFile } from "@/lib/excelProcessor";
import { Report } from "@/types/report";

const Index = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [report, setReport] = useState<Report | null>(null);
  const [step, setStep] = useState<"upload" | "preview" | "success">("upload");

  const handleFileUpload = (uploadedFile: File) => {
    setFile(uploadedFile);
    toast({
      title: "File uploaded successfully",
      description: `${uploadedFile.name} is ready to be processed.`,
    });
  };

  const handleProcessFile = async () => {
    if (!file) return;
    
    setIsProcessing(true);
    
    try {
      // Process the Excel file
      const processedReport = await processExcelFile(file);
      setReport(processedReport);
      setStep("preview");
      toast({
        title: "Report generated",
        description: "Your Excel data has been processed successfully.",
      });
    } catch (error) {
      console.error("Error processing file:", error);
      toast({
        variant: "destructive",
        title: "Processing failed",
        description: "There was an error processing your Excel file. Please try again.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSendReport = (selectedGroups: string[]) => {
    // In a real app, this would send the report to the selected groups
    toast({
      title: "Report sent",
      description: `Your report has been sent to ${selectedGroups.length} group(s).`,
    });
    setStep("success");
  };

  const resetForm = () => {
    setFile(null);
    setReport(null);
    setStep("upload");
  };

  const renderStep = () => {
    switch (step) {
      case "upload":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-2xl mx-auto"
          >
            <Card className="p-6 glass">
              <div className="text-center mb-8">
                <motion.div 
                  className="inline-block mb-4 text-primary"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <FileSpreadsheet size={56} />
                </motion.div>
                <h1 className="text-2xl font-medium mb-2">Excel Report Processor</h1>
                <p className="text-muted-foreground">Upload your Excel file to generate a comprehensive report</p>
              </div>
              
              <FileUploader onFileUpload={handleFileUpload} />
              
              {file && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-6"
                >
                  <div className="flex items-center p-3 bg-secondary rounded-md">
                    <FileSpreadsheet className="text-primary mr-3" size={20} />
                    <div className="flex-1 overflow-hidden">
                      <p className="truncate font-medium">{file.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(file.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                    <Button
                      variant="default"
                      className="ml-auto" 
                      onClick={handleProcessFile}
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <LoadingSpinner />
                      ) : (
                        <>
                          Process <ArrowRight size={16} className="ml-2" />
                        </>
                      )}
                    </Button>
                  </div>
                </motion.div>
              )}
            </Card>
          </motion.div>
        );
        
      case "preview":
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-4xl mx-auto"
          >
            {report && (
              <ReportPreview 
                report={report} 
                onSend={handleSendReport}
                onBack={() => setStep("upload")}
              />
            )}
          </motion.div>
        );
        
      case "success":
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md mx-auto text-center"
          >
            <Card className="p-8 glass">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <Check className="text-green-600" size={32} />
              </motion.div>
              
              <h2 className="text-2xl font-medium mb-2">Report Sent Successfully</h2>
              <p className="text-muted-foreground mb-6">
                Your report has been sent to the selected groups.
              </p>
              
              <Button onClick={resetForm} className="mt-2">
                Create New Report
              </Button>
            </Card>
          </motion.div>
        );
    }
  };

  return (
    <div className="min-h-screen subtle-gradient py-16 px-4 sm:px-6">
      <AnimatePresence mode="wait">
        {renderStep()}
      </AnimatePresence>
    </div>
  );
};

export default Index;
