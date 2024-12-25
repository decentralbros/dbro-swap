import React, { memo, useState } from "react";
import BottomNavItem from "../BottomNavItem";
import { Box } from "../Box";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import { NotificationDot } from "../NotificationDot";
import { Overlay } from "../Overlay";
import StyledBottomNav from "./styles";
import { BottomNavProps } from "./types";

const BottomNav: React.FC<React.PropsWithChildren<BottomNavProps>> = ({
  items = [],
  activeItem = "",
  activeSubItem = "",
  ...props
}) => {
  const [menuOpenByIndex, setMenuOpenByIndex] = useState({});
  const isBottomMenuOpen = Object.values(menuOpenByIndex).some((acc) => acc);
  return (
    <>
      {isBottomMenuOpen && <Overlay />}
      <StyledBottomNav justifyContent="space-around" {...props}>
        {items.map(
          (
            { label, items: menuItems, href, icon, fillIcon, showOnMobile = true, showItemsOnMobile = true, disabled },
            index
          ) => {
            const statusColor = menuItems?.find((menuItem) => menuItem.status !== undefined)?.status?.color;
            return (
              showOnMobile &&
              href && (
                <DropdownMenu
                  key={`${label}#${href}`}
                  items={menuItems}
                  isBottomNav
                  activeItem={activeSubItem}
                  showItemsOnMobile={showItemsOnMobile}
                  setMenuOpenByIndex={setMenuOpenByIndex}
                  index={index}
                  isDisabled={disabled}
                >
                  <Box>
                    <NotificationDot show={!!statusColor} color={statusColor}>
                      <BottomNavItem
                        href={href}
                        disabled={disabled}
                        isActive={href === activeItem}
                        label={label}
                        icon={icon}
                        fillIcon={fillIcon}
                        showItemsOnMobile={showItemsOnMobile}
                      />
                    </NotificationDot>
                  </Box>
                </DropdownMenu>
              )
            );
          }
        )}
      </StyledBottomNav>
    </>
  );
};

export default memo(BottomNav);
