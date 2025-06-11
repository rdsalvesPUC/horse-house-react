import {useState, useCallback} from "react";

export default function useCep() {
    const [cepValido, setCepValido] = useState({
        cep: false,
        estado: "",
        cidade: "",
        bairro: "",
        logradouro: ""
    });

    const buscarCep = useCallback(async (cepEntrada) => {
        const cep = cepEntrada ? String(cepEntrada).replace(/\D/g, '') : '';

        // Reseta o estado para inválido antes de cada busca, exceto se o CEP for vazio
        if (cep.length === 8) {
            setCepValido({
                cep: false,
                estado: "",
                cidade: "",
                bairro: "",
                logradouro: ""
            });
        } else {
            setCepValido({
                cep: false,
                estado: "",
                cidade: "",
                bairro: "",
                logradouro: ""
            });
            return; // Retorna se o CEP não for válido
        }
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            if (!response.ok) {
                // Lança um erro para ser pego pelo catch
                throw new Error(`Erro na requisição: ${response.status}`);
            }
            const data = await response.json();

            if (!data.erro) {
                setCepValido({
                    cep: true,
                    estado: data.estado || "",
                    cidade: data.localidade || "",
                    bairro: data.bairro || "",
                    logradouro: data.logradouro || ""
                });
            }
        } catch (error) {
            console.error("Erro ao buscar o CEP:", error);
        }

    }, []);

    return [cepValido, buscarCep];
}