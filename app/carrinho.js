import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCarrinho } from '../context/carrinhoContext';
import { useRouter } from 'expo-router';

export default function Carrinho() {
  const { carrinho, removerItem, cupomAplicado, total, limparCarrinho } = useCarrinho();
  const COLORS = { 
    primary: '#ba0a4e', 
    black: '#000000', 
    surface: '#1a1a1a', 
    white: '#ffffff', 
    grayBg: '#292929', 
    textLight: '#aaaaaa' };

    const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Seu Pedido</Text>

      <ScrollView contentContainerStyle={styles.listContainer}>
        {carrinho.length === 0 ? (
          <Text style={styles.emptyText}>Seu carrinho está vazio.</Text>
        ) : (
          carrinho.map((item, index) => (
            <View key={index} style={styles.cardItem}>
              <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>{item.nome}</Text>
                <Text style={styles.cardPrice}>R$ {item.preco.toFixed(2).replace('.', ',')}</Text>
              </View>
              <TouchableOpacity onPress={() => removerItem(index)}>
                <Ionicons name="trash-outline" size={24} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>

      {carrinho.length > 0 && (
        <View style={styles.checkoutContainer}>
            <TouchableOpacity
                style={styles.cupomButton}
                onPress={() => router.push('/cupons')}>
    <Ionicons name="ticket" size={20} color="#fff" />
    <Text style={styles.cupomButtonText}>Ver Cupons</Text>
              </TouchableOpacity>
                      {cupomAplicado ? (
              <Text style={styles.cupomAtivoText}>
                Cupom {cupomAplicado.codigo} aplicado!
              </Text>
            ) : null}
          <View style={styles.totalRow}>
            <Text style={styles.totalText}>Total:</Text>
            <Text style={styles.totalValue}>R$ {total.toFixed(2).replace('.', ',')}</Text>
          </View>
          
          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={() => {
              Alert.alert('Sucesso!', 'Pedido enviado para a cantina.');
              limparCarrinho();
            }}
          >
            <Text style={styles.checkoutButtonText}>Finalizar Pedido</Text>
          </TouchableOpacity>
        </View>
        
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container:           { flex: 1, backgroundColor: '#000000', paddingTop: 40 },
  sectionTitle:        { fontSize: 20, fontWeight: 'bold', color: '#ffffff', marginHorizontal: 20, marginTop: 25, marginBottom: 15 },
  listContainer:       { paddingHorizontal: 20, paddingBottom: 180 },
  cardItem:            { flexDirection: 'row', alignItems: 'center', marginBottom: 15, backgroundColor: '#292929', borderRadius: 12, padding: 15 },
  cardInfo:            { flex: 1 },
  cardTitle:           { fontSize: 16, fontWeight: 'bold', color: '#ffffff', marginBottom: 4 },
  cardPrice:           { fontSize: 16, fontWeight: 'bold', color: '#ba0a4e' },
  emptyText:           { color: '#aaaaaa', fontSize: 16, textAlign: 'center', marginTop: 40 },
  checkoutContainer:   { backgroundColor: '#1a1a1a', padding: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20, position: 'absolute', bottom: 0, width: '100%' },
  totalRow:            { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  totalText:           { color: '#ffffff', fontSize: 18, fontWeight: 'bold' },
  totalValue:          { color: '#ba0a4e', fontSize: 22, fontWeight: 'bold' },
  checkoutButton:      { backgroundColor: '#ba0a4e', padding: 15, borderRadius: 10, alignItems: 'center' },
  checkoutButtonText:  { color: '#ffffff', fontSize: 18, fontWeight: 'bold' },
  cupomAtivoText:      { color: '#4caf50', fontSize: 14, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  cupomButton: {backgroundColor: '#444',padding: 12,borderRadius: 10,flexDirection: 'row',justifyContent: 'center',marginBottom: 10},
  cupomButtonText: {color: '#fff',marginLeft: 8,fontWeight: 'bold'},
});