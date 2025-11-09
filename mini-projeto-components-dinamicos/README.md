<p align="left">
  <img src="./src/assets/WhatsApp Image 2025-03-06 at 13.26.00 1.png" alt="Foto de Eriston Mendes Ferreira" width="120" style="border-radius: 16px;" />
</p>

🧩 Mini Projeto — Componentes Dinâmicos

⚠️ Nota:
Este repositório é privado e tem finalidade exclusivamente educacional.
Serve como um laboratório pessoal de estudos, reunindo exemplos, padrões e estruturas reutilizáveis para referência futura.
O código aqui documentado não representa uma biblioteca pública, mas um conjunto de experimentos e boas práticas de desenvolvimento front-end.

Uma lib de estudos com exemplos práticos de componentes front-end dinâmicos utilizando React, TypeScript e TailwindCSS.

📘 Sobre o Projeto

Este mini projeto foi criado com o objetivo de explorar conceitos de dinamismo e reutilização no front-end, aplicando boas práticas de tipagem e componentização com React + TypeScript.

A ideia é construir elementos dinâmicos, como:

Formulários gerados a partir de objetos tipados (FormProduct)

Navbars e botões criados dinamicamente via props

Hooks personalizados para manipulação e renderização flexível de dados

É um espaço de experimentação e aprendizado contínuo sobre design de componentes reutilizáveis e organização de código front-end.

🧱 Estrutura do Projeto
src/
├── assets/        # Imagens, ícones e outros recursos estáticos
├── components/    # Componentes dinâmicos reutilizáveis
├── hook/          # Hooks personalizados
├── pages/         # Páginas de exemplo utilizando os componentes
├── types/         # Tipagens TypeScript (ex: FormProduct, ButtonProps)
├── App.tsx        # Ponto principal da aplicação
├── main.tsx       # Configuração de inicialização (React + Vite)
└── index.css      # Estilos globais com Tailwind

⚙️ Tecnologias Utilizadas

⚛️ React — biblioteca principal de UI

🟦 TypeScript — tipagem estática e segurança de dados

🎨 TailwindCSS — estilização rápida e moderna

🧭 React Router DOM — navegação entre páginas

🔣 React Icons — ícones vetoriais prontos para uso

⚡ Vite — build tool leve e rápida

🚀 Como Executar

Clone o repositório e instale as dependências:

npm install


Depois, inicie o servidor de desenvolvimento:

npm run dev


O projeto rodará em:

http://localhost:5173/

🧩 Conceitos Aplicados

Record<keyof T, U> → utilizado para criar objetos tipados dinamicamente com base em outras interfaces.

Componentes dinâmicos → permitem alterar labels, inputs e botões conforme o contexto.

Hooks reutilizáveis → abstraem lógicas de renderização e manipulação de dados.

Tipagem genérica → garante consistência e flexibilidade ao trabalhar com diferentes componentes.

🧩 Form Dinâmico — Estrutura em 3 Camadas

O formulário foi desenvolvido com base em uma arquitetura modular, dividida em três camadas principais, para garantir reutilização, clareza e separação de responsabilidades:

Camada	Local	Responsabilidade
🧠 Hook (Lógica)	src/hook/useFormLogic.ts	Contém toda a lógica de geração dinâmica, controle de estado, manipulação de eventos e gerenciamento de dados.
🧩 Componente (UI)	src/components/Form.tsx	Define a estrutura visual e o comportamento dos inputs, labels, selects e botão de envio.
📄 Render (Página)	src/pages/ProductPage.tsx	É responsável por instanciar o formulário, importar a lógica via hook e renderizar o componente completo.
🧠 Hook useFormLogic

Geração Dinâmica de Campos:
Cria os campos automaticamente a partir de um modelo base (formModelo), usando:



  
<pre> 
bash # 

Object.keys(formModelo) as (keyof FormProduct)[] 
</pre>



Isso evita repetição manual e garante coerência entre tipagem e interface.

Mapeamento de Labels:
Utiliza:

<pre>

bash#

const labelMap: Record<keyof FormProduct, string>

</pre>


para associar cada chave (name, price, photo, etc.) a um rótulo legível, facilitando traduções ou ajustes sem alterar o JSX.

Estados Controlados:
Mantém o estado do produto (formProduct) e a lista de produtos cadastrados (data) com useState.

Manipulação Genérica de Inputs:
O handleChange detecta automaticamente o tipo de input (text, number, file, select) e trata o valor adequadamente, inclusive armazenando File quando necessário.

Upload e Reset de Arquivos:
A referência fielfile (via useRef) é usada para limpar o campo de upload após o envio do formulário.

URLs Temporárias:
Cria URLs locais para exibição de imagens enviadas, e as revoga automaticamente no useEffect para evitar vazamento de memória.

🧩 Componente Form

Recebe props tipadas (FormProps) que definem tudo o que o formulário precisa para funcionar (campos, handlers, categorias e estado atual).

Faz o mapeamento dinâmico dos campos:

<pre>
#bash

{fields.map((field) => (
  <label key={field.name}>
    {field.label}
    <input type={field.type} name={field.name} ... />
  </label>
))}

</pre>


Gerencia automaticamente os inputs com base nas props, sem precisar declarar manualmente cada um.

Apresenta o select de categorias com valores vindos do hook.

📄 Página ProductPage

Importa o hook useFormLogic e o componente Form.

Centraliza o uso do formulário na aplicação:

<pre>
#bash

const {fields, Category, handleSubmit, handleChange, formProduct, fielfile} = useFormLogic();

</pre>


Responsável apenas por compor e renderizar, sem conter lógica interna.

🧩 Conceitos Técnicos Aplicados

Separação de responsabilidades (SoC): lógica, UI e render em módulos distintos.

Geração dinâmica tipada: evita duplicação de código e erros de inconsistência.

Uso de Record e keyof: cria mapeamentos seguros e automatizados.

Estados controlados e referências: garantem reatividade e limpeza do ciclo de vida.

Boas práticas com TypeScript: segurança total de tipos em cada camada.

🧠 Objetivo Educacional

Este projeto não é uma biblioteca oficial, mas sim um laboratório de estudos.
A ideia é praticar composição, tipagem e reatividade, e servir como base para futuras libs ou projetos reais.

📂 Próximos Passos

 Adicionar exemplos práticos com consumo de API

 Criar documentação interativa de cada componente

 Implementar testes unitários simples

 Publicar como template base no GitHub

👨‍💻 Autor

Eriston Mendes Ferreira

Explorando a lógica fluida do front-end e a construção de componentes inteligentes.