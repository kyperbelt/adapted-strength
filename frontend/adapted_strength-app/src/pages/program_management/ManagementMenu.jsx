import { useState } from "react";

export default function ManagementMenu({ selectedDefault, onSelect }) {
  const menuItems = [
    // "Overview",
    "Programs",
    "Clients"
  ];

  const selectedIndex = selectedDefault ? menuItems.indexOf(selectedDefault) : 0;
  const [selected, setSelected] = useState(selectedIndex);

  return (
    <div className="flex flex-row justify-center items-center mt-6 mb-6">
      {menuItems.map((menuItem, index) => {
        return (
          <MenuButton key={index} className={index === selected ? "text-black font-bold" : "text-slate-500"} onClick={() => {
            setSelected(index);
            if (onSelect) {
              onSelect(menuItem);
            }
          }}>
            {menuItem}
          </MenuButton>
        );
      }
      )}
    </div>
  );
}

function MenuButton({ className, ...props }) {
  return (
    <button className={`mx-5 hover:text-black flex flex-row items-center ${className}`} {...props}>
      {props.children}
    </button>
  );
}
