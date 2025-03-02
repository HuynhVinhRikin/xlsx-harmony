
export interface Report {
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
