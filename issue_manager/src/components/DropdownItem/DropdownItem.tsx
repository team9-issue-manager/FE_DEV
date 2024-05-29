import React from 'react';
import './DropdownItem.css'; // Assuming you have some CSS for styling

interface DropdownItemProps {
  children: React.ReactNode;
  onClick?: (item: string) => void; // Make onClick optional
}

const DropdownItem: React.FC<DropdownItemProps> = ({ children, onClick }) => {
  return (
    <div onClick={() => onClick && onClick(children as string)} className="dropdown-item">
      {children}
    </div>
  );
};

export default DropdownItem;
