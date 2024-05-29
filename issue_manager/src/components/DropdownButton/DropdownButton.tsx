import "./DropdownButton.css"
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import {forwardRef, ForwardedRef} from "react";

interface DropdownButtonProps {
    children: React.ReactNode;
    toggle: () => void;
    open: boolean;
  }

const DropdownButton = forwardRef((props:DropdownButtonProps,ref: ForwardedRef<HTMLDivElement>) => {
    const {children, toggle, open}=props;
    return (
        <div 
            onClick={toggle} 
            className={'dropdown-btn ${open ? "button-open":null}'}
            ref={ref}
        >
            {children}
            <span className="toggle-icon">
                {open ? <FaChevronUp /> : <FaChevronDown />}
            </span>
        </div>
    );
});

export default DropdownButton;