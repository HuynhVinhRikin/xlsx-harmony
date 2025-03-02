
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FileUploaderProps {
  onFileUpload: (file: File) => void;
}

const FileUploader = ({ onFileUpload }: FileUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (validateFile(file)) {
        onFileUpload(file);
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (validateFile(file)) {
        onFileUpload(file);
      }
    }
  };

  const validateFile = (file: File): boolean => {
    // Check if file is Excel file
    const validTypes = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
    if (!validTypes.includes(file.type)) {
      alert('Please select an Excel file (XLS or XLSX)');
      return false;
    }
    
    // Check file size (10MB max)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      alert('File is too large. Maximum size is 10MB.');
      return false;
    }
    
    return true;
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className={`upload-zone rounded-xl p-8 text-center transition-all ${
        isDragging ? 'active' : ''
      }`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept=".xls,.xlsx"
        className="hidden"
      />
      
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: isDragging ? 1.05 : 1 }}
        transition={{ duration: 0.2 }}
      >
        <div className="mb-4">
          <motion.div 
            className="mx-auto bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center text-primary"
            animate={{ y: isDragging ? -8 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            <Upload size={28} />
          </motion.div>
        </div>
        
        <h3 className="text-lg font-medium mb-2">
          {isDragging ? "Drop your file here" : "Upload Excel File"}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-4">
          Drag and drop or click to browse
        </p>
        
        <Button
          onClick={handleButtonClick}
          variant="outline"
          className="transition-all duration-300 hover:bg-primary hover:text-white"
        >
          Choose File
        </Button>
        
        <p className="mt-4 text-xs text-muted-foreground">
          Supports .XLS, .XLSX (up to 10MB)
        </p>
      </motion.div>
    </div>
  );
};

export default FileUploader;
