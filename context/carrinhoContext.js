import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CarrinhoContext = createContext(null);

const CHAVE_CARRINHO = '@fiafood:carrinho';
const CHAVE_CUPOM = '@fiafood:cupom';
const CHAVE_CUPONS = '@fiafood:cupons';
const CHAVE_PEDIDOS = '@fiafood:pedidos';

const cuponsIniciais = [
  { id: 1, emoji: '*', titulo: 'Primeira Compra', codigo: 'BEMVINDO15', tipo: 'porcentagem', valor: 15, resgatado: false },
  { id: 2, emoji: '*', titulo: 'Pedido pelo App', codigo: 'APP5', tipo: 'porcentagem', valor: 5, resgatado: false },
  { id: 3, emoji: '*', titulo: 'Comeco de Ano', codigo: 'ANOVO10', tipo: 'porcentagem', valor: 10, resgatado: false },
  { id: 4, emoji: '*', titulo: 'Segundo Ano', codigo: 'SEGUNDOANO5', tipo: 'fixo', valor: 5, resgatado: false },
];

export function CarrinhoProvider({ children }) {
  const [carrinho, setCarrinho] = useState([]);
  const [cupomAplicado, setCupomAplicado] = useState(null);
  const [localEntrega, setLocalEntrega] = useState('Entrada - 1 Andar');
  const [cupons, setCupons] = useState(cuponsIniciais);
  const [pedidos, setPedidos] = useState([]);
  const [carregandoCarrinho, setCarregandoCarrinho] = useState(true);

  useEffect(() => {
    async function carregarDados() {
      try {
        const carrinhoSalvo = await AsyncStorage.getItem(CHAVE_CARRINHO);
        const cupomSalvo = await AsyncStorage.getItem(CHAVE_CUPOM);
        const cuponsSalvos = await AsyncStorage.getItem(CHAVE_CUPONS);
        const pedidosSalvos = await AsyncStorage.getItem(CHAVE_PEDIDOS);

        if (carrinhoSalvo) setCarrinho(JSON.parse(carrinhoSalvo));
        if (cupomSalvo) setCupomAplicado(JSON.parse(cupomSalvo));
        if (cuponsSalvos) setCupons(JSON.parse(cuponsSalvos));
        if (pedidosSalvos) setPedidos(JSON.parse(pedidosSalvos));
      } catch (error) {
        console.log('Erro ao carregar dados do carrinho', error);
      } finally {
        setCarregandoCarrinho(false);
      }
    }

    carregarDados();
  }, []);

  useEffect(() => {
    if (!carregandoCarrinho) {
      AsyncStorage.setItem(CHAVE_CARRINHO, JSON.stringify(carrinho));
    }
  }, [carrinho, carregandoCarrinho]);

  useEffect(() => {
    if (!carregandoCarrinho) {
      if (cupomAplicado) {
        AsyncStorage.setItem(CHAVE_CUPOM, JSON.stringify(cupomAplicado));
      } else {
        AsyncStorage.removeItem(CHAVE_CUPOM);
      }
    }
  }, [cupomAplicado, carregandoCarrinho]);

  useEffect(() => {
    if (!carregandoCarrinho) {
      AsyncStorage.setItem(CHAVE_CUPONS, JSON.stringify(cupons));
    }
  }, [cupons, carregandoCarrinho]);

  useEffect(() => {
    if (!carregandoCarrinho) {
      AsyncStorage.setItem(CHAVE_PEDIDOS, JSON.stringify(pedidos));
    }
  }, [pedidos, carregandoCarrinho]);

  const adicionarItem = (produto) => setCarrinho((prev) => [...prev, produto]);
  const removerItem = (index) => setCarrinho((prev) => prev.filter((_, i) => i !== index));
  const limparCarrinho = () => {
    setCarrinho([]);
    setCupomAplicado(null);
  };
  const aplicarCupom = (cupom) => setCupomAplicado(cupom);
  const removerCupom = () => setCupomAplicado(null);

  const resgatarCupom = (id) => {
    const cupom = cupons.find((item) => item.id === id);
    if (!cupom || cupom.resgatado) return null;

    aplicarCupom(cupom);
    setCupons((prev) => prev.map((item) => {
      if (item.id === id) {
        return { ...item, resgatado: true };
      }
      return item;
    }));

    return cupom;
  };

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

  const finalizarPedido = () => {
    const novoPedido = {
      id: Date.now(),
      itens: carrinho,
      cupom: cupomAplicado,
      total,
      data: new Date().toLocaleString('pt-BR'),
      localEntrega,
    };

    setPedidos((prev) => [novoPedido, ...prev]);
    limparCarrinho();

    return novoPedido;
  };

  return (
    <CarrinhoContext.Provider value={{
      carrinho, adicionarItem, removerItem, limparCarrinho,
      cupomAplicado, aplicarCupom, removerCupom,
      cupons, resgatarCupom,
      pedidos, finalizarPedido,
      carregandoCarrinho,
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
