# 📱 FIAFOOD - Cantina FIAP (Checkpoint 2)

## 📌 Sobre o Projeto
O **FIAFOOD** é um aplicativo desenvolvido para facilitar pedidos na cantina da FIAP, permitindo que alunos façam seus pedidos de forma rápida e prática, evitando filas e otimizando o tempo.

No **Checkpoint 2**, o projeto evoluiu para uma aplicação mais completa, incorporando autenticação de usuários, persistência de dados e melhorias gerais de usabilidade.

---

## 🚨 Problema que resolve
Filas na cantina e demora no atendimento, principalmente em horários de intervalo.

---

## 🏫 Operação da FIAP escolhida
A operação escolhida foi a **cantina da FIAP**, pois é um ponto de grande fluxo de alunos e apresenta problemas reais de tempo de espera.

---

## 🚀 Funcionalidades

### 🧾 Funcionalidades do CP1 (mantidas)
- Visualização do menu (Salgados, Bebidas e Doces)
- Adição de produtos ao carrinho
- Tela de carrinho com listagem de itens
- Remoção de itens do carrinho
- Sistema de cupons de desconto
- Aplicação automática de desconto
- Finalização de pedido

---

### 🔐 Novas funcionalidades do CP2
- Cadastro de usuário com:
  - Nome completo  
  - E-mail válido  
  - Senha (mín. 6 caracteres)  
  - Confirmação de senha  

- Login de usuário  
- Validação de credenciais  
- Persistência de dados com **AsyncStorage**  
- Gerenciamento de estado global com **Context API (AuthContext)**  
- Redirecionamento após login  
- Validação de formulários  
- Melhorias visuais (UI/UX)

---

## 💾 Persistência de Dados
Os dados do usuário são armazenados localmente utilizando **AsyncStorage**, permitindo:
- Login persistente
- Validação de credenciais
- Melhor experiência do usuário

---

## 🌐 Estado Global
- `AuthContext` → controle de autenticação (usuário logado)
- `CarrinhoContext` → controle de produtos, cupons e total

---

## 🔁 Fluxo do Aplicativo
1. Usuário abre o app  
2. Caso não esteja logado:
   - Acessa Login ou Cadastro  
3. Após login:
   - Redirecionado para a aplicação principal  
4. Pode realizar pedidos normalmente  
5. Dados permanecem salvos no dispositivo  

---

## 📂 Estrutura do Projeto

/components /screens /context AuthContext.js carrinhoContext.js /app index.js menu.js carrinho.js cupons.js login.js register.js _layout.js App.js

---

## 🛠️ Tecnologias Utilizadas
- React Native
- Expo
- JavaScript
- AsyncStorage
- Context API
- React Navigation

---

## 🧠 Decisões Técnicas

### Context API
Utilizada para centralizar estados globais:
- Carrinho de compras
- Cupons
- Usuário autenticado

---

### Hooks Utilizados
- `useState` → controle de estados locais  
- `useEffect` → efeitos colaterais (carregamento, validações)  
- `useContext` → acesso aos contextos globais  

---

### Custom Hook
- `useCarrinho` → abstrai o uso do CarrinhoContext  

---

## ⭐ Diferencial Implementado
- Persistência de login (usuário permanece logado ao reabrir o app)
- Exibição do nome do usuário na aplicação
- Botão de logout

---

## 👨‍💻 Integrantes do Grupo
- Erick Gimenez – RM564748  
- Henrique Boscoli – RM563651  
- João Henrique – RM563578  
- Sergio Mirabelo – RM562161  
- Tomazzo Canterucci – RM565566  

---

## ▶️ Como Rodar o Projeto

### Pré-requisitos
- Node.js  
- Expo CLI  
- Expo Go (celular) ou emulador  

### Passos
```bash
git clone https://github.com/Boscolii/fiap-cpad-cp1-FiaFood.git
cd fiap-cpad-cp1-FiaFood
npm install
npx expo start