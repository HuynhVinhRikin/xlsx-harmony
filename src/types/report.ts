
export interface Report {
  files: {
    ban: string;
    ton: string;
  };
  images: string[];
  filename: string;
  summary: {
    metrics: Array<{
      label: string;
      value: string;
    }>;
    insights: string[];
  };
  details: {
    headers: string[];
    rows: string[][];
  };
}
