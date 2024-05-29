import React, { forwardRef, ForwardedRef } from "react";
import "./DropdownContent.css";

interface DropdownContentProps {
  children: React.ReactNode;
  open: boolean;
  top?: number;
}

const DropdownContent = forwardRef<HTMLDivElement, DropdownContentProps>(
  (props, ref: ForwardedRef<HTMLDivElement>) => {
    const { children, open, top } = props;
    
    return (
      <div
        className={`dropdown-content ${open ? "content-open" : ""}`}
        style={{ top: top ? `${top}px` : "100%" }}
        ref={ref}
      >
        {children}
      </div>
    );
  }
);

export default DropdownContent;
