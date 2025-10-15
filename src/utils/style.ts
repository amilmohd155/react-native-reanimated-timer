let twMerge: ((...classLists: any[]) => string) | undefined;

try {
  // Dynamically require to avoid build-time resolution
  twMerge = require('tailwind-merge').twMerge;
} catch {
  twMerge = undefined;
}

/**
 * Utility function to combine and optionally merge Tailwind CSS class names.
 * Uses `tailwind-merge` if available to intelligently merge class names.
 *
 */
export function combineClassNames({
  merge,
  fallbackClassName,
  className,
}: {
  merge: boolean;
  fallbackClassName?: string;
  className?: string;
}) {
  if (!merge) {
    return className || fallbackClassName;
  }

  if (!twMerge) {
    console.warn(
      'combineClassNames: merge=true but "tailwind-merge" is not installed. Please install it to use merging.'
    );
    return className || fallbackClassName;
  }

  return twMerge(fallbackClassName, className);
}
