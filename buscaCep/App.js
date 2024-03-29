import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import api from "./src/services/api";

const app = () => {
  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [bairro, setBairro] = useState("");
  const [localidade, setLocalidade] = useState("");
  const [uf, setUf] = useState("");

  const buscarCep = async () => {
    if (cep == "") {
      Alert.alert("Nenhum CEP fornecido");
      setCep("");
    }

    try {
      const response = await api.get(`/${cep}/json/`);
      setLogradouro(response.data.logradouro);
      setBairro(response.data.bairro);
      setLocalidade(response.data.localidade);
      setUf(response.data.uf);
    } catch (error) {
      console.log("ERRO: ", error);
    }
  };

  return (
    <View style={styles.safeContainer}>
      <View style={styles.topBar}>
        <Text style={styles.headings}>Buscador de CEP</Text>
      </View>
      <View style={styles.container}>
        <TextInput
          value={cep}
          onChangeText={(text) => setCep(text)}
          placeholder="CEP"
          style={styles.inputField}
        />
        <TouchableOpacity style={styles.button}>
          <Text style={{ fontSize: 20, color: "#ffffff" }} onPress={buscarCep}>
            Buscar
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <TextInput
          value={logradouro}
          onChangeText={(text) => setLogradouro(text)}
          placeholder="Logradouro"
          style={styles.inputField}
        />
      </View>
      <View style={styles.container}>
        <TextInput
          value={bairro}
          onChangeText={(text) => setBairro(text)}
          placeholder="Bairro"
          style={styles.inputField}
        />
      </View>
      <View style={styles.container}>
        <TextInput
          value={localidade}
          onChangeText={(text) => setLocalidade(text)}
          placeholder="Cidade"
          style={styles.inputField}
        />
      </View>
      <View style={styles.container}>
        <TextInput
          value={uf}
          onChangeText={(text) => setUf(text)}
          placeholder="UF"
          style={styles.ufField}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    flexDirection: "column",
  },
  topBar: {
    flexDirection: "row",
    height: 80,
    backgroundColor: "#23648f",
    paddingTop: 10,
  },
  headings: {
    color: "#ffffff",
    fontSize: 25,
    fontWeight: "bold",
    marginHorizontal: 20,
    marginTop: 30,
  },
  container: {
    flexDirection: "row",
    height: 60,
    marginHorizontal: 20,
    marginTop: 20,
  },
  inputField: {
    flex: 2,
    paddingHorizontal: 10,
    backgroundColor: "#f5f5f5",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    fontSize: 20,
  },
  button: {
    flex: 1,
    backgroundColor: "#23648f",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginLeft: 10,
  },
  ufField: {
    width: 100,
    paddingHorizontal: 10,
    backgroundColor: "#f5f5f5",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    fontSize: 20,
  },
});

export default app;
