import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useAuth } from '../context/AuthContext';

const COLORS = {
  primary: '#ba0a4e',
  black: '#000000',
  surface: '#1a1a1a',
  white: '#ffffff',
  grayBg: '#292929',
  textLight: '#aaaaaa',
  error: '#ff5c7a',
  success: '#4caf50',
};

export default function Login() {
  const router = useRouter();
  const { login, usuario } = useAuth();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erros, setErros] = useState({});
  const [mensagem, setMensagem] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [tocados, setTocados] = useState({});

  useEffect(() => {
    if (usuario) {
      router.replace('/');
    }
  }, [usuario]);

  function validar() {
    const novosErros = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      novosErros.email = 'O e-mail e obrigatorio';
    } else if (!emailRegex.test(email.trim())) {
      novosErros.email = 'Digite um e-mail valido';
    }

    if (!senha) {
      novosErros.senha = 'A senha e obrigatoria';
    } else if (senha.length < 6) {
      novosErros.senha = 'A senha deve ter no minimo 6 caracteres';
    }

    return novosErros;
  }

  useEffect(() => {
    if (Object.keys(tocados).length > 0) {
      setErros(validar());
    }
  }, [email, senha, tocados]);

  function marcarCampo(campo) {
    setTocados((prev) => ({ ...prev, [campo]: true }));
  }

  async function entrar() {
    const validacao = validar();
    setTocados({ email: true, senha: true });
    setErros(validacao);
    setMensagem('');

    if (Object.keys(validacao).length > 0) return;

    setCarregando(true);
    const resposta = await login(email, senha);
    setCarregando(false);

    if (!resposta.sucesso) {
      setMensagem(resposta.mensagem);
      return;
    }

    router.replace('/');
  }

  const formularioValido = Object.keys(validar()).length === 0;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.conteudo} keyboardShouldPersistTaps="handled">
        <View style={styles.logoArea}>
          <Text style={styles.logo}>FIAFOOD</Text>
          <Text style={styles.subtitulo}>Entre para fazer seu pedido na cantina</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.titulo}>Login</Text>

          <Text style={styles.label}>E-mail</Text>
          <View style={styles.inputArea}>
            <Ionicons name="mail-outline" size={20} color={COLORS.textLight} />
            <TextInput
              style={styles.input}
              placeholder="usuario@dominio.com"
              placeholderTextColor={COLORS.textLight}
              value={email}
              onChangeText={setEmail}
              onBlur={() => marcarCampo('email')}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>
          {tocados.email && erros.email ? <Text style={styles.erro}>{erros.email}</Text> : null}

          <Text style={styles.label}>Senha</Text>
          <View style={styles.inputArea}>
            <Ionicons name="lock-closed-outline" size={20} color={COLORS.textLight} />
            <TextInput
              style={styles.input}
              placeholder="Sua senha"
              placeholderTextColor={COLORS.textLight}
              value={senha}
              onChangeText={setSenha}
              onBlur={() => marcarCampo('senha')}
              secureTextEntry
            />
          </View>
          {tocados.senha && erros.senha ? <Text style={styles.erro}>{erros.senha}</Text> : null}

          {mensagem ? <Text style={styles.erroGeral}>{mensagem}</Text> : null}

          <TouchableOpacity
            style={formularioValido ? styles.botao : styles.botaoDesativado}
            onPress={entrar}
            disabled={!formularioValido || carregando}
          >
            {carregando ? (
              <ActivityIndicator color={COLORS.white} />
            ) : (
              <Text style={styles.botaoTexto}>Entrar</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity style={styles.linkArea} onPress={() => router.push('/cadastro')}>
            <Text style={styles.linkTexto}>Ainda nao tenho conta</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.black },
  conteudo: { flexGrow: 1, padding: 20, justifyContent: 'center' },
  logoArea: { marginBottom: 30 },
  logo: { color: COLORS.primary, fontSize: 32, fontWeight: 'bold', textAlign: 'center' },
  subtitulo: { color: COLORS.textLight, fontSize: 14, textAlign: 'center', marginTop: 8 },
  form: { backgroundColor: COLORS.surface, borderRadius: 12, padding: 20 },
  titulo: { color: COLORS.white, fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  label: { color: COLORS.white, fontSize: 14, fontWeight: 'bold', marginBottom: 8, marginTop: 8 },
  inputArea: { backgroundColor: COLORS.grayBg, borderRadius: 10, paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center' },
  input: { flex: 1, color: COLORS.white, paddingVertical: 12, paddingLeft: 8, fontSize: 15 },
  erro: { color: COLORS.error, fontSize: 12, marginTop: 5 },
  erroGeral: { color: COLORS.error, fontSize: 13, textAlign: 'center', marginTop: 12, fontWeight: 'bold' },
  botao: { backgroundColor: COLORS.primary, padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 20 },
  botaoDesativado: { backgroundColor: '#603040', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 20, opacity: 0.7 },
  botaoTexto: { color: COLORS.white, fontSize: 16, fontWeight: 'bold' },
  linkArea: { alignItems: 'center', marginTop: 16 },
  linkTexto: { color: COLORS.primary, fontSize: 14, fontWeight: 'bold' },
});
