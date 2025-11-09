import React from "react";
import type{ Field, FormProduct } from '../types/uiTypes';

interface FormProps {
  fields: Field[];
  Category: string[];
  formProduct: FormProduct;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void;
  fielfile: React.RefObject<HTMLInputElement | null>;
}

function Form({fields, handleChange, handleSubmit, Category,formProduct,fielfile}: FormProps) {
  
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-2xs bg-neutral-50 
        rounded-2xl p-4 shadow-md"
      >
      {fields.map((field)=> (
        <label key={field.name} className="flex flex-col gap-2">
          {field.label}
          <input 
            type={field.type} 
            name={field.name}
            onChange={handleChange}
            {...(field.type !== 'file' && {value: formProduct[field.name as keyof FormProduct] as string})}
            {...(field.type === 'file' && {ref: fielfile})}
            className="border border-blue-300 px-2 py-0.5"
          />
        </label>
      ))}
      <select
        name="category"
        onChange={handleChange}
        value={formProduct.category}
        className="border border-blue-300"   
      >
        <option value="" disabled >
          Selecione uma Categoria
        </option>
        {Category.map((opt, i)=> (
          <option key={i}>{opt}</option>
        ))}
      </select>
      <button 
        type="submit"
        className="bg-black w-40 h-8 rounded-lg cursor-pointer text-neutral-50
        hover:bg-gray-600"
      >
        Cadastro
      </button>
    </form>
  );
}

export default Form;
