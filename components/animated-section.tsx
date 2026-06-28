"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

type AnimatedSectionProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "article";
  id?: string;
  ariaLabelledBy?: string;
};

export function AnimatedSection({
  children,
  className,
  delay = 0,
  as = "section",
  id,
  ariaLabelledBy,
}: AnimatedSectionProps) {
  const Component = motion[as];

  return (
    <Component
      id={id}
      aria-labelledby={ariaLabelledBy}
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, ease: "easeOut", delay }}
    >
      {children}
    </Component>
  );
}
