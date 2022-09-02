export interface CardValue {
  value: number;
  display: number | string;
}

export interface Deck {
  name: string;
  enumName: string;
  values: CardValue[];
}

export const decks: Deck[] = [
  {
    name: 'Fibonacci',
    enumName: 'FIBONACCI',
    values: [
      { value: 0, display: 0 },
      { value: 1, display: 1 },
      { value: 2, display: 2 },
      { value: 3, display: 3 },
      { value: 5, display: 5 },
      { value: 8, display: 8 },
      { value: 13, display: 13 },
      { value: 21, display: 21 },
      { value: 34, display: 34 },
      { value: 55, display: 55 },
      { value: 89, display: 89 },
    ]
  },
  {
    name: 'Modified Fibonacci',
    enumName: 'MODIFIED_FIBONACCI',
    values: [
      { value: 0, display: 0 },
      { value: 0.5, display: 0.5 },
      { value: 1, display: 1 },
      { value: 2, display: 2 },
      { value: 3, display: 3 },
      { value: 5, display: 5 },
      { value: 8, display: 8 },
      { value: 13, display: 13 },
      { value: 21, display: 21 },
      { value: 34, display: 34 },
      { value: 55, display: 55 },
      { value: 89, display: 89 },
    ]
  },
  {
    name: 'Powers',
    enumName: 'POWERS',
    values: [
      { value: 0, display: 0 },
      { value: 1, display: 1 },
      { value: 2, display: 2 },
      { value: 4, display: 4 },
      { value: 8, display: 8 },
      { value: 16, display: 16 },
      { value: 32, display: 32 },
      { value: 64, display: 64 },
    ]
  },
  {
    name: 'Trust Vote',
    enumName: 'TRUST_VOTE',
    values: [
      { value: 0, display: 0 },
      { value: 1, display: 1 },
      { value: 2, display: 2 },
      { value: 3, display: 3 },
      { value: 4, display: 4 },
      { value: 5, display: 5 },
      { value: 6, display: 6 },
      { value: 7, display: 7 },
      { value: 8, display: 8 },
      { value: 9, display: 9 },
      { value: 10, display: 10 },
    ]
  },
  {
    name: 'T-Shirts',
    enumName: 'T_SHIRTS',
    values: [
      { value: 1, display: 'XXS' },
      { value: 2, display: 'XS' },
      { value: 3, display: 'S' },
      { value: 4, display: 'M' },
      { value: 5, display: 'L' },
      { value: 6, display: 'XL' },
      { value: 7, display: 'XXL' },
    ]
  }
]

export const decksDict: { [key: string]: Deck } = decks.reduce((result: { [key: string]: Deck }, deck: Deck) => {
  result[deck.enumName] = deck;
  return result;
}, {});

export function displayDeckValues(deck: Deck): string {
  return deck.values.map(v => v.display).join(',');
}
