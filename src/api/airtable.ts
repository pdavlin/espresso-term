import { isMockCoffee } from './mock.ts';

export interface CoffeeBag {
  id: string;
  name: string;
  roaster: string;
  country: string;
  processing: string;
  roastLevel: string;
  archived: boolean;
}

interface AirtableConfig {
  pat: string;
  baseId: string;
}

function getAirtableConfig(): AirtableConfig {
  return {
    pat: localStorage.getItem('airtable-pat') ?? import.meta.env.VITE_AIRTABLE_PAT ?? '',
    baseId: localStorage.getItem('airtable-base-id') ?? import.meta.env.VITE_AIRTABLE_BASE_ID ?? '',
  };
}

interface AirtableRecord {
  id: string;
  fields: Record<string, unknown>;
}

interface AirtableResponse {
  records: AirtableRecord[];
  offset?: string;
}

async function airtableFetch(tableId: string, params: URLSearchParams): Promise<AirtableRecord[]> {
  const { pat, baseId } = getAirtableConfig();
  if (!pat || !baseId) throw new Error('Airtable not configured');

  const all: AirtableRecord[] = [];
  const pageParams = new URLSearchParams(params);

  for (;;) {
    const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableId)}?${pageParams}`;
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${pat}` },
    });

    if (!response.ok) {
      throw new Error(`Airtable ${response.status}: ${response.statusText}`);
    }

    const data: AirtableResponse = await response.json();
    all.push(...data.records);

    if (!data.offset) break;
    pageParams.set('offset', data.offset);
  }

  return all;
}

async function fetchRoasters(): Promise<Map<string, string>> {
  const params = new URLSearchParams();
  params.set('fields[]', 'Name');

  const records = await airtableFetch('Roasters', params);
  const map = new Map<string, string>();
  for (const rec of records) {
    map.set(rec.id, (rec.fields['Name'] as string) ?? '');
  }
  return map;
}

async function fetchCoffeeBagsRaw(): Promise<AirtableRecord[]> {
  const params = new URLSearchParams();
  params.append('fields[]', 'Name');
  params.append('fields[]', 'Roaster');
  params.append('fields[]', 'Country');
  params.append('fields[]', 'Processing');
  params.append('fields[]', 'Roast level');
  params.append('fields[]', 'Archived at');

  return airtableFetch('Coffee Bags', params);
}

async function fetchCoffeeBagRecency(): Promise<string[]> {
  const params = new URLSearchParams();
  params.append('fields[]', 'Coffee Bag');
  params.set('sort[0][field]', 'Start time');
  params.set('sort[0][direction]', 'desc');
  params.set('pageSize', '100');

  const records = await airtableFetch('Shots', params);
  const seen = new Set<string>();
  const order: string[] = [];
  for (const rec of records) {
    const bagIds = (rec.fields['Coffee Bag'] as string[] | undefined) ?? [];
    for (const id of bagIds) {
      if (!seen.has(id)) {
        seen.add(id);
        order.push(id);
      }
    }
  }
  return order;
}

let cachedBags: CoffeeBag[] | null = null;

export async function getCoffeeBags(): Promise<CoffeeBag[]> {
  if (cachedBags) return cachedBags;

  if (isMockCoffee()) {
    const { mockCoffeeBags } = await import('./mock.ts');
    cachedBags = mockCoffeeBags;
    return cachedBags;
  }

  const [bagRecords, roasterMap, recencyOrder] = await Promise.all([
    fetchCoffeeBagsRaw(),
    fetchRoasters(),
    fetchCoffeeBagRecency().catch(() => [] as string[]),
  ]);

  const bags = bagRecords.map((rec) => {
    const roasterIds = (rec.fields['Roaster'] as string[] | undefined) ?? [];
    const roasterName = roasterIds.length > 0 ? (roasterMap.get(roasterIds[0]) ?? '') : '';

    return {
      id: rec.id,
      name: (rec.fields['Name'] as string) ?? '',
      roaster: roasterName,
      country: (rec.fields['Country'] as string) ?? '',
      processing: (rec.fields['Processing'] as string) ?? '',
      roastLevel: (rec.fields['Roast level'] as string) ?? '',
      archived: Boolean(rec.fields['Archived at']),
    };
  });

  if (recencyOrder.length > 0) {
    const rank = new Map(recencyOrder.map((id, i) => [id, i]));
    bags.sort((a, b) => (rank.get(a.id) ?? Infinity) - (rank.get(b.id) ?? Infinity));
  }

  cachedBags = bags;
  return cachedBags;
}

export function clearCoffeeBagCache(): void {
  cachedBags = null;
}
