import type { ClassValue } from 'clsx';
import { clsx } from 'clsx';

export const cx = (...values: ClassValue[]): string => clsx(values);
