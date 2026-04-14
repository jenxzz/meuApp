import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [id, setId] = useState('');
  const [nome, setNome] = useState('Nome aparecerá aqui');
  const [profissao, setProfissao] = useState('Profissão aparecerá aqui');
  const [carregando, setCarregando] = useState(false);

  async function buscarUserAsync() {
    try {
      setCarregando(true);
      const response = await fetch(`http://localhost:3000/usuario/${id}`);
      const dados = await response.json();

      setNome(dados.nome);
      setProfissao(dados.profissao);
      setCarregando(false);
    } catch (erro) {
      console.log("Erro:", erro);
    }
  }

  return (
    <View style={styles.container}>
      {carregando ? (
        <ActivityIndicator />
      ) : (
        <>
          <Text style={styles.text}>{nome}</Text>
          <Text style={styles.text}>{profissao}</Text>

          <TextInput
            placeholder="Digite o ID (1 ou 2)"
            value={id}
            onChangeText={setId}
            style={styles.input}
          />

          <TouchableOpacity style={styles.button} onPress={buscarUserAsync}>
            <Text style={styles.buttonText}>Buscar usuário</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginBottom: 10,
    fontSize: 16
  },
  input: {
    borderWidth: 1,
    width: '60%',
    marginBottom: 10,
    padding: 5
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5
  },
  buttonText: {
    color: 'white'
  }
});