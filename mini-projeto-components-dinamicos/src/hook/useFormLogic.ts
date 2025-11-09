/** 
 * 📦 Importação dos hooks nativos do React e dos tipos utilizados neste módulo.
 */
import { useState, useRef, useEffect } from "react"; 
import type {Field} from '../types/uiTypes';
import type {FormProduct} from '../types/uiTypes';


/** 
 * 🧩 `formModelo` define o estado base do formulário de produtos, 
 * servindo como modelo para a geração dinâmica dos campos de entrada.
 */
const formModelo: FormProduct ={
    name:'',
    price:'',
    photo: null,
    category:'',
};
/** 
 * 🗺️ `labelMap` é responsável por mapear as chaves do objeto `FormProduct` 
 * para seus respectivos rótulos de exibição na interface do usuário.
 */
const labelMap: Record<keyof FormProduct, string> = {
        name: 'Nome do produto:',
        price: 'Preço:',
        photo: 'Foto:',
        category: 'Categorias:',
} as const;

/**
 * 💡 Hook personalizado responsável pela lógica central de formulários dinâmicos.
 * 
 * Este hook gera dinamicamente os campos do formulário com base no modelo de dados,
 * gerencia estados de entrada, atualiza a lista de produtos e mantém a integridade
 * dos dados e URLs de imagens.
 */

function useFormLogic() {
  /** 
   * 🧠 Geração dinâmica dos campos de formulário.
   * 
   * A partir do modelo `formModelo`, o hook cria uma lista tipada de campos (`Field[]`),
   * atribuindo dinamicamente o tipo de entrada (`text`, `number`, `file`) e os respectivos rótulos.
   */
  const fields: Field[] = (Object.keys(formModelo) as (keyof FormProduct)[])
  .filter((key): key is Exclude<keyof FormProduct, 'category'> => key !== 'category')
  .map(key => {
    let type: 'text' | 'number' | 'file';
    if(key === 'photo') type = 'file';
    else if ( key === 'price') type = 'number';
    else type = 'text';
    
    return { name: key, type, label: labelMap[key]}

  });
  
  /** 
   * 🧾 Lista estática de categorias, utilizada para campos do tipo `select`.
   * O tipo é explicitamente declarado como `string[]`.
   */
  const Category: string[] = ['Utencilio', 'Cama mesa e Banho', 'Eletro Domestico'];


  /** 
   * 🧱 Estado base do formulário, inicializado com os valores padrão do modelo.
   */
  const[formProduct, setFormProduct] = useState<FormProduct>({
    name:'',
    price:'',
    photo: null,
    category:'',
  });

/** 
   * 🗂️ Estado responsável por armazenar a lista de produtos submetidos.
   */
  const[data, setData] = useState<FormProduct[]>([]);

/** 
   * ✏️ Manipulador genérico de mudanças em campos de entrada (`input` e `select`).
   * Trata arquivos (`file`) de forma especial, armazenando o objeto `File` no estado.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> ) => {
     const { name, type, value} = e.target;
     let newValue: string | File | null = value; 
     
     if (type === 'file') {
      const input = e.target as HTMLInputElement;
      newValue = input.files?.[0] ?? null;
     }  

     setFormProduct({
      ...formProduct,
      [name]: newValue
    });
  };

 /** 
   * 🎯 Referência ao campo de upload de imagem (`file`), 
   * utilizada para redefinir o valor após o envio do formulário.
   */
  const fielfile = useRef<HTMLInputElement>(null);


/** 
   * 🚀 Manipulador de envio do formulário.
   * 
   * Cria uma URL temporária para exibição da imagem,
   * adiciona o produto à lista de dados e limpa os campos após o envio.
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
     e.preventDefault();

     let urlImg: string | null;
     
     urlImg = formProduct.photo instanceof File ? URL.createObjectURL(formProduct.photo) : formProduct.photo;
     setData([...data, {...formProduct, photo: urlImg}]);

     setFormProduct ({
        name:'',
        price:'',
        photo: null,
        category:'',
     });

     if(fielfile.current) {
        fielfile.current.value = '';
     };

  };

/** 
   * 🔁 Efeito responsável por:
   *  - Exibir os dados atualizados no console em tempo real;
   *  - Revogar URLs temporárias de imagens ao atualizar ou desmontar o componente.
   */
  useEffect(() => {
    if(data){
        if(data.length > 0){
            const api = data.length-1
            console.log(data, api);
        }
        return () => {
            data.forEach(item => typeof item.photo === 'string' ? URL.revokeObjectURL(item.photo) : '');
        }
     }
   },[data]);

/** 
   * 📤 Exporta os principais métodos, referências e estados
   * utilizados para o gerenciamento dinâmico do formulário.
   */
  return { fields, Category, fielfile, handleSubmit, handleChange, formProduct }

}

export default useFormLogic


