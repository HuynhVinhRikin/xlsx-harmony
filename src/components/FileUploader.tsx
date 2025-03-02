
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Upload, X, FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface FileUploaderProps {
  onFileUpload: (files: { ban: File | null, ton: File | null }) => void;
}

const FileUploader = ({ onFileUpload }: FileUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<{ ban: File | null, ton: File | null }>({
    ban: null,
    ton: null
  });
  const banFileInputRef = useRef<HTMLInputElement>(null);
  const tonFileInputRef = useRef<HTMLInputElement>(null);

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

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, fileType: 'ban' | 'ton') => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (validateFile(file)) {
        const updatedFiles = { ...files, [fileType]: file };
        setFiles(updatedFiles);
        onFileUpload(updatedFiles);
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, fileType: 'ban' | 'ton') => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (validateFile(file)) {
        const updatedFiles = { ...files, [fileType]: file };
        setFiles(updatedFiles);
        onFileUpload(updatedFiles);
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

  const handleButtonClick = (fileType: 'ban' | 'ton') => {
    if (fileType === 'ban') {
      banFileInputRef.current?.click();
    } else {
      tonFileInputRef.current?.click();
    }
  };

  const removeFile = (fileType: 'ban' | 'ton') => {
    const updatedFiles = { ...files, [fileType]: null };
    setFiles(updatedFiles);
    onFileUpload(updatedFiles);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Bán file uploader */}
      <Card
        className={`upload-zone rounded-xl p-6 text-center transition-all ${
          isDragging ? 'active' : ''
        }`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, 'ban')}
      >
        <input
          type="file"
          ref={banFileInputRef}
          onChange={(e) => handleFileSelect(e, 'ban')}
          accept=".xls,.xlsx"
          className="hidden"
        />
        
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: isDragging ? 1.05 : 1 }}
          transition={{ duration: 0.2 }}
        >
          {!files.ban ? (
            <>
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
                File Bán
              </h3>
              
              <p className="text-muted-foreground text-sm mb-4">
                Kéo thả file hoặc nhấn chọn file
              </p>
              
              <Button
                onClick={() => handleButtonClick('ban')}
                variant="outline"
                className="transition-all duration-300 hover:bg-primary hover:text-white"
              >
                Chọn File Bán
              </Button>
            </>
          ) : (
            <div className="flex items-center p-3 bg-secondary rounded-md">
              <FileSpreadsheet className="text-primary mr-3" size={20} />
              <div className="flex-1 overflow-hidden text-left">
                <p className="truncate font-medium">{files.ban.name}</p>
                <p className="text-sm text-muted-foreground">
                  {(files.ban.size / 1024).toFixed(2)} KB
                </p>
              </div>
              <Button
                variant="ghost" 
                size="icon"
                onClick={() => removeFile('ban')}
                className="text-muted-foreground"
              >
                <X size={16} />
              </Button>
            </div>
          )}
        </motion.div>
      </Card>

      {/* Tồn file uploader */}
      <Card
        className={`upload-zone rounded-xl p-6 text-center transition-all ${
          isDragging ? 'active' : ''
        }`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, 'ton')}
      >
        <input
          type="file"
          ref={tonFileInputRef}
          onChange={(e) => handleFileSelect(e, 'ton')}
          accept=".xls,.xlsx"
          className="hidden"
        />
        
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: isDragging ? 1.05 : 1 }}
          transition={{ duration: 0.2 }}
        >
          {!files.ton ? (
            <>
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
                File Tồn
              </h3>
              
              <p className="text-muted-foreground text-sm mb-4">
                Kéo thả file hoặc nhấn chọn file
              </p>
              
              <Button
                onClick={() => handleButtonClick('ton')}
                variant="outline"
                className="transition-all duration-300 hover:bg-primary hover:text-white"
              >
                Chọn File Tồn
              </Button>
            </>
          ) : (
            <div className="flex items-center p-3 bg-secondary rounded-md">
              <FileSpreadsheet className="text-primary mr-3" size={20} />
              <div className="flex-1 overflow-hidden text-left">
                <p className="truncate font-medium">{files.ton.name}</p>
                <p className="text-sm text-muted-foreground">
                  {(files.ton.size / 1024).toFixed(2)} KB
                </p>
              </div>
              <Button
                variant="ghost" 
                size="icon"
                onClick={() => removeFile('ton')}
                className="text-muted-foreground"
              >
                <X size={16} />
              </Button>
            </div>
          )}
        </motion.div>
      </Card>
    </div>
  );
};

export default FileUploader;
