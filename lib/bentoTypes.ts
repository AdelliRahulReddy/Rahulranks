import { LucideIcon } from "lucide-react";

export type BoxType = 
  | "hero"
  | "stats"
  | "github"
  | "availability"
  | "currentProject"
  | "approach"
  | "responseTime"
  | "achievement"
  | "workStyle"
  | "cta"
  | "analytics"
  | "automation"
  | "deliveryTime"
  | "projects"
  | "stackIcon"
  | "button"
  | "status"
  | "rocket"
  | "lighthouse"
  | "grid"
  | "focus"
  | "process";

export interface BentoBox {
  id: string;
  type: BoxType;
  gridArea: string;
  
  title?: string;
  subtitle?: string;
  description?: string;
  icon?: LucideIcon;
  
  bgColor?: string;
  textColor?: string;
  illustration?: string;
  
  animation?: {
    type: "rotate" | "float" | "pulse" | "scale" | "slide" | "custom";
    duration?: number;
    delay?: number;
  };
  
  link?: string;
  onClick?: () => void;
  
  data?: any;
  customProps?: Record<string, any>;
}
