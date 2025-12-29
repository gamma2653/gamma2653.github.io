export const mergeClasses = (...classes: (string | undefined)[]) => {
  return classes.map(cls => cls?.split(' ') ?? []).flat().filter(Boolean).join(' ');
}
