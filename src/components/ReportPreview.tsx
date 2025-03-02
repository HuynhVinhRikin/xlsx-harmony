
import { useState } from "react";
import { motion } from "framer-motion";
import { Send, ArrowLeft, Users, FileSpreadsheet, Image, List, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Report } from "@/types/report";

interface ReportPreviewProps {
  report: Report;
  onSend: (selectedGroups: string[]) => void;
  onBack: () => void;
}

const ReportPreview = ({ report, onSend, onBack }: ReportPreviewProps) => {
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [newGroup, setNewGroup] = useState("");
  const [activeTab, setActiveTab] = useState("images");
  
  // Predefined groups (in a real app, these would come from an API)
  const availableGroups = [
    "Management Team",
    "Finance Department",
    "Operations",
    "Sales Team",
    "Marketing"
  ];
  
  const handleGroupToggle = (group: string) => {
    setSelectedGroups(prev => 
      prev.includes(group)
        ? prev.filter(g => g !== group)
        : [...prev, group]
    );
  };
  
  const handleAddGroup = () => {
    if (newGroup.trim() && !availableGroups.includes(newGroup) && !selectedGroups.includes(newGroup)) {
      setSelectedGroups(prev => [...prev, newGroup]);
      setNewGroup("");
    }
  };
  
  const handleSendReport = () => {
    if (selectedGroups.length === 0) {
      alert("Please select at least one group to send the report to.");
      return;
    }
    
    onSend(selectedGroups);
  };

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
          </TabsContent>
          
          <TabsContent value="summary" className="p-6 min-h-80">
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
          </TabsContent>
          
          <TabsContent value="details" className="p-6 min-h-80">
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
          </TabsContent>
        </Tabs>
      </Card>
      
      <Card className="glass">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-medium flex items-center">
            <Users size={18} className="mr-2" />
            Send Report To
          </h3>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedGroups.map(group => (
                <Badge 
                  key={group} 
                  variant="secondary"
                  className="flex items-center gap-1 pl-3 pr-2 py-1.5"
                >
                  {group}
                  <button 
                    onClick={() => handleGroupToggle(group)}
                    className="ml-1 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X size={14} />
                  </button>
                </Badge>
              ))}
              
              {selectedGroups.length === 0 && (
                <p className="text-sm text-muted-foreground italic">
                  No groups selected
                </p>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium mb-3">Available Groups</h4>
                <div className="space-y-3">
                  {availableGroups.map(group => (
                    <div key={group} className="flex items-center space-x-2">
                      <Checkbox
                        id={`group-${group}`}
                        checked={selectedGroups.includes(group)}
                        onCheckedChange={() => handleGroupToggle(group)}
                      />
                      <Label htmlFor={`group-${group}`} className="text-sm cursor-pointer">
                        {group}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-3">Add Custom Group</h4>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Enter group name"
                    value={newGroup}
                    onChange={e => setNewGroup(e.target.value)}
                    className="flex-1"
                  />
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={handleAddGroup}
                    disabled={!newGroup.trim()}
                  >
                    <Plus size={16} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end mt-6">
            <Button
              onClick={handleSendReport}
              disabled={selectedGroups.length === 0}
              className="flex items-center"
            >
              <Send size={16} className="mr-2" />
              Send Report
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ReportPreview;
