# FIAFOOD - Cantina FIAP

## Sobre o Projeto

O FIAFOOD é um aplicativo desenvolvido para facilitar pedidos na cantina da FIAP, permitindo que alunos façam seus pedidos de forma rápida e prática, evitando filas e otimizando o tempo.

### Problema que resolve
Filas na cantina e demora no atendimento, principalmente em horários de intervalo.

###  Operação da FIAP escolhida
A operação escolhida foi a *cantina da FIAP*, pois é um ponto de grande fluxo de alunos e apresenta problemas reais de tempo de espera.

###  Funcionalidades implementadas

-  Visualização do menu completo (Salgados, Bebidas e Doces)
-  Adição de produtos ao carrinho
-  Tela de carrinho com listagem de itens
-  Remoção de itens do carrinho
-  Sistema de cupons de desconto
-  Aplicação automática de desconto no total
-  Finalização de pedido

---

##  Integrantes do Grupo

- Erick Gimenez – RM564748
- Henrique Boscoli – RM563651
- Joao Henrique – RM563578
- Sergio Mirabelo – RM562161
- Tomazzo Canterucci – RM565566

---

##  Como Rodar o Projeto

###  Pré-requisitos

- Node.js
- Expo CLI
- Aplicativo *Expo Go* no celular (ou Android Studio no computador)

---

###  Passo a passo

1. Clone o repositório:
git clone https://github.com/Boscolii/fiap-cpad-cp1-FiaFood.git

2. Acesse a pasta do projeto

3. Installe as dependencias:
npm install react@19.2.4 react-dom@19.2.4

4. Inicie o projeto:
npx expo start

5. Abra no celular e escaneie o QR code com o Expo Go ou rode no emulador apertando 'A' no terminal

---

## Demonstraçoes de uso

### Tela inicial 
<img width="370" height="818" alt="image" src="https://github.com/user-attachments/assets/aba2397f-5129-48ea-84c4-fd17553665b2" />

### Aba Menu
<img width="376" height="799" alt="image" src="https://github.com/user-attachments/assets/f248afad-d21d-4b74-9602-2916ea2fd631" />

### Aba cupons
<img width="376" height="821" alt="image" src="https://github.com/user-attachments/assets/c1c4e467-9cec-44bc-b1b6-946460d68f71" />
<img width="385" height="766" alt="image" src="https://github.com/user-attachments/assets/09c52ebf-5fcd-465e-87b8-1deddb4752f2" />

### Carrinho
<img width="377" height="776" alt="image" src="https://github.com/user-attachments/assets/df5a5123-6f81-4024-b647-0cfa16f022e3" />
<img width="374" height="808" alt="image" src="https://github.com/user-attachments/assets/9b05d582-84e1-40e0-b421-311d691f73e3" />
<img width="384" height="771" alt="image" src="https://github.com/user-attachments/assets/99317f5a-e7a5-4ddb-bfc3-daf70d13d122" />

## Decisões Técnicas

### Estrutura do projeto

- app/index.js → Tela inicial (Home)
- app/menu.js → Exibição de todos os produtos
- app/carrinho.js → Carrinho de compras
- app/cupons.js → Tela de cupons
- app/_layout.js → Configuração das abas (Tabs)
- context/carrinhoContext.js → Gerenciamento global do estado do carrinho

A utilização de Context API permitiu centralizar os dados do carrinho, cupons e total da compra, facilitando o compartilhamento entre as telas.


### Hooks Utilizados

Foram utilizados diversos hooks para controle de estado e comportamento da aplicação:

- useState -- Gerenciar estados locais, como:
  -  Lista de cupons
  -  Mensagens de feedback
  -  stado de carregamento (loading)

  
- useEffect -- Utilizado para:
  - Simular carregamento inicial da aplicação
  - Remover mensagens automaticamente após alguns segundos

- useContext (via useCarrinho) -- Responsável por acessar o contexto global do carrinho permite:
  - Adicionar/remover itens
  - Aplicar cupons
  - Calcular o total da compra

- Custom Hook: useCarrinho
  - Criado para facilitar o uso do CarrinhoContext
  - Evita repetição de código e melhora a organização


## Próximos Passos

Se tivessemos mais tempo, fariamos tela de checkout para pagamento ao finalizar a compra, e informaria tempo estimado de espera para o usuário
