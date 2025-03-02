
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FileSpreadsheet, Upload, ArrowRight, Check, AlertCircle, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import FileUploader from "@/components/FileUploader";
import ReportPreview from "@/components/ReportPreview";
import LoadingSpinner from "@/components/LoadingSpinner";
import { processExcelFile } from "@/lib/excelProcessor";
import { Report } from "@/types/report";

const Index = () => {
  const [files, setFiles] = useState<{ ban: File | null, ton: File | null }>({ ban: null, ton: null });
  const [isProcessing, setIsProcessing] = useState(false);
  const [report, setReport] = useState<Report | null>(null);
  const [step, setStep] = useState<"upload" | "preview" | "success">("upload");

  const handleFileUpload = (uploadedFiles: { ban: File | null, ton: File | null }) => {
    setFiles(uploadedFiles);
    
    if (uploadedFiles.ban) {
      toast({
        title: "File Bán uploaded",
        description: `${uploadedFiles.ban.name} is ready for processing.`,
      });
    }
    
    if (uploadedFiles.ton) {
      toast({
        title: "File Tồn uploaded",
        description: `${uploadedFiles.ton.name} is ready for processing.`,
      });
    }
  };

  const handleProcessFile = async () => {
    if (!files.ban && !files.ton) {
      toast({
        variant: "destructive",
        title: "No files selected",
        description: "Please upload at least one file to process.",
      });
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // Process the Excel files
      const processedReport = await processExcelFile(files);
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
        description: "There was an error processing your Excel files. Please try again.",
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
    setFiles({ ban: null, ton: null });
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
            className="w-full max-w-4xl mx-auto"
          >
            <Card className="glass border-none shadow-lg">
              <div className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 p-6 border-b backdrop-blur-sm">
                <div className="flex items-center space-x-4">
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-3 rounded-xl shadow-md">
                    <FileSpreadsheet size={28} className="text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Excel Report Processor</h1>
                    <p className="text-muted-foreground">Upload your Excel files to generate a comprehensive report</p>
                  </div>
                </div>
              </div>
              
              <CardContent className="p-6 space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-lg p-4 border border-blue-100 dark:border-blue-900">
                  <h2 className="text-lg font-medium mb-2 flex items-center">
                    <Upload size={18} className="text-blue-500 mr-2" />
                    Upload Files
                  </h2>
                  <p className="text-sm text-muted-foreground mb-6">
                    Please upload both "bán" and "tồn" Excel files to generate your report
                  </p>
                  
                  <FileUploader onFileUpload={handleFileUpload} />
                </div>
                
                {(files.ban || files.ton) && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                    className="border-t pt-6"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-medium mb-1">Files Ready for Processing</h3>
                        <p className="text-sm text-muted-foreground">
                          {files.ban && files.ton 
                            ? "Both files uploaded successfully." 
                            : "One file uploaded. You can proceed or upload the other file."}
                        </p>
                      </div>
                      <Button
                        variant="default"
                        size="lg"
                        onClick={handleProcessFile}
                        disabled={isProcessing}
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-md"
                      >
                        {isProcessing ? (
                          <LoadingSpinner />
                        ) : (
                          <>
                            Process Files <ArrowRight size={16} className="ml-2" />
                          </>
                        )}
                      </Button>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4 bg-white/60 backdrop-blur-sm border-none shadow-md">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Upload size={18} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Upload</h3>
                    <p className="text-xs text-muted-foreground">Upload your Excel files</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4 bg-white/60 backdrop-blur-sm border-none shadow-md">
                <div className="flex items-center space-x-3">
                  <div className="bg-indigo-100 p-2 rounded-full">
                    <Image size={18} className="text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Preview</h3>
                    <p className="text-xs text-muted-foreground">Review the report images</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4 bg-white/60 backdrop-blur-sm border-none shadow-md">
                <div className="flex items-center space-x-3">
                  <div className="bg-purple-100 p-2 rounded-full">
                    <Send size={18} className="text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Send</h3>
                    <p className="text-xs text-muted-foreground">Share with your team</p>
                  </div>
                </div>
              </Card>
            </div>
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
            <Card className="p-8 glass border-none shadow-lg">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                className="w-20 h-20 bg-gradient-to-r from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md"
              >
                <Check className="text-green-600" size={36} />
              </motion.div>
              
              <h2 className="text-2xl font-medium mb-2 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Report Sent Successfully</h2>
              <p className="text-muted-foreground mb-6">
                Your report has been sent to the selected groups.
              </p>
              
              <Button 
                onClick={resetForm} 
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-md"
                size="lg"
              >
                Create New Report
              </Button>
            </Card>
          </motion.div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-indigo-950 py-16 px-4 sm:px-6">
      <AnimatePresence mode="wait">
        {renderStep()}
      </AnimatePresence>
    </div>
  );
};

export default Index;
