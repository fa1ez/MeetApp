import React, { useState } from "react";
import "react-modern-drawer/dist/index.css";
import Drawer from "react-modern-drawer";

export default function DrawerComponent({ drawerOpen, setDrawerOpen, title }) {
  return (
    <div>
      <Drawer
        open={drawerOpen}
        onClose={() => {
          setDrawerOpen((prevState) => !prevState);
        }}
        direction="bottom"
        // className="bla bla bla"
      >
        <div>{title}</div>
      </Drawer>
    </div>
  );
}
