export interface CardTempalting {
    chartName: string,
    chartType: "pie"|"column",
    chartData: Array<Array<string|number|Date>>,
    total: number,
    routerLink: string,
    chartXaxis?: Array<string>;
    chartYaxis?: string;
}
