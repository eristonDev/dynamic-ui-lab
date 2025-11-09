/**
 * 📦 Importação de hooks nativos do React e tipos utilizados no módulo.
 */
import { useEffect, useState } from "react";
import type {Resmethod} from '../types/dataTypes';
import type {RequestConfig} from '../types/dataTypes';
import type {Resdata} from '../types/dataTypes';

/**
 * 🔁 Hook genérico de CRUD (Create, Read, Update, Delete).
 * 
 * Este hook encapsula a lógica de requisições HTTP assíncronas, 
 * oferecendo uma interface simplificada para operações CRUD com APIs REST.
 * 
 * @param url - URL base do endpoint da API.
 * @returns Objeto contendo `data`, `httpMethod` e a função `httpConfig`.
 */

const useCrud = (url: string) => {

    /** 
   * 🧱 Estado principal que armazena os dados obtidos da API.
   */
    const [data, setData] = useState<Resdata | null>(null);
    /** 
   * ⚙️ Armazena o método HTTP atual em execução (GET, POST, PUT, DELETE).
   */
    const [httpMethod, setHttpMethod] = useState<Resmethod | null>(null);

    /** 
   * 🧾 Objeto de configuração de requisição HTTP (`fetch`).
   * Contém cabeçalhos, corpo (body) e método.
   */
    const [requestConfig, setRequestConfig] = useState<RequestConfig | null>(null);
    /** 
   * 🔄 Flag utilizada para disparar recarregamentos automáticos de dados.
   * Alterar seu valor força o re-fetch via `useEffect`.
   */
    const [refreshFlag, setRefreshFlag] = useState(false);
    /** 
   * 🎯 Identificador do item em manipulação (para DELETE ou PUT).
   */
    const [currentItemId, setCurrentItemId] = useState<string | number | null>(null);

    /**
   * ⚡ Configura a requisição HTTP com base no método e nos dados fornecidos.
   * 
   * - `POST`: Cria um novo recurso.
   * - `DELETE`: Remove o recurso pelo `id`.
   * - `PUT`: Atualiza um recurso existente.
   * 
   * Essa função apenas **prepara** a configuração, 
   * a execução é feita automaticamente via `useEffect`.
   */
    const httpConfig = (data: Resdata, method: Resmethod) => {
        if (method === 'POST') {
            setRequestConfig({
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            setHttpMethod(method);
        } else if (method === 'DELETE') {
            setRequestConfig({
                method,
                headers: { 'Content-Type': 'application/json' },
            });
            setHttpMethod(method);
            setCurrentItemId(data.id);
        } else if (method === 'PUT') {
            setRequestConfig({
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            setHttpMethod(method);
            setCurrentItemId(data.id);
        } 
    };

    /**
   * 📥 Efeito responsável por buscar os dados iniciais da API (operação READ).
   * Executa toda vez que a `url` ou `refreshFlag` é alterada.
   */
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(url);
                const json = await res.json();
                setData(json);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [url, refreshFlag]);

    /**
   * 🚀 Efeito responsável por executar operações de escrita na API (POST, PUT, DELETE).
   * É disparado automaticamente quando `requestConfig` ou `currentItemId` são alterados.
   */
    useEffect(() => {
        const executeRequest = async () => {
            if (httpMethod === 'POST') {
                const res = await fetch(url, requestConfig as RequestConfig);
                const json = await res.json();
                setRefreshFlag(json);
            } else if (httpMethod === 'DELETE' && currentItemId !== null) {
                const res = await fetch(`${url}/${currentItemId}`, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                });
                const json = await res.json();
                setRefreshFlag(json);
            } else if (httpMethod === 'PUT' && currentItemId !== null) {
                const res = await fetch(`${url}/${currentItemId}`, requestConfig as RequestConfig);
                const json = await res.json();
                setRefreshFlag(json);
            }
        }
        executeRequest();
    }, [url, requestConfig, currentItemId]);

    /**
   * 📤 Retorna os dados e métodos de controle do hook.
   * 
   * - `data`: dados atuais retornados pela API;
   * - `httpMethod`: método HTTP em execução;
   * - `httpConfig`: função que configura e dispara operações CRUD.
   */
    return { data, httpMethod, httpConfig };
}

export default useCrud;
