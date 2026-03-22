import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  SafeAreaView,
  ActivityIndicator,
  Alert
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const COLORS = {
  primary: '#ba0a4e', 
  black: '#000000',   
  surface: '#1a1a1a', 
  white: '#ffffff',   
  grayBg: '#2a2a2a',  
  textLight: '#aaaaaa'
};

const LOCAIS = [
  'Entrada - 1º Andar',
  'Laboratório de Redes',
  'Entrada - 2º Andar',
  'Biblioteca',
  'Cantina'
];

const CUPONS = [
  { id: 1, codigo: 'BEMVINDO', desc: 'R$ 5,00 de desconto na primeira compra', valor: 5 },
  { id: 2, codigo: 'CAFEINA', desc: 'R$ 2,00 de desconto em cafés', valor: 2 },
  { id: 3, codigo: 'FOME10', desc: '10% de desconto no total', tipo: 'porcentagem', valor: 10 },
];

const PRODUTOS_MOCK = {
  'Salgados': [
    { id: 101, nome: 'Coxinha de Frango', preco: 6.50, desc: 'Massa de batata, bem recheada.', img: 'https://cdn-icons-png.flaticon.com/512/3014/3014502.png' },
    { id: 102, nome: 'Esfiha de Carne', preco: 5.00, desc: 'Massa macia e carne temperada.', img: 'https://cdn-icons-png.flaticon.com/512/3014/3014502.png' },
    { id: 103, nome: 'Enroladinho de Salsicha', preco: 5.50, desc: 'Assado na hora.', img: 'https://cdn-icons-png.flaticon.com/512/3014/3014502.png' },
  ],
  'Bebidas': [
    { id: 201, nome: 'Coca-Cola Lata', preco: 6.00, desc: '350ml gelada.', img: 'https://cdn-icons-png.flaticon.com/512/2935/2935306.png' },
    { id: 202, nome: 'Suco de Laranja', preco: 8.00, desc: 'Natural 400ml.', img: 'https://cdn-icons-png.flaticon.com/512/2935/2935306.png' },
  ]
};

