export interface CardTempalting {
    chartName: string,
    chartType: "pie"|"column",
    chartData: Array<Array<string|number>>,
    total: number,
    chartXaxis?: Array<string>;
    chartYaxis?: string;
}
