function formatMs(ms: number, outputFormat: "default" | "clock" = "default") {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);

  const baseFormat = `${minutes}min ${seconds}s`;
  const clockFormat = `${minutes}:${seconds}`;

  return outputFormat === "clock" ? clockFormat : baseFormat;
}

export default formatMs;