export default function CantinaApp() {
  const [telaAtual, setTelaAtual] = useState('home'); 
  const [isLoading, setIsLoading] = useState(true);
  
  const [carrinho, setCarrinho] = useState([]);
  const [localEntrega, setLocalEntrega] = useState(LOCAIS[0]);
  const [cupomAplicado, setCupomAplicado] = useState(null);
  
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
  const [searchText, setSearchText] = useState('');

  const categorias = [
    { id: 1, nome: 'Salgados', icone: 'food-croissant' },
    { id: 2, nome: 'Bebidas', icone: 'cup-water' },
    { id: 3, nome: 'Doces', icone: 'candycane' },
  ];

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const adicionarAoCarrinho = (produto) => {
    setCarrinho([...carrinho, produto]);
    Alert.alert("Adicionado!", `${produto.nome} foi para o carrinho.`);
  };

  const removerDoCarrinho = (index) => {
    const novoCarrinho = [...carrinho];
    novoCarrinho.splice(index, 1);
    setCarrinho(novoCarrinho);
  };

  const calcularTotal = () => {
    let total = carrinho.reduce((acc, item) => acc + item.preco, 0);
    if (cupomAplicado) {
      if (cupomAplicado.tipo === 'porcentagem') {
        total = total - (total * (cupomAplicado.valor / 100));
      } else {
        total = total - cupomAplicado.valor;
      }
    }
    return total > 0 ? total : 0;
  };


  const renderHome = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={COLORS.primary} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="O que vamos comer hoje?"
          placeholderTextColor={COLORS.textLight}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <View style={styles.categoriesContainer}>
        {categorias.map((cat) => (
          <TouchableOpacity 
            key={cat.id} 
            style={styles.categoryItem}
            onPress={() => {
              setCategoriaSelecionada(cat.nome);
              setTelaAtual('categoria');
            }}
          >
            <View style={styles.categoryIconBg}>
              <MaterialCommunityIcons name={cat.icone} size={28} color={COLORS.primary} />
            </View>
            <Text style={styles.categoryText}>{cat.nome}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.bannerContainer} onPress={() => setTelaAtual('cupons')}>
        <View style={styles.bannerTextContainer}>
          <Text style={styles.bannerTitle}>Ver Cupons!</Text>
          <Text style={styles.bannerSubtitle}>Clique aqui para resgatar descontos</Text>
        </View>
        <Ionicons name="ticket" size={40} color={COLORS.white} />
      </TouchableOpacity>
      
      <Text style={styles.sectionTitle}>Recomendados</Text>
      <View style={styles.listContainer}>
        {PRODUTOS_MOCK['Salgados'].map((item) => (
          <View key={item.id} style={styles.cardItem}>
            <Image source={{ uri: item.img }} style={styles.cardImage} />
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>{item.nome}</Text>
              <Text style={styles.cardPrice}>R$ {item.preco.toFixed(2).replace('.', ',')}</Text>
            </View>
            <TouchableOpacity style={styles.addButton} onPress={() => adicionarAoCarrinho(item)}>
              <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );

  const renderCategoria = () => {
    const produtos = PRODUTOS_MOCK[categoriaSelecionada] || [];
    return (
      <View style={{flex: 1}}>
        <TouchableOpacity style={styles.backButton} onPress={() => setTelaAtual('home')}>
          <Ionicons name="arrow-back" size={24} color={COLORS.white} />
          <Text style={styles.backText}>Voltar para Início</Text>
        </TouchableOpacity>
        <Text style={styles.sectionTitle}>{categoriaSelecionada}</Text>
        <ScrollView contentContainerStyle={styles.listContainer}>
          {produtos.length > 0 ? produtos.map((item) => (
            <View key={item.id} style={styles.cardItem}>
              <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>{item.nome}</Text>
                <Text style={styles.cardDesc}>{item.desc}</Text>
                <Text style={styles.cardPrice}>R$ {item.preco.toFixed(2).replace('.', ',')}</Text>
              </View>
              <TouchableOpacity style={styles.addButton} onPress={() => adicionarAoCarrinho(item)}>
                <Text style={styles.addButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          )) : <Text style={styles.emptyText}>Nenhum item nesta categoria ainda.</Text>}
        </ScrollView>
      </View>
    );
  };

  const renderCarrinho = () => (
    <View style={{flex: 1}}>
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
              <TouchableOpacity onPress={() => removerDoCarrinho(index)}>
                <Ionicons name="trash-outline" size={24} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>
      
      {carrinho.length > 0 && (
        <View style={styles.checkoutContainer}>
          {cupomAplicado && (
            <Text style={styles.cupomAtivoText}>Cupom {cupomAplicado.codigo} aplicado!</Text>
          )}
          <View style={styles.totalRow}>
            <Text style={styles.totalText}>Total:</Text>
            <Text style={styles.totalValue}>R$ {calcularTotal().toFixed(2).replace('.', ',')}</Text>
          </View>
          <TouchableOpacity style={styles.checkoutButton} onPress={() => Alert.alert("Sucesso!", "Pedido enviado para a cantina.")}>
            <Text style={styles.checkoutButtonText}>Finalizar Pedido</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  const renderCupons = () => (
    <View style={{flex: 1}}>
      <TouchableOpacity style={styles.backButton} onPress={() => setTelaAtual('home')}>
        <Ionicons name="arrow-back" size={24} color={COLORS.white} />
        <Text style={styles.backText}>Voltar</Text>
      </TouchableOpacity>
      <Text style={styles.sectionTitle}>Cupons Disponíveis</Text>
      <ScrollView contentContainerStyle={styles.listContainer}>
        {CUPONS.map((cupom) => (
          <TouchableOpacity 
            key={cupom.id} 
            style={styles.cupomCard}
            onPress={() => {
              setCupomAplicado(cupom);
              Alert.alert("Cupom Resgatado!", `O cupom ${cupom.codigo} foi aplicado ao seu carrinho.`);
              setTelaAtual('carrinho');
            }}
          >
            <Ionicons name="ticket" size={30} color={COLORS.primary} />
            <View style={styles.cupomInfo}>
              <Text style={styles.cupomCodigo}>{cupom.codigo}</Text>
              <Text style={styles.cupomDesc}>{cupom.desc}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderLocais = () => (
    <View style={{flex: 1}}>
      <TouchableOpacity style={styles.backButton} onPress={() => setTelaAtual('home')}>
        <Ionicons name="arrow-back" size={24} color={COLORS.white} />
        <Text style={styles.backText}>Voltar</Text>
      </TouchableOpacity>
      <Text style={styles.sectionTitle}>Onde você está?</Text>
      <ScrollView contentContainerStyle={styles.listContainer}>
        {LOCAIS.map((local, index) => (
          <TouchableOpacity 
            key={index} 
            style={[styles.localCard, localEntrega === local && styles.localCardAtivo]}
            onPress={() => {
              setLocalEntrega(local);
              setTelaAtual('home');
            }}
          >
            <Ionicons name="location" size={24} color={localEntrega === local ? COLORS.primary : COLORS.white} />
            <Text style={[styles.localText, localEntrega === local && styles.localTextAtivo]}>{local}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER GLOBAL (Esconde se não for home) */}
      {telaAtual === 'home' && (
        <View style={styles.header}>
          <View>
            <Text style={styles.headerSubtitle}>Entregar na sala</Text>
            <TouchableOpacity style={styles.addressRow} onPress={() => setTelaAtual('locais')}>
              <Text style={styles.headerTitle}>{localEntrega}</Text>
              <Ionicons name="chevron-down" size={20} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
            <Ionicons name="person-circle-outline" size={40} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
      )}

      {/* RENDERIZAÇÃO CONDICIONAL DA TELA */}
      {telaAtual === 'home' && renderHome()}
      {telaAtual === 'categoria' && renderCategoria()}
      {telaAtual === 'carrinho' && renderCarrinho()}
      {telaAtual === 'cupons' && renderCupons()}
      {telaAtual === 'locais' && renderLocais()}

      {/* BOTTOM NAVIGATION */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => setTelaAtual('home')}>
          <Ionicons name="home" size={24} color={telaAtual === 'home' ? COLORS.primary : COLORS.textLight} />
          <Text style={[styles.navText, telaAtual === 'home' && { color: COLORS.primary }]}>Início</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => setTelaAtual('carrinho')}>
          <View>
            <Ionicons name="cart" size={24} color={telaAtual === 'carrinho' ? COLORS.primary : COLORS.textLight} />
            {carrinho.length > 0 && (
              <View style={styles.badge}><Text style={styles.badgeText}>{carrinho.length}</Text></View>
            )}
          </View>
          <Text style={[styles.navText, telaAtual === 'carrinho' && { color: COLORS.primary }]}>Carrinho</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.black, paddingTop: 40 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.black },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 10 },
  headerSubtitle: { fontSize: 12, color: COLORS.textLight },
  addressRow: { flexDirection: 'row', alignItems: 'center' },
  headerTitle: { fontSize: 16, fontWeight: 'bold', color: COLORS.white, marginRight: 5 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.grayBg, marginHorizontal: 20, marginTop: 15, borderRadius: 8, paddingHorizontal: 15, height: 50 },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, fontSize: 16, color: COLORS.white },
  categoriesContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: 20, marginTop: 20 },
  categoryItem: { width: '23%', alignItems: 'center', marginBottom: 20 },
  categoryIconBg: { backgroundColor: COLORS.surface, width: 60, height: 60, borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  categoryText: { fontSize: 12, color: COLORS.white, textAlign: 'center' },
  bannerContainer: { backgroundColor: COLORS.primary, marginHorizontal: 20, borderRadius: 12, padding: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 },
  bannerTextContainer: { flex: 1 },
  bannerTitle: { color: COLORS.white, fontSize: 18, fontWeight: 'bold' },
  bannerSubtitle: { color: COLORS.white, fontSize: 14, marginTop: 5 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: COLORS.white, marginHorizontal: 20, marginTop: 25, marginBottom: 15 },
  listContainer: { paddingHorizontal: 20, paddingBottom: 100 },
  cardItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 15, backgroundColor: COLORS.surface, borderRadius: 12, padding: 15 },
  cardImage: { width: 60, height: 60, borderRadius: 10, backgroundColor: COLORS.grayBg, marginRight: 15 },
  cardInfo: { flex: 1 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: COLORS.white, marginBottom: 4 },
  cardDesc: { fontSize: 12, color: COLORS.textLight, marginBottom: 8 },
  cardPrice: { fontSize: 16, fontWeight: 'bold', color: COLORS.primary },
  addButton: { backgroundColor: COLORS.primary, width: 35, height: 35, borderRadius: 17.5, justifyContent: 'center', alignItems: 'center' },
  addButtonText: { color: COLORS.white, fontSize: 20, fontWeight: 'bold' },
  emptyText: { color: COLORS.textLight, fontSize: 16, textAlign: 'center', marginTop: 40 },
  bottomNav: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10, backgroundColor: COLORS.surface, position: 'absolute', bottom: 0, width: '100%' },
  navItem: { alignItems: 'center' },
  navText: { fontSize: 12, color: COLORS.textLight, marginTop: 4 },
  badge: { position: 'absolute', right: -8, top: -5, backgroundColor: COLORS.primary, borderRadius: 10, width: 20, height: 20, justifyContent: 'center', alignItems: 'center' },
  badgeText: { color: COLORS.white, fontSize: 10, fontWeight: 'bold' },
  backButton: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, marginTop: 10 },
  backText: { color: COLORS.white, fontSize: 16, marginLeft: 10 },
  checkoutContainer: { backgroundColor: COLORS.surface, padding: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20, position: 'absolute', bottom: 60, width: '100%' },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  totalText: { color: COLORS.white, fontSize: 18, fontWeight: 'bold' },
  totalValue: { color: COLORS.primary, fontSize: 22, fontWeight: 'bold' },
  checkoutButton: { backgroundColor: COLORS.primary, padding: 15, borderRadius: 10, alignItems: 'center' },
  checkoutButtonText: { color: COLORS.white, fontSize: 18, fontWeight: 'bold' },
  cupomCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.surface, padding: 15, borderRadius: 12, marginBottom: 15 },
  cupomInfo: { marginLeft: 15 },
  cupomCodigo: { color: COLORS.white, fontSize: 16, fontWeight: 'bold' },
  cupomDesc: { color: COLORS.textLight, fontSize: 14, marginTop: 4 },
  cupomAtivoText: { color: '#4caf50', fontSize: 14, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  localCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.surface, padding: 15, borderRadius: 12, marginBottom: 10 },
  localCardAtivo: { borderColor: COLORS.primary, borderWidth: 1 },
  localText: { color: COLORS.white, fontSize: 16, marginLeft: 15 },
  localTextAtivo: { color: COLORS.primary, fontWeight: 'bold' }
});