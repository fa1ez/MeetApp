import React, { useState } from "react";
import "react-modern-drawer/dist/index.css";
import Drawer from "react-modern-drawer";
import { PLUS_ICON, RIGHT_ARROW } from "../constants/constants";

function DrawerHeader({ title }) {
  return (
    <>
      <div className="flex w-full justify-center underline italic text-gray-600 mb-2 font-bold">
        {title}
      </div>
      <hr />
    </>
  );
}

export default function DrawerComponent({ drawerOpen, setDrawerOpen, title }) {
  return (
    <div>
      <Drawer
        open={drawerOpen}
        onClose={() => {
          setDrawerOpen((prevState) => !prevState);
        }}
        direction="bottom"
        className="rounded-t-xl p-3 overflow-auto"
        size={"50vh"}
      >
        {title === "Board" ? (
          <div className="w-full">
            <DrawerHeader title={"Appointment Details"} />
            <div className="mt-3 w-full sm:w-3/5 mx-auto cursor-pointer hover:bg-gray-100">
              <div className="ring-2 ring-slate-100 shadow-lg rounded-lg p-3 ">
                <div className="flex justify-between mx-5">
                  <div>
                    <h1 className="font-semibold text-lg">Medical Records</h1>
                    <h5 className="text-sm text-gray-500">
                      Patients Medical History
                    </h5>
                  </div>
                  <div className="flex items-center text-gray-500">
                    {RIGHT_ARROW}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-3 w-full sm:w-3/5 mx-auto cursor-pointer hover:bg-gray-100">
              <div className="ring-2 ring-slate-100 shadow-lg rounded-lg p-3 ">
                <div className="flex justify-between mx-5">
                  <div>
                    <h1 className="font-semibold text-lg">Medical Records</h1>
                    <h5 className="text-sm text-gray-500">
                      Patients Medical History
                    </h5>
                  </div>
                  <div className="flex items-center text-gray-500">
                    {RIGHT_ARROW}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-3 w-full sm:w-3/5 mx-auto cursor-pointer hover:bg-gray-100">
              <div className="ring-2 ring-slate-100 shadow-lg rounded-lg p-3 ">
                <div className="flex justify-between mx-5">
                  <div>
                    <h1 className="font-semibold text-lg">Medical Records</h1>
                    <h5 className="text-sm text-gray-500">
                      Patients Medical History
                    </h5>
                  </div>
                  <div className="flex items-center text-gray-500">
                    {RIGHT_ARROW}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : title === "plus1" ? (
          <div>
            <DrawerHeader title={"Prescribe Medication"} />
            <div className="h-[200px] flex flex-col items-center justify-center">
              <div className="text-white hover:text-gray-100 cursor-pointer">
                {PLUS_ICON}
              </div>
              <h1>ADD</h1>
            </div>
          </div>
        ) : title === "monitor" ? (
          <div>
            <DrawerHeader title={"Suggest lab test"} />
            <div className="h-[200px] flex flex-col items-center justify-center">
              <div className="text-white hover:text-gray-100 cursor-pointer">
                {PLUS_ICON}
              </div>
              <h1>ADD</h1>
            </div>
          </div>
        ) : title === "plus2" ? (
          <div>
            <DrawerHeader title={"Add Note"} />
            <div className="w-full flex justify-center mt-5">
              <div className="w-full sm:w-3/5 ">
                <textarea
                  placeholder="Enter Note"
                  rows={4}
                  className="rounded-md border-2 border-gray-600 p-1 w-full"
                ></textarea>
                <button className="text-white bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 focus:outline-none">Save</button>
              </div>
            </div>
          </div>
        ) : null}
      </Drawer>
    </div>
  );
}
