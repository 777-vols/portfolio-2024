'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

import { urls } from '@/constants';
import { usePreviewFoggyTrail } from '@/hooks';

const { portfolio } = urls;

const Home = ({ params: { locale } }: ILocaleParams) => {
  usePreviewFoggyTrail();
  return (
    <main className="w-full h-dvh flex flex-col justify-center items-center">
      <motion.h1
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute top-72 pointer-events-none font-pacifico text-5xl p-5 text-center bg-gradient-to-r from-red-600 to-blue-500 bg-clip-text text-transparent max-sm:text-3xl">
        Move your mouse or swipe
      </motion.h1>
      <Link
        href={`/${locale}${portfolio}`}
        className="absolute top-96 text-white hover:text-red-500 duration-150 tracking-wider text-3xl font-medium mix-blend-color-dodge max-sm:text-xl">
        Click to view portfolio
      </Link>
      <span className="absolute bottom-0 text-xs pointer-events-none p-4">
        Copyright © 2024 Portfolio
      </span>
      <canvas className="h-full w-full" />
    </main>
  );
};

export default Home;
