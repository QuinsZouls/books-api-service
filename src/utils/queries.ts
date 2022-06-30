import { Query } from '@/interfaces/services.interface';

const numericFields = ['$sort', '$limit', '$skip'];

export function parseQueries(queries: any = {}, allowed: string[] = []): Query[] {
  const parsedQueries: Query[] = [];

  for (const key of Object.keys(queries)) {
    if (typeof queries[key] === 'object') {
      // Validate operators
      for (const subKey of Object.keys(queries[key])) {
        if (!allowed.includes(subKey)) {
          if (key === '$sort') {
            queries[key][subKey] = parseInt(queries[key][subKey]);
          } else {
            throw new Error(`operator ${subKey} not allowed`);
          }
        }
      }
      parsedQueries.push({
        value: queries[key],
        field: key,
      });
    } else {
      let value = queries[key];
      if (numericFields.includes(key)) {
        value = parseInt(queries[key]);
      }
      parsedQueries.push({
        value,
        field: key,
      });
    }
  }

  return parsedQueries;
}
