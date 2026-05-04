import { useState } from 'react';
import { View, Text, StyleSheet,ScrollView,Image,TouchableOpacity, TextInput} from 'react-native';
import { useCarrinho } from '../context/carrinhoContext';
import { Ionicons } from '@expo/vector-icons';

const COLORS = {
  primary: '#ba0a4e',
  black: '#000000',
  surface: '#1a1a1a',
  white: '#ffffff',
  textLight: '#aaaaaa',
  grayBg: '#292929'
};

const PRODUTOS = {
  Salgados: [
    { id: 1, nome: 'Coxinha', preco: 9.90, img: require('../assets/menu/coxinha.jpg') },
    { id: 2, nome: 'Esfiha', preco: 8.00, img: require('../assets/menu/esfirra.jpg') },
    { id: 3, nome: 'Pão De Queijo', preco: 7.00, img: require('../assets/menu/paodequeijo.jpg')},
    { id: 4, nome: 'Esfiha De Carne', preco: 8.00, img: require('../assets/menu/esfirra.jpg')},
  ],
  Bebidas: [
    { id: 5, nome: 'Coca-Cola', preco: 6.00, img: require('../assets/menu/refri.jpg') },
    { id: 6, nome: 'Guaraná', preco: 6.00, img: require('../assets/menu/guarana.jpg') },
  ],
  Doces: [
    { id: 7, nome: 'Fatia Bolo de Chocolate', preco: 15.00, img: require('../assets/menu/bolo.jpg') },
    { id: 8, nome: 'Cookie', preco: 12.90, img: require('../assets/menu/cookie.jpg') },
    { id: 9, nome: 'Fatia de Pudim', preco: 10.00, img: require('../assets/menu/pudim.jpg') }

  ]
};

export default function Menu() {
  const { adicionarItem } = useCarrinho();
  const [busca, setBusca] = useState('');

  const categorias = Object.keys(PRODUTOS);
  const textoBusca = busca.toLowerCase().trim();

  const categoriasFiltradas = categorias.map((categoria) => {
    const produtos = PRODUTOS[categoria].filter((item) => {
      return (
        item.nome.toLowerCase().includes(textoBusca) ||
        categoria.toLowerCase().includes(textoBusca)
      );
    });

    return { categoria, produtos };
  }).filter((grupo) => grupo.produtos.length > 0);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Menu</Text>

      <View style={styles.buscaArea}>
        <Ionicons name="search-outline" size={20} color={COLORS.textLight} />
        <TextInput
          style={styles.buscaInput}
          placeholder="Buscar no menu"
          placeholderTextColor={COLORS.textLight}
          value={busca}
          onChangeText={setBusca}
        />
        {busca ? (
          <TouchableOpacity onPress={() => setBusca('')}>
            <Ionicons name="close-circle" size={20} color={COLORS.textLight} />
          </TouchableOpacity>
        ) : null}
      </View>

      <ScrollView contentContainerStyle={styles.lista} showsVerticalScrollIndicator={false}>
        
        {categoriasFiltradas.length === 0 ? (
          <View style={styles.vazioArea}>
            <Ionicons name="restaurant-outline" size={34} color={COLORS.primary} />
            <Text style={styles.vazioTitulo}>Nenhum produto encontrado</Text>
            <Text style={styles.vazioTexto}>Tente buscar por salgado, bebida ou doce.</Text>
          </View>
        ) : null}

        {categoriasFiltradas.map((grupo) => (
          <View key={grupo.categoria}>
            <Text style={styles.tituloSecao}>{grupo.categoria}</Text>

            {grupo.produtos.map((item) => (
              <View key={item.id} style={styles.card}>
                
                <Image source={item.img} style={styles.img} />

                <View style={{ flex: 1 }}>
                  <Text style={styles.nome}>{item.nome}</Text>
                  <Text style={styles.preco}>
                    R$ {item.preco.toFixed(2).replace('.', ',')}
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.botaoAdd}
                  onPress={() => adicionarItem(item)}
                >
                  <Text style={styles.botaoText}>+</Text>
                </TouchableOpacity>

              </View>
            ))}

          </View>
        ))}

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {flex: 1,backgroundColor: COLORS.black,paddingTop: 40},
    titulo: {color: COLORS.white,fontSize: 24,fontWeight: 'bold',marginHorizontal: 20,marginBottom: 10},
    buscaArea: {backgroundColor: COLORS.grayBg, borderRadius: 10, marginHorizontal: 20, paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center', marginBottom: 8},
    buscaInput: {flex: 1, color: COLORS.white, paddingVertical: 12, paddingLeft: 8, fontSize: 15},
    lista: {paddingHorizontal: 20,paddingBottom: 100},
    tituloSecao: {color: COLORS.white,fontSize: 20,fontWeight: 'bold',marginTop: 20,paddingBottom: 10},
    card: {flexDirection: 'row',backgroundColor: COLORS.surface,borderRadius: 12,padding: 15,marginBottom: 10,alignItems: 'center'},
    img: {width: 60,height: 60,borderRadius: 10,marginRight: 10},
    nome: {color: COLORS.white,fontSize: 16},
    preco: {color: COLORS.primary,fontWeight: 'bold',marginTop: 5},
    botaoAdd: {backgroundColor: COLORS.primary,width: 35,height: 35,borderRadius: 18,justifyContent: 'center',alignItems: 'center'},
    botaoText: {color: '#fff',fontSize: 18,fontWeight: 'bold'},
    vazioArea: {alignItems: 'center', marginTop: 80, paddingHorizontal: 20},
    vazioTitulo: {color: COLORS.white, fontSize: 18, fontWeight: 'bold', marginTop: 10},
    vazioTexto: {color: COLORS.textLight, fontSize: 14, textAlign: 'center', marginTop: 6},
});
