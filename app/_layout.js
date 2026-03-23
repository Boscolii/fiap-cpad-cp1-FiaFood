import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet } from 'react-native';        // ← faltava
import { CarrinhoProvider, useCarrinho } from '../context/carrinhoContext'; // ← faltava

function TabsNavegacao() {
  const { carrinho } = useCarrinho();

  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#ba0a4e', tabBarStyle: { backgroundColor: '#000000' }, headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="carrinho"
        options={{
          title: 'Carrinho',
          tabBarIcon: ({ color, size }) => (
            <View>
              <Ionicons name="cart" size={size} color={color} />
              {carrinho.length > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{carrinho.length}</Text>
                </View>
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="cupons"
        options={{
          title: 'Cupons',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ticket" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          title: 'Menu',
          tabBarIcon: ({ color, size }) => (
          <Ionicons name="restaurant" size={size} color={color} />
    ),
  }}
/>
    </Tabs>
    
  );
}




export default function Layout() {
  return (
    <CarrinhoProvider>
    
      <TabsNavegacao />
    </CarrinhoProvider>
  );
}
const styles = StyleSheet.create({
  badge:     { position: 'absolute', right: -8, top: -5, backgroundColor: '#ba0a4e', borderRadius: 10, width: 18, height: 18, justifyContent: 'center', alignItems: 'center' },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
});