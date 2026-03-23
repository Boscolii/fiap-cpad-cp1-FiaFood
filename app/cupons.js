import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';

const cuponsIniciais = [
  { id: 1, emoji: '🎉', titulo: 'Primeira Compra',     codigo: 'BEMVINDO15', desconto: '15% off', resgatado: false },
  { id: 2, emoji: '📱', titulo: 'Pedido pelo App',      codigo: 'APP5',       desconto: '5% off',  resgatado: false },
  { id: 3, emoji: '👥', titulo: 'Pedido em Grupo',      codigo: 'GRUPO10',    desconto: '10% off', resgatado: false },
  { id: 4, emoji: '🍗', titulo: 'Combo Coxinha + Coca', codigo: 'COMBO5',     desconto: '5% off',  resgatado: false },
];

export default function Cupons() {
  const [cupons, setCupons] = useState(cuponsIniciais);
  const [mensagem, setMensagem] = useState(null);

  useEffect(() => {
    if (mensagem) {
      setTimeout(() => setMensagem(null), 3000);
    }
  }, [mensagem]);

  function resgatarCupom(id) {
    const cupom = cupons.filter((c) => c.id === id)[0];
    if (cupom.resgatado) return;

    setCupons(cupons.map((c) => {
      if (c.id === id) {
        return { id: c.id, emoji: c.emoji, titulo: c.titulo, codigo: c.codigo, desconto: c.desconto, resgatado: true };
      }
      return c;
    }));
    setMensagem(`Cupom "${cupom.codigo}" aplicado!`);
  }

  const disponiveis = cupons.filter((c) => !c.resgatado).length;

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>🎟️ Seus Cupons ({disponiveis} disponíveis)</Text>

      {mensagem ? <Text style={styles.feedback}>✅ {mensagem}</Text> : null}

      {disponiveis === 0 ? <Text style={styles.vazio}>😢 Você já resgatou todos os cupons!</Text> : null}

      {cupons.map((cupom) => (
        <View key={cupom.id} style={cupom.resgatado ? styles.cardUsado : styles.card}>
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitulo}>{cupom.emoji} {cupom.titulo}</Text>
            <Text style={styles.cardDesconto}>{cupom.desconto}</Text>
          </View>
          <Text style={styles.cardCodigo}>{cupom.codigo}</Text>
          <TouchableOpacity
            style={cupom.resgatado ? styles.botaoUsado : styles.botao}
            onPress={() => resgatarCupom(cupom.id)}
          >
            <Text style={styles.botaoTexto}>{cupom.resgatado ? '✓ Usado' : 'Resgatar'}</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container:   { flex: 1, backgroundColor: '#292929', padding: 16, paddingTop: 40 },
  titulo:      { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  feedback:    { color: '#a5d6a7', backgroundColor: '#1a4a1a', padding: 8, borderRadius: 6, marginBottom: 8 },
  vazio:       { color: '#fff', textAlign: 'center', marginTop: 40, fontSize: 15 },
  card:        { backgroundColor: '#1e1e1e', borderRadius: 10, padding: 20, marginBottom: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  cardUsado:   { backgroundColor: '#1e1e1e', borderRadius: 10, padding: 20, marginBottom: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', opacity: 0.45 },
  cardInfo:    { flex: 1 },
  cardTitulo:  { color: '#fff', fontSize: 15, fontWeight: 'bold' },
  cardDesconto:{ color: '#aaa', fontSize: 13 },
  cardCodigo:  { color: '#ba0a4e', fontSize: 10, fontWeight: 'bold', marginHorizontal: 8 },
  botao:       { backgroundColor: '#ba0a4e', borderRadius: 6, paddingHorizontal: 14, paddingVertical: 6 },
  botaoUsado:  { backgroundColor: '#444', borderRadius: 6, paddingHorizontal: 14, paddingVertical: 6 },
  botaoTexto:  { color: '#fff', fontSize: 11, fontWeight: 'bold' },
});