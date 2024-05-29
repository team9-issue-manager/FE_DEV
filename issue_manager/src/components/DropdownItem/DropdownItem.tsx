import React from 'react';
import './DropdownItem.css'; // Assuming you have some CSS for styling

interface DropdownItemProps {
  children: React.ReactNode;
  onClick?: (item: string) => void; // Make onClick optional
}

const DropdownItem: React.FC<DropdownItemProps> = ({ children, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(children as string); // 역할 선택 시 onClick 콜백 호출
    }
  };

  return (
    <div onClick={handleClick} className="dropdown-item">
      {children}
    </div>
  );
};

export default DropdownItem;

// import React from 'react';
// import './DropdownItem.css'; // Assuming you have some CSS for styling

// interface DropdownItemProps {
//   children: React.ReactNode;
//   onClick?: (item: string) => void; // Make onClick optional
// }

// const DropdownItem: React.FC<DropdownItemProps> = ({ children, onClick }) => {
//   return (
//     <div onClick={() => onClick && onClick(children as string)} className="dropdown-item">
//       {children}
//     </div>
//   );
// };

// export default DropdownItem;
