export function combineClassNames({
  merge,
  fallbackClassName,
  className,
  twMerge,
}: {
  merge: boolean;
  fallbackClassName?: string;
  className?: string;
  twMerge?: (a?: string, b?: string) => string;
}) {
  if (!merge) {
    return className || fallbackClassName;
  }
  if (!twMerge) {
    console.warn(
      'mergeClassNames is enabled but tailwind-merge is not installed. Please install tailwind-merge to use this feature.'
    );
    return className || fallbackClassName;
  }
  return twMerge(fallbackClassName, className);
}
