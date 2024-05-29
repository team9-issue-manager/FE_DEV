import React, { useState, useEffect, useRef } from 'react';
import DropdownButton from '../DropdownButton/DropdownButton';
import DropdownContent from '../DropdownContent/DropdownContent';
import './Dropdown.css';

interface DropdownProps {
  buttonText: string;
  content: React.ReactNode;
  onSelect: (item: string) => void;
  selectedItem: string;
}

const Dropdown: React.FC<DropdownProps> = ({ buttonText, content, onSelect, selectedItem }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [dropdownTop, setDropdownTop] = useState<number>(0);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    if (!open && buttonRef.current && contentRef.current) {
      const spaceRemaining = window.innerHeight - buttonRef.current.getBoundingClientRect().bottom;
      const contentHeight = contentRef.current.clientHeight;

      const topPosition = spaceRemaining > contentHeight ? 0 : -(contentHeight - spaceRemaining);
      setDropdownTop(topPosition);
    }

    setOpen((open) => !open);
  };

  const handleItemClick = (item: string) => {
    onSelect(item);
    setOpen(false);
  };

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handler);

    return () => {
      document.removeEventListener("click", handler);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="dropdown">
      <DropdownButton ref={buttonRef} toggle={toggleDropdown} open={open}>
        {selectedItem ? selectedItem : buttonText} {/* 선택된 항목이 없으면 "Role" 표시 */}
      </DropdownButton>
      <DropdownContent top={dropdownTop} ref={contentRef} open={open}>
        {React.Children.map(content, (child) =>
          React.cloneElement(child as React.ReactElement<any>, { onClick: handleItemClick })
        )}
      </DropdownContent>
    </div>
  );
};

export default Dropdown;
