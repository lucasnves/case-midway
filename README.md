# Projeto de Pagamento PIX

Este projeto simula um trajeto de pagamento via PIX utilizando cartão de crédito, desenvolvido com **React Native**. O objetivo do projeto é criar uma interface de usuário conforme o protótipo de UX fornecido, permitindo ao usuário selecionar a quantidade de parcelas e calcular o valor final do pagamento via PIX.

## Funcionalidades

O sistema permite a realização das seguintes operações:

- **Listagem de opções de parcelamento** com respectivos valores e taxas.
- **Cálculo do valor final** de acordo com o número de parcelas selecionadas.
- **Validações básicas**, como valores inválidos ou ausência de seleção.
- **Responsividade e usabilidade** em dispositivos móveis.
- **Interação realista** com o mock da API para simular o processo de pagamento via PIX.

## Tecnologias Utilizadas

- **React Native**: Framework utilizado para o desenvolvimento do aplicativo mobile.
- **JSON Mock**: Simulação da API com dados mockados.
- **JavaScript/TypeScript**: Linguagens utilizadas para programação.
- **React Navigation**: Para navegação entre as telas do aplicativo.
- **Styled Components**: Para estilização das telas.

## Estrutura do Projeto
   ### Abaixo, estão as páginas e componentes e suas responsabilidades no projeto:
   
   #### Estrutura das Páginas
   
   - pix.tsx: Página inicial onde o usuário escolhe a forma de pagamento (PIX) e o número de parcelas.
   - pixConfirmation.tsx: Página que exibe a confirmação do pagamento ou erro na transação.

   #### Estrutura de Componentes
   
   - ButtonSelect.tsx: Componente para seleção de opções de pagamento e parcelamento.
   - CardInstallments.tsx: Exibe as opções de parcelamento com valores.
   - FooterPayment.tsx: Exibe o rodapé com informações relacionadas ao pagamento.
   - CardService.tsx: Exibe alguns serviçoes do App como o Pix.
   - CardPaymentMethod.tsx: Componente que exibe o modo de pagamento escolhido.
   - HeaderAmount.tsx: Exibe o valor total e outras opções do index.
   - Icon.tsx: Componente que renderiza ícones dinâmicos.


```bash
├── src/
│   ├── app/
│   │   ├── (tabs)/
│   │   │   ├── _layout.tsx
│   │   │   └── index.tsx
│   │   ├── pages/
│   │   │   ├── pix.tsx
│   │   │   └── pixConfirmation.tsx
│   ├── assets/
│   │   └── images/
│   │       └── payment-methods/
│   ├── components/
│   │   ├── ButtonSelect.tsx
│   │   ├── CardInstallments.tsx
│   │   ├── CardPaymentMethod.tsx
│   │   ├── CardService.tsx
│   │   ├── FooterPayment.tsx
│   │   ├── Icon.tsx
│   │   ├── ParallaxScrollView.tsx
│   │   └── HeaderAmount.tsx
│   ├── interfaces/
│   │   ├── icons.tsx
│   │   └── interfaces.tsx
│   ├── lists/
│   │   ├── json.ts
│   │   └── services.ts
│   ├── services/
│   │   └── api.ts
│   └── styles/
│       ├── Colors.ts
│       └── Styles.ts
└── README.md
```

## Como Executar o Projeto

### Pré-requisitos

Antes de rodar o projeto, é necessário ter o **Node.js** instalado em sua máquina. Você também precisará do **npm** ou **yarn** para gerenciar as dependências.

### Passos para Instalação

1.	Clone o repositório:
   ```bash
   git clone https://github.com/lucasnves/case-midway.git
   cd case-midway
   ```
2.	Instale as dependências:
   - Usando npm:
   ```bash
   npm install
   ```
   - Usando yarn:
   ```bash
   yarn install
   ```
3. Rode o projeto:
```bash
npx expo start
```
- Isso abrirá a interface do Expo, onde você pode escolher um emulador de iOS/Android para rodar.
