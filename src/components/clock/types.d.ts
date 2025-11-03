import type { AnimationProps, StyleProps, TimeFormat } from '../../types';
import type React from 'react';

/**
 * The methods available on the Clock component.
 * Empty for now, but can be extended in the future.
 */
type ClockMethods = {};

/**
 * The props for the Clock component.
 * ClockProps
 * @extends {StyleProps}
 * @extends {AnimationProps}
 * @prop {TimeFormat} [format='24'] - The time format to be used. Can be either '12' or '24'.
 * @prop {number} [intervalMs=1000] - The interval in milliseconds to update the clock.
 */
type ClockProps = StyleProps &
  AnimationProps & {
    /** The time format to be used. Can be either '12' or '24'.
     * @default '24'
     * @type {"12" | "24"}
     * */
    format?: TimeFormat;
    /** The interval in milliseconds to update the clock.
     * @default 1000
     * */
    intervalMs?: number;

    children: React.ReactNode;
  };

export type { ClockMethods, ClockProps };
