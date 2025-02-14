function extractKeywords(title: string): string[] {
  return title
    .toLowerCase()
    .split(" ")
    .filter((word) => word.length > 3);
}
