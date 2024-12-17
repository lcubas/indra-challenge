import { Transformer } from '../../../services/Transformer';
import { Specie } from '../entities/Specie';

const speciesMappings = {
  name: "nombre",
  classification: "clasificacion",
  designation: "designacion",
  average_height: "altura_promedio",
  skin_colors: "colores_piel",
  hair_colors: "colores_cabello",
  eye_colors: "colores_ojos",
  average_lifespan: "esperanza_vida",
  homeworld: "mundo_origen",
  language: "idioma",
  people: "personas",
  films: "peliculas",
  created: "creado",
  edited: "editado",
  url: "url",
};

export const speciesTransformer = new Transformer<Specie>(speciesMappings);
