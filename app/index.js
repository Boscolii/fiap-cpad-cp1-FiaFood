import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { useCarrinho } from '../context/carrinhoContext';
import { useAuth } from '../context/AuthContext';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator
} from 'react-native';
import { Ionicons} from '@expo/vector-icons';

const COLORS = {
  primary: '#ba0a4e',
  black: '#000000',
  surface: '#1a1a1a',
  white: '#ffffff',
  grayBg: '#292929',
  textLight: '#aaaaaa'
};

const PRODUTOS_MOCK = {
  'Salgados': [
    { id: 101, nome: 'Coxinha de Frango', preco: 9.90, img: require('../assets/menu/coxinha.jpg') },
    { id: 102, nome: 'Esfiha de Carne', preco: 8.00, img: require('../assets/menu/esfirra.jpg') },
    { id: 103, nome: 'Bolo de Chocolate', preco: 15.99, img: require('../assets/menu/bolo.jpg')},
    { id: 104, nome: 'Coca-Cola', preco: 6.00, img: require('../assets/menu/refri.jpg')}
  ]
};

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const { adicionarItem } = useCarrinho();
  const { usuario, logout } = useAuth();

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const renderHome = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.ContainerBoasVindas}>
            <Text style={styles.TituloBoasVindas}>Bem-vindo à Cantina FIAP </Text>
            <Text style={styles.subtituloBoasVindas}>Retire seus lanches rapidamente no sexto andar</Text>
        </View>
      <TouchableOpacity
        style={styles.bannerContainer}
        onPress={() => router.push('/menu')}
      >
        <View style={styles.bannerTextContainer}>
          <Text style={styles.bannerTitle}>Ver Menu</Text>
          <Text style={styles.bannerSubtitle}>
            Explore nossos produtos
          </Text>
        </View>
        <Ionicons name="restaurant" size={40} color={COLORS.white} />
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Recomendados</Text>

      <View style={styles.listContainer}>
        {PRODUTOS_MOCK['Salgados'].map((item) => (
          <View key={item.id} style={styles.cardItem}>
            <Image source={item.img } style={styles.cardImage} />

            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>{item.nome}</Text>
              <Text style={styles.cardPrice}>
                R$ {item.preco.toFixed(2).replace('.', ',')}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.addButton}
              onPress={() => adicionarItem(item)}
            >
              <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      
      <View style={styles.barraCima}>
        <Image source={require("../assets/cafe.png")} style={styles.imgTopo} />
        <View style={styles.tituloArea}>
          <Text style={styles.Titulo}>FIAFOOD</Text>
          <Text style={styles.usuarioTexto}>Oi, {usuario?.nome ? usuario.nome.split(' ')[0] : 'aluno'}</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Ionicons name="log-out-outline" size={22} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      {renderHome()}

    </View>
  );
}

const styles = StyleSheet.create({
container: { flex: 1, backgroundColor: COLORS.black, },
loadingContainer: {flex: 1,justifyContent: 'center',alignItems: 'center',backgroundColor: COLORS.black},
Titulo:{ color: COLORS.primary, fontSize: 25, fontWeight: 'bold',},
barraCima: {top: 0,backgroundColor: '#000000', height: 64,width: "100%",justifyContent: "space-between", flexDirection: "row", alignItems: 'center', paddingHorizontal: 18},
imgTopo: {width: 54, height: 54, borderRadius:25},
tituloArea: { flex: 1, marginLeft: 10 },
usuarioTexto: { color: COLORS.textLight, fontSize: 12, marginTop: -2 },
logoutButton: { backgroundColor: COLORS.grayBg, width: 38, height: 38, borderRadius: 19, justifyContent: 'center', alignItems: 'center' },
bannerContainer: {backgroundColor: COLORS.primary,marginHorizontal: 20,borderRadius: 12,padding: 20,flexDirection: 'row',alignItems: 'center',justifyContent: 'space-between',marginTop: 10},
bannerTextContainer: { flex: 1 },
bannerTitle: {color: COLORS.white,fontSize: 18,fontWeight: 'bold'},
bannerSubtitle: {color: COLORS.white,fontSize: 14,marginTop: 5},
sectionTitle: {fontSize: 20,fontWeight: 'bold',color: COLORS.white,marginHorizontal: 20,marginTop: 25,marginBottom: 15},
listContainer: {paddingHorizontal: 20,paddingBottom: 100},
cardItem: {flexDirection: 'row',alignItems: 'center',marginBottom: 15,backgroundColor: COLORS.surface,borderRadius: 12,padding: 15},
cardImage: {width: 60,height: 60,borderRadius: 10,backgroundColor: COLORS.surface,marginRight: 15},
cardInfo: { flex: 1 },
cardTitle: {fontSize: 16,fontWeight: 'bold',color: COLORS.white},
cardPrice: {fontSize: 16,fontWeight: 'bold',color: COLORS.primary},
addButton: {backgroundColor: COLORS.primary,width: 35,height: 35,borderRadius: 17.5,justifyContent: 'center',alignItems: 'center'},
addButtonText: {color: COLORS.white,fontSize: 20,fontWeight: 'bold'},
ContainerBoasVindas: {paddingHorizontal: 20,marginTop: 30,marginBottom: 10},
TituloBoasVindas: {color: COLORS.white,fontSize: 22,fontWeight: 'bold',marginBottom: 5},
subtituloBoasVindas: {color: COLORS.textLight,fontSize: 14},
});
