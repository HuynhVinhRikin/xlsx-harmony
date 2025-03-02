
import { useState } from "react";
import { Send, Users, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface GroupSelectionProps {
  onSend: (selectedGroups: string[]) => void;
}

const GroupSelection = ({ onSend }: GroupSelectionProps) => {
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [newGroup, setNewGroup] = useState("");
  
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
  
  return (
    <div>
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
    </div>
  );
};

export default GroupSelection;
