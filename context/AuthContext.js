import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext(null);

const CHAVE_USUARIOS = '@fiafood:usuarios';
const CHAVE_SESSAO = '@fiafood:sessao';

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarSessao() {
      try {
        const sessaoSalva = await AsyncStorage.getItem(CHAVE_SESSAO);
        if (sessaoSalva) {
          setUsuario(JSON.parse(sessaoSalva));
        }
      } catch (error) {
        console.log('Erro ao carregar sessao', error);
      } finally {
        setCarregando(false);
      }
    }

    carregarSessao();
  }, []);

  async function buscarUsuarios() {
    const usuariosSalvos = await AsyncStorage.getItem(CHAVE_USUARIOS);
    return usuariosSalvos ? JSON.parse(usuariosSalvos) : [];
  }

  async function cadastrar(nome, email, senha) {
    try {
      const usuarios = await buscarUsuarios();
      const emailTratado = email.trim().toLowerCase();
      const jaExiste = usuarios.some((item) => item.email === emailTratado);

      if (jaExiste) {
        return { sucesso: false, mensagem: 'Este e-mail ja esta cadastrado' };
      }

      const novoUsuario = {
        id: Date.now(),
        nome: nome.trim(),
        email: emailTratado,
        senha,
      };

      await AsyncStorage.setItem(CHAVE_USUARIOS, JSON.stringify([...usuarios, novoUsuario]));

      return { sucesso: true, mensagem: 'Cadastro realizado com sucesso' };
    } catch (error) {
      console.log('Erro ao cadastrar usuario', error);
      return { sucesso: false, mensagem: 'Nao foi possivel cadastrar agora' };
    }
  }

  async function login(email, senha) {
    try {
      const usuarios = await buscarUsuarios();
      const emailTratado = email.trim().toLowerCase();
      const usuarioEncontrado = usuarios.find(
        (item) => item.email === emailTratado && item.senha === senha
      );

      if (!usuarioEncontrado) {
        return { sucesso: false, mensagem: 'E-mail ou senha invalidos' };
      }

      const sessao = {
        id: usuarioEncontrado.id,
        nome: usuarioEncontrado.nome,
        email: usuarioEncontrado.email,
      };

      await AsyncStorage.setItem(CHAVE_SESSAO, JSON.stringify(sessao));
      setUsuario(sessao);

      return { sucesso: true, mensagem: 'Login realizado com sucesso' };
    } catch (error) {
      console.log('Erro ao fazer login', error);
      return { sucesso: false, mensagem: 'Nao foi possivel entrar agora' };
    }
  }

  async function logout() {
    try {
      await AsyncStorage.removeItem(CHAVE_SESSAO);
      setUsuario(null);
    } catch (error) {
      console.log('Erro ao sair', error);
    }
  }

  return (
    <AuthContext.Provider value={{ usuario, carregando, cadastrar, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth deve ser usado dentro de AuthProvider');
  return ctx;
}
