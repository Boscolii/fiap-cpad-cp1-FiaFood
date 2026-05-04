# FIAFOOD - Cantina FIAP

Aplicativo em React Native com Expo para facilitar pedidos na cantina da FIAP. A ideia e reduzir filas nos intervalos, permitindo que o aluno veja o menu, monte o carrinho, aplique cupons e envie o pedido pelo app.

## Sobre o Projeto

A operacao escolhida foi a cantina da FIAP, porque e um local de alto fluxo de alunos e com problema real de espera em horarios de pico.

Esta versao e a evolucao do CP1 para o CP2. Alem das telas de Home, Menu, Cupons e Carrinho, agora o app possui autenticacao com cadastro/login, sessao persistida, dados funcionais salvos localmente e busca em tempo real no menu.

## Funcionalidades

- Cadastro de usuario com nome, e-mail, senha e confirmacao de senha
- Login validando e-mail e senha salvos no AsyncStorage
- Sessao persistida para manter o usuario logado ao reabrir o app
- Logout com limpeza da sessao
- Protecao das telas principais para usuario nao logado
- Menu dividido por categorias
- Busca e filtragem em tempo real no menu
- Adicao e remocao de produtos no carrinho
- Persistencia do carrinho no AsyncStorage
- Cupons de desconto com persistencia de cupons usados
- Persistencia do cupom aplicado
- Finalizacao do pedido com mensagem de sucesso na tela
- Historico simples de pedidos salvos localmente
- Feedback visual de loading, erro, sucesso e lista vazia

## Integrantes do Grupo

- Erick Gimenez - RM564748
- Henrique Boscoli - RM563651
- Joao Henrique - RM563578
- Sergio Mirabelo - RM562161
- Tomazzo Canterucci - RM565566

## Como Rodar o Projeto

### Pre-requisitos

- Node.js instalado
- Expo Go no celular ou emulador Android/iOS
- Expo SDK usado no projeto: 55

### Passo a passo

```bash
git clone https://github.com/usuario/fiap-cpad-cp2-fiafood
cd fiap-cpad-cp2-fiafood
npm install
npx expo start
```

Depois, abra o QR Code pelo Expo Go ou execute no emulador.

## Demonstracao Visual


### Login
<img width="317" height="681" alt="image" src="https://github.com/user-attachments/assets/cecb4c9c-aaec-4526-9c37-0608394800ff" />

### Cadastro
<img width="310" height="678" alt="image" src="https://github.com/user-attachments/assets/58fd173f-525a-4c47-bb70-f41acd96af46" />

### Home
<img width="309" height="683" alt="image" src="https://github.com/user-attachments/assets/fdea9090-07ea-403e-b75a-f81c417890a1" />

### Menu com busca
<img width="308" height="683" alt="image" src="https://github.com/user-attachments/assets/330f66be-f7e8-428b-9713-bd3baec3d2d4" />
<img width="322" height="675" alt="image" src="https://github.com/user-attachments/assets/5afcd75e-7edd-4eb9-969f-da260d03ee3f" />

### Carrinho vazio
<img width="313" height="679" alt="image" src="https://github.com/user-attachments/assets/d4522870-c24a-439d-bf4d-9c89a2c11318" />


### Carrinho com itens
<img width="317" height="683" alt="image" src="https://github.com/user-attachments/assets/9895e18a-5890-4394-a84b-8b775c1e606e" />

### Cupons
<img width="310" height="687" alt="image" src="https://github.com/user-attachments/assets/8dd9ea96-1f71-470a-a7c3-779355e3eb86" />

### Fluxo do app

```text
cadastro -> login -> busca no menu -> adicionar item -> aplicar cupom -> finalizar pedido -> logout
```

Link do video/GIF: adicionar aqui.

## Estrutura do Projeto

```text
app/
  _layout.js       Rotas, tabs e protecao de acesso
  login.js         Tela de login
  cadastro.js      Tela de cadastro
  index.js         Home
  menu.js          Cardapio e busca em tempo real
  carrinho.js      Carrinho e finalizacao do pedido
  cupons.js        Cupons disponiveis e resgatados

context/
  AuthContext.js       Autenticacao, usuarios e sessao
  carrinhoContext.js   Carrinho, cupons e pedidos

assets/
  Imagens do app e do menu
```

## Context API

### AuthContext

Gerencia:

- usuario logado
- loading inicial da sessao
- cadastro
- login
- logout

O contexto e consumido nas telas de login, cadastro, home e no layout principal.

### CarrinhoContext

Gerencia:

- itens do carrinho
- cupom aplicado
- cupons resgatados
- pedidos finalizados
- total do pedido
- local de entrega

O contexto e consumido nas telas Home, Menu, Carrinho e Cupons.

## AsyncStorage

O projeto usa AsyncStorage para persistir dados locais. Chaves usadas:

- `@fiafood:usuarios` - lista de usuarios cadastrados
- `@fiafood:sessao` - usuario logado atualmente
- `@fiafood:carrinho` - itens adicionados ao carrinho
- `@fiafood:cupom` - cupom aplicado no pedido
- `@fiafood:cupons` - estado dos cupons resgatados
- `@fiafood:pedidos` - pedidos finalizados

A leitura dos dados acontece ao montar os contexts com `useEffect`. As atualizacoes sao salvas sempre que o carrinho, cupons, cupom aplicado ou pedidos mudam.

## Autenticacao

O cadastro salva os dados do usuario no AsyncStorage. O login busca os usuarios salvos e valida e-mail e senha. Ao entrar, a sessao e salva em `@fiafood:sessao`.

Quando o app abre novamente, o `AuthContext` tenta carregar a sessao salva. Se existir usuario logado, o app entra direto nas telas principais. Se nao existir, o usuario e redirecionado para login.

## Navegacao Protegida

A protecao fica em `app/_layout.js`. O layout verifica o usuario do `AuthContext`:

- sem usuario logado: redireciona para `/login`
- usuario logado tentando acessar login/cadastro: redireciona para `/`
- login e cadastro ficam escondidos da Tab Bar

## Formularios e Validacao

Login e cadastro possuem validacao inline:

- campo vazio
- e-mail invalido
- senha com menos de 6 caracteres
- confirmacao de senha diferente

Os erros aparecem abaixo do campo correspondente, em vermelho. Os botoes ficam desabilitados enquanto o formulario esta invalido.

## Diferencial Implementado

O diferencial escolhido foi **busca e filtragem em tempo real**.

Escolhemos esse diferencial porque combina diretamente com o uso do FIAFOOD: o usuario pode procurar rapidamente por produtos como coxinha, refrigerante, bolo ou por categorias como salgados, bebidas e doces. Isso melhora a experiencia, deixa o pedido mais rapido e e facil de demonstrar durante a apresentacao.

Tecnicamente, foi implementado em `app/menu.js` usando `useState`, `TextInput` e filtro dinamico nos produtos. Quando nao existe resultado, o app mostra uma mensagem de lista vazia.

## Proximos Passos

- Tela de pagamento
- Tempo estimado de preparo
- Edicao de quantidade no carrinho
- Historico completo de pedidos em uma tela propria
