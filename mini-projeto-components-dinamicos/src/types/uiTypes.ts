//** Tipos relacionados à interface de Buttons*/

export type ButtonData = {
    type: string;
    content: string | React.ElementType;
};

export type ButtonProps =  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    button?: ButtonData;
    variant?: string | undefined;
};

//** Tipos relacionados à interface de Form */

export type Field = {
    label: string;
    name: string;
    type: 'text' | 'number' | 'file';
    photo?: string;
};

export type FormProduct = {
    name: string;
    price: string;
    photo: File | null | string;
    category: string;
};