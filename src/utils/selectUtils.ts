import { SelectOption } from '@/types';
import { capitalizeFirstLetter } from './textUtils';

export function selectOptions<T extends Record<string, string>>(
  optionsType: T,
): SelectOption[] {
  return Object.values(optionsType).map(type => ({
    value: optionsType[type],
    label: capitalizeFirstLetter(optionsType[type]),
  }));
}
