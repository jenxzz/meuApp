import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [id, setId] = useState('');
  const [nome, setNome] = useState('Nome do jogo');
  const [categoria, setCategoria] = useState('Categoria do jogo');
  const [ano_lancamento, setAno_lancamento] = useState('Ano de lançamento do jogo'); 
  const [carregando, setCarregando] = useState(false);

  async function buscarUserAsync() {206363
    try {
      setCarregando(true);

      const response = await fetch(`https://api-jogos-wq4x.onrender.com/api/jogos/id/${id}`);
      const dados = await response.json();

      setNome(dados.nome);
      setCategoria(dados.categoria);
      setAno_lancamento(dados.ano_lancamento)

      setCarregando(false);
    } catch (erro) {
      console.log("Erro:", erro);
      setCarregando(false);
    }
  }

  return (
    <View style={styles.container}>
      {carregando ? (
        <ActivityIndicator />
      ) : (
        <>
          <Text style={styles.text}>{nome}</Text>
          <Text style={styles.text}>{categoria}</Text>
          <Text style={styles.text}>{ano_lancamento}</Text>

          <TextInput
            placeholder="Digite o ID"
            value={id}
            onChangeText={setId}
            style={styles.input}
          />

          <TouchableOpacity style={styles.button} onPress={buscarUserAsync}>
            <Text style={styles.buttonText}>Buscar jogos</Text>
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
    backgroundColor: 'purple',
    padding: 10,
    borderRadius: 5
  },
  buttonText: {
    color: 'white'
  }
});