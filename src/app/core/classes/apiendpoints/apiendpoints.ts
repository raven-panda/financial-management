/**
 * All API endpoints with domain as private property
 */
export class ApiEndpoints {
    private static readonly domain = 'http://localhost';
    
    public static readonly api: string = this.domain + '/api';
    public static readonly financials: string = this.domain + '/api/financials';
    public static readonly estates: string = this.domain + '/api/estates';
}