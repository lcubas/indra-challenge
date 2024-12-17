export class SwapiApiService {
  private static readonly baseUrl = 'https://swapi.py4e.com/api';

  static async getSpecies(): Promise<any[]> {
    try {
      const response = await fetch(`${SwapiApiService.baseUrl}/species`);
      const data =  await response.json();
      return data.results;
    } catch (error) {
      console.error('SwapiApiService::getSpecies', error);
      throw error;
    }
  }

  static async getSpecieById(id: string): Promise<any> {
    try {
      const response = await fetch(`${SwapiApiService.baseUrl}/species/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('SwapiApiService::getSpecieById', error);
      throw error;
    }
  }
}
