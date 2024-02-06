'use client';

import { easeInOut, motion } from 'framer-motion';

const TransitionEffect = () => (
  <>
    <motion.div
      className="fixed top-0 bottom-0 right-full w-screen h-screen z-50 bg-indigo-950"
      initial={{ x: '100%', width: '100%' }}
      animate={{ x: '0%', width: '0%' }}
      transition={{ duration: 0.8, ease: easeInOut }}
    />
    <motion.div
      className="fixed top-0 bottom-0 right-full w-screen h-screen z-40 bg-indigo-900"
      initial={{ x: '100%', width: '100%' }}
      animate={{ x: '0%', width: '0%' }}
      transition={{ delay: 0.2, duration: 0.8, ease: easeInOut }}
    />
    <motion.div
      className="fixed top-0 bottom-0 right-full w-screen h-screen z-30 bg-indigo-800"
      initial={{ x: '100%', width: '100%' }}
      animate={{ x: '0%', width: '0%' }}
      transition={{ delay: 0.4, duration: 0.8, ease: easeInOut }}
    />
  </>
);

export default TransitionEffect;
