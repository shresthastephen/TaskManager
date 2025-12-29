import { clsx } from 'clsx';  //utility for conditionally joining class names
import { twMerge } from 'tailwind-merge'; //package

export function cn(...classes: any[]) {
  return twMerge(clsx(...classes));
}
