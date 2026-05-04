import { View, Text, StyleSheet,TouchableOpacity, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import { useCarrinho } from '../context/carrinhoContext';

export default function Cupons() {
  const [mensagem, setMensagem] = useState(null);
  const { cupons, resgatarCupom } = useCarrinho();

  useEffect(() => {
    if (mensagem) {
      const timer = setTimeout(() => setMensagem(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [mensagem]);

  function resgatar(id) {
    const cupom = resgatarCupom(id);
    if (!cupom) return;

    setMensagem(`Cupom "${cupom.codigo}" aplicado!`);
  }

  const disponiveis = cupons.filter((c) => !c.resgatado).length;

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Seus Cupons ({disponiveis} disponiveis)</Text>

      {mensagem ? <Text style={styles.feedback}>{mensagem}</Text> : null}

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.lista}>
        {disponiveis === 0 ? (
          <View style={styles.vazioArea}>
            <Text style={styles.vazioTitulo}>Voce ja resgatou todos os cupons!</Text>
            <Text style={styles.vazioTexto}>Os descontos usados ficam salvos mesmo depois de fechar o app.</Text>
          </View>
        ) : null}

        {cupons.map((cupom) => (
          <View key={cupom.id} style={cupom.resgatado ? styles.cardUsado : styles.card}>
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitulo}>{cupom.emoji} {cupom.titulo}</Text>
              <Text style={styles.cardDesconto}>
                {cupom.tipo === 'porcentagem' ? `${cupom.valor}% OFF` : `R$ ${cupom.valor} OFF`}
              </Text>
            </View>

            <Text style={styles.cardCodigo}>{cupom.codigo}</Text>

            <TouchableOpacity
              style={cupom.resgatado ? styles.botaoUsado : styles.botao}
              onPress={() => resgatar(cupom.id)}
              disabled={cupom.resgatado}
            >
              <Text style={styles.botaoTexto}>{cupom.resgatado ? 'Usado' : 'Resgatar'}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container:   { flex: 1, backgroundColor: '#000000', padding: 16, paddingTop: 40 },
  titulo:      { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  feedback:    { color: '#a5d6a7', backgroundColor: '#1a4a1a', padding: 8, borderRadius: 6, marginBottom: 8 },
  lista:       { paddingBottom: 100 },
  vazioArea:   { alignItems: 'center', marginTop: 35, marginBottom: 20 },
  vazioTitulo: { color: '#fff', textAlign: 'center', fontSize: 16, fontWeight: 'bold' },
  vazioTexto:  { color: '#aaa', textAlign: 'center', marginTop: 6, fontSize: 13 },
  card:        { backgroundColor: '#292929', borderRadius: 10, padding: 20, marginBottom: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  cardUsado:   { backgroundColor: '#000000', borderRadius: 10, padding: 20, marginBottom: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', opacity: 0.45 },
  cardInfo:    { flex: 1 },
  cardTitulo:  { color: '#fff', fontSize: 15, fontWeight: 'bold' },
  cardDesconto:{ color: '#aaa', fontSize: 13 },
  cardCodigo:  { color: '#ba0a4e', fontSize: 10, fontWeight: 'bold', marginHorizontal: 8 },
  botao:       { backgroundColor: '#ba0a4e', borderRadius: 6, paddingHorizontal: 14, paddingVertical: 6 },
  botaoUsado:  { backgroundColor: '#444', borderRadius: 6, paddingHorizontal: 14, paddingVertical: 6 },
  botaoTexto:  { color: '#fff', fontSize: 11, fontWeight: 'bold' },
});
