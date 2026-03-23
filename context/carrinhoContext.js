import React, { createContext, useContext, useState } from 'react';

const CarrinhoContext = createContext(null);

export function CarrinhoProvider({ children }) {
  const [carrinho, setCarrinho] = useState([]);
  const [cupomAplicado, setCupomAplicado] = useState(null);
  const [localEntrega, setLocalEntrega] = useState('Entrada - 1º Andar');

  const adicionarItem = (produto) => setCarrinho((prev) => [...prev, produto]);
  const removerItem = (index) => setCarrinho((prev) => prev.filter((_, i) => i !== index));
  const limparCarrinho = () => setCarrinho([]);
  const aplicarCupom = (cupom) => setCupomAplicado(cupom);
  const removerCupom = () => setCupomAplicado(null);

  const total = (() => {
    let valor = carrinho.reduce((acc, item) => acc + item.preco, 0);
    if (cupomAplicado) {
      if (cupomAplicado.tipo === 'porcentagem') {
        valor -= valor * (cupomAplicado.valor / 100);
      } else {
        valor -= cupomAplicado.valor;
      }
    }
    return Math.max(valor, 0);
  })();

  return (
    <CarrinhoContext.Provider value={{
      carrinho, adicionarItem, removerItem, limparCarrinho,
      cupomAplicado, aplicarCupom, removerCupom,
      localEntrega, setLocalEntrega,
      total,
    }}>
      {children}
    </CarrinhoContext.Provider>
  );
}

export function useCarrinho() {
  const ctx = useContext(CarrinhoContext);
  if (!ctx) throw new Error('useCarrinho deve ser usado dentro de CarrinhoProvider');
  return ctx;
}
