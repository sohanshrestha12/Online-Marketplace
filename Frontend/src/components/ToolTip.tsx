import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import React from "react";

interface ToolTipProps {
    name:string;
    children:React.ReactNode;
}

const ToolTip = ({name,children}:ToolTipProps) =>{
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>{children}</TooltipTrigger>
          <TooltipContent>
            <p className="font-semibold capitalize">{name}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
}

export default ToolTip;