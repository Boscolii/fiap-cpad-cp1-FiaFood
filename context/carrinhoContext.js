import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from './AuthContext';

const CarrinhoContext = createContext(null);

const cuponsIniciais = [
  { id: 1, emoji: '*', titulo: 'Primeira Compra', codigo: 'BEMVINDO15', tipo: 'porcentagem', valor: 15, resgatado: false },
  { id: 2, emoji: '*', titulo: 'Pedido pelo App', codigo: 'APP5', tipo: 'porcentagem', valor: 5, resgatado: false },
  { id: 3, emoji: '*', titulo: 'Comeco de Ano', codigo: 'ANOVO10', tipo: 'porcentagem', valor: 10, resgatado: false },
  { id: 4, emoji: '*', titulo: 'Segundo Ano', codigo: 'SEGUNDOANO5', tipo: 'fixo', valor: 5, resgatado: false },
];

export function CarrinhoProvider({ children }) {
  const { usuario } = useAuth();

  const [carrinho, setCarrinho] = useState([]);
  const [cupomAplicado, setCupomAplicado] = useState(null);
  const [localEntrega, setLocalEntrega] = useState('Entrada - 1 Andar');
  const [cupons, setCupons] = useState(cuponsIniciais);
  const [pedidos, setPedidos] = useState([]);
  const [carregandoCarrinho, setCarregandoCarrinho] = useState(true);

 
  const getChaveCarrinho = (userId) => `@fiafood:carrinho_${userId}`;
  const getChaveCupom = (userId) => `@fiafood:cupom_${userId}`;
  const getChaveCupons = (userId) => `@fiafood:cupons_${userId}`;
  const getChavePedidos = (userId) => `@fiafood:pedidos_${userId}`;


  useEffect(() => {
    async function carregarDados() {
      try {
        if (!usuario) {
          setCarrinho([]);
          setCupomAplicado(null);
          setPedidos([]);
          setCupons(cuponsIniciais);
          return;
        }

        const carrinhoSalvo = await AsyncStorage.getItem(getChaveCarrinho(usuario.id));
        const cupomSalvo = await AsyncStorage.getItem(getChaveCupom(usuario.id));
        const cuponsSalvos = await AsyncStorage.getItem(getChaveCupons(usuario.id));
        const pedidosSalvos = await AsyncStorage.getItem(getChavePedidos(usuario.id));

        setCarrinho(carrinhoSalvo ? JSON.parse(carrinhoSalvo) : []);
        setCupomAplicado(cupomSalvo ? JSON.parse(cupomSalvo) : null);
        setCupons(cuponsSalvos ? JSON.parse(cuponsSalvos) : cuponsIniciais);
        setPedidos(pedidosSalvos ? JSON.parse(pedidosSalvos) : []);
      } catch (error) {
        console.log('Erro ao carregar dados do carrinho', error);
      } finally {
        setCarregandoCarrinho(false);
      }
    }

    setCarregandoCarrinho(true);
    carregarDados();
  }, [usuario]);

  
  useEffect(() => {
    if (!carregandoCarrinho && usuario) {
      AsyncStorage.setItem(
        getChaveCarrinho(usuario.id),
        JSON.stringify(carrinho)
      );
    }
  }, [carrinho, carregandoCarrinho, usuario]);


  useEffect(() => {
    if (!carregandoCarrinho && usuario) {
      if (cupomAplicado) {
        AsyncStorage.setItem(
          getChaveCupom(usuario.id),
          JSON.stringify(cupomAplicado)
        );
      } else {
        AsyncStorage.removeItem(getChaveCupom(usuario.id));
      }
    }
  }, [cupomAplicado, carregandoCarrinho, usuario]);


  useEffect(() => {
    if (!carregandoCarrinho && usuario) {
      AsyncStorage.setItem(
        getChaveCupons(usuario.id),
        JSON.stringify(cupons)
      );
    }
  }, [cupons, carregandoCarrinho, usuario]);


  useEffect(() => {
    if (!carregandoCarrinho && usuario) {
      AsyncStorage.setItem(
        getChavePedidos(usuario.id),
        JSON.stringify(pedidos)
      );
    }
  }, [pedidos, carregandoCarrinho, usuario]);

 
  const adicionarItem = (produto) => setCarrinho((prev) => [...prev, produto]);

  const removerItem = (index) =>
    setCarrinho((prev) => prev.filter((_, i) => i !== index));

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

    setCupons((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, resgatado: true } : item
      )
    );

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
    <CarrinhoContext.Provider
      value={{
        carrinho,
        adicionarItem,
        removerItem,
        limparCarrinho,
        cupomAplicado,
        aplicarCupom,
        removerCupom,
        cupons,
        resgatarCupom,
        pedidos,
        finalizarPedido,
        carregandoCarrinho,
        localEntrega,
        setLocalEntrega,
        total,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
}

export function useCarrinho() {
  const ctx = useContext(CarrinhoContext);
  if (!ctx) throw new Error('useCarrinho deve ser usado dentro de CarrinhoProvider');
  return ctx;
}