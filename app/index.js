import { View, Text, Button, StyleSheet,Image } from 'react-native';
import { useRouter } from 'expo-router';
export default function Home() {
  const router = useRouter();
  return (
    <View style={styles.container}>
        
        <View style={styles.barraCima}>
            <Image source={require("../assets/cafe.png")} style={styles.imgTopo}  />
            <Text style={styles.Titulo}>FIAFOOD</Text>

        </View>
        <View style={styles.objVendas}>
            <View style={styles.cards} >
                <Image source={require("../assets/paodequeijo.jpg")} style={styles.imgCard}/>
                <Text style={styles.descricaoImg}>Pao de Queijo</Text>
                <Text style={styles.preco}>R$7,90</Text>
            </View>
            <View style={styles.cards}>
                <Image source={require("../assets/coxinha.jpg")} style={styles.imgCard}  />
                <Text style={styles.descricaoImg}>Coxinha</Text>
                <Text style={styles.preco}>R$12,50</Text>
            </View>
        </View>
        <View style={styles.objVendas}>
            <View style={styles.cards}>
                 <Image source={require("../assets/bolo.jpg")} style={styles.imgCard}  /> 
                 <Text style={styles.descricaoImg}>Bolo chocolate</Text>
                <Text style={styles.preco}>R$19,90</Text>
            </View>
            <View style={styles.cards}>
                 <Image source={require("../assets/cookie.jpg")} style={styles.imgCard}  /> 
                 <Text style={styles.descricaoImg}>Cookie</Text>
                <Text style={styles.preco}>R$12,00</Text>
            </View>
        </View>
        



    </View>



  );
}
const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#292929' },
  conteudo : {flex: 1,alignItems: "center",justifyContent: "center",},
  titulo:    { fontSize: 20, fontWeight: 'bold', marginBottom: 24 },
  Titulo:{ color: '#ba0a4e', fontSize: 12, fontWeight: 'bold',},
  barraCima: {position: "absolute",top: 0,backgroundColor: '#000000', height: 50,width: "100%",justifyContent: "center", flexDirection: "row", alignItems: 'center'},
  imgTopo: {width: 60, height: 60, borderRadius:25, marginLeft: -50},
  objVendas: {flexDirection: 'row', justifyContent: 'space-between', padding: 9,marginBottom:40, marginTop:30},
  cards: { flex: 1, height: 210, backgroundColor: '#ba0a4e', margin: 3, borderRadius: 8, alignItems: 'center', justifyContent: 'flex-start',},
  imgCard: {height: 200, alignContent: 'center', width: 179, borderRadius:8, marginTop: 5 },
  descricaoImg: {fontSize: 25, fontWeight: 'bold', marginTop: 15, color: '#fff'},
  preco: {fontSize: 25, fontWeight: 'bold', backgroundColor: '#ba0a4e', borderRadius: 5}
});