import { APIGatewayProxyEvent } from 'aws-lambda';
import { SwapiApiService } from './services/SwapiApiService';
import { speciesTransformer } from './transformers/species.transformer';

export const getSpecies = async () => {
  const species = await SwapiApiService.getSpecies();

  return {
    statusCode: 200,
    body: JSON.stringify({
      data: speciesTransformer.transform(species),
    }),
  };
};

export const getSpecieById = async (event: APIGatewayProxyEvent) => {
  const { specieId } = event.pathParameters || {};

  if (!specieId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'specieId is required' }),
    };
  }

  const specie = await SwapiApiService.getSpecieById(specieId);

  return {
    statusCode: 200,
    body: JSON.stringify({
      data: speciesTransformer.transform(specie),
    }),
  };
};
