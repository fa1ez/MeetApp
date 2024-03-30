import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BOARD, BURGER, CROSS, MONITOR, PLUS1, PLUS2 } from '../constants/constants';
import DrawerComponent from './Drawer';
import "react-modern-drawer/dist/index.css";


export default function Header() {
  const [open, setOpen] = useState(false);
  const [drawer, setDrawer] = useState();
  const [drawerOpen, setDrawerOpen] = useState(false)

  const variants = {
    closed: (index) => ({
      opacity: 0,
      x: 0,
      y: 0,
    }),
    open: (index) => ({
      opacity: 1,
      // Use a slight delay for each item based on its order to create a staggered effect
      transition: { delay: index * 0.1   },
      x: [-20, 0], // Slight bounce effect
      y: [-20, 0], // Slight bounce effect
    }),
  };

  const variant2 = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  return (
    <div className="inline-flex relative z-50">
      <div
        className="rounded-full p-3 bg-blue-400 absolute left-5 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <motion.div
          animate={open ? "hidden" : "visible"}
          variants={variant2}
          initial={false}
          transition={{ duration: 0.2 }}
          className="absolute"
        >
          {BURGER}
        </motion.div>
        <motion.div
          animate={open ? "visible" : "hidden"}
          variants={variant2}
          initial={false}
          transition={{ duration: 0.2 }}
        >
          {CROSS}
        </motion.div>
      </div>
      <DrawerComponent drawerOpen = {drawerOpen} setDrawerOpen={setDrawerOpen} title={drawer}/>
      <motion.div
        className="absolute left-[135px] top-[10px]"
        initial="closed"
        custom={1}  
        animate={open ? 'open' : 'closed'}
        variants={variants}
        onClick={()=>(setDrawerOpen(true),setDrawer("Board"))}
      >
        <div className="rounded-full p-2 bg-gray-400 cursor-pointer">{BOARD}</div>
      </motion.div>
      <motion.div
        className="absolute left-[115px] top-[55px]"
        initial="closed"
        custom={2} 
        animate={open ? 'open' : 'closed'}
        variants={variants}
        onClick={()=>(setDrawerOpen(true),setDrawer("plus1"))}
      >
        <div className="rounded-full p-2 bg-purple-500 cursor-pointer">{PLUS1}</div>
      </motion.div>
      <motion.div
        className="absolute left-[78px] top-[90px]"
        initial="closed"
        custom={3} 
        animate={open ? 'open' : 'closed'}
        variants={variants}
        onClick={()=>(setDrawerOpen(true),setDrawer("monitor"))}
      >
        <div className="rounded-full p-2 bg-green-400 cursor-pointer">{MONITOR}</div>
      </motion.div>
      <motion.div
        className="absolute left-[30px] top-[110px]"
        initial="closed"
        custom={4} 
        animate={open ? 'open' : 'closed'}
        variants={variants}
        onClick={()=>(setDrawerOpen(true),setDrawer("plus2"))}
      >
        <div className="rounded-full p-2 bg-indigo-500 cursor-pointer">{PLUS2}</div>
      </motion.div>
    </div>
  );
}
