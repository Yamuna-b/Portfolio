'use client';

import React from 'react';
import { GadgetCard } from './gadget-card';
import { products } from '@/data/products';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import ShinyButton from '../ui/shiny-button';

const FeaturedGadgets = () => {
  const featuredGadgets = products.filter(product => product.featured).slice(0, 2);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Gadgets</h2>
      <div className="grid gap-6 sm:grid-cols-2">
        {featuredGadgets.map((product) => (
          <GadgetCard key={product.id} product={product} />
        ))}
      </div>
      <Link
        href="/gadgets"
        className="mt-4 block"
      >
          <ShinyButton
                className="w-full sm:w-auto group transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] font-semibold"
              >
          View All Gadgets →
        </ShinyButton>
      </Link>
    </div>
  );
};

export { FeaturedGadgets };
