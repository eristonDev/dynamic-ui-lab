//** Estruturas de dados do app */

export type Resmethod = 'GET' | 'POST' | 'DELETE' | 'PUT';

export type RequestConfig = {
    method: Resmethod,
    headers: Record<string, string>,
    body?: string,
};

export type Resdata = {
    id: string | number;
    name: string,
    price: number,
    photo: string | null,
};