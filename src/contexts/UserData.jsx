import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
const UserContext = createContext();
import {chooseHaras} from "./ChooseHaras.jsx";
export function UserProvider({ children }) {
    const foto = localStorage.getItem('foto');
    const nome = localStorage.getItem('nome');
    const sobrenome = localStorage.getItem('sobrenome');
    let cargo = localStorage.getItem('userType');
    switch (cargo) {
        case "proprietario":
            cargo = "Proprietário";
            break;
        case "gerente":
            cargo = "Gerente";
            break;
        case "treinador":
            cargo = "Treinador";
            break;
        case "veterinario":
            cargo = "Veterinário";
            break;
        case "tratador":
            cargo = "Tratador";
            break;
        default:
            cargo = '';
    }
    const [haras, escolherHaras] = chooseHaras();

    const [userData, setUserData] = useState({
        foto: foto,
        nome: nome || '',
        sobrenome: sobrenome || '',
        cargo: cargo
    });
    const logout = useCallback(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('foto');
        localStorage.removeItem('nome');
        localStorage.removeItem('sobrenome');
        localStorage.removeItem('userType');
        setUserData({
            foto: null,
            nome: '',
            sobrenome: '',
            cargo: ''
        });
        escolherHaras("")

    }, []);
    const fetchUserData = useCallback(async (token) => {
        try {
            const response = await fetch('http://localhost:3000/api/getUsuarioLogado', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                if (response.status === 401 || response.status === 403) {
                    localStorage.removeItem('token');
                    setUserData({});
                } else {
                    throw new Error(`Erro ao buscar dados do usuário: ${response.status} ${response.statusText}`);
                }
                return null;
            }

            const data = await response.json();
            const foto = data.Foto ? `http://localhost:3000${data.Foto}` : null;
            let cargo;
            switch (data.userType) {
                case "proprietario":
                    cargo = "Proprietário";
                    break;
                case "gerente":
                    cargo = "Gerente";
                    break;
                case "treinador":
                    cargo = "Treinador";
                    break;
                case "veterinario":
                    cargo = "Veterinário";
                    break;
                case "tratador":
                    cargo = "Tratador";
                    break;
                default:
                    cargo = data.userType;
            }
            localStorage.setItem('foto', foto);
            localStorage.setItem('nome', data.Nome);
            localStorage.setItem('sobrenome', data.Sobrenome);
            localStorage.setItem('userType', data.userType);
            const newUserData = {
                foto: foto,
                nome: data.Nome,
                sobrenome: data.Sobrenome,
                email: data.Email,
                telefone: data.Telefone,
                cpf: data.CPF,
                dataNascimento: data.Data_Nascimento,
                cep: data.CEP,
                estado: data.Estado,
                cidade: data.Cidade,
                bairro: data.Bairro,
                logradouro: data.Rua,
                numero: data.Numero,
                complemento: data.Complemento,
                crmv: data.CRMV,
                cargo: cargo
            };
            console.log(newUserData);
            setUserData(newUserData);
            return newUserData;
        } catch (err) {
            console.error("Erro ao buscar dados do usuário:", err);
            localStorage.removeItem('token'); // Limpar token em caso de erro na busca
            setUserData({});
            return null;
        }
    }, []);


    useEffect(() => {
        const token = localStorage.getItem('token');
        fetchUserData(token);
    }, []);

    const updateUserContext = useCallback(async () => {
        const token = localStorage.getItem('token');
        if (token) {
            await fetchUserData(token);
        }
        else {
            setUserData({});
        }
    }, [fetchUserData]);

    return (
        <UserContext.Provider value={[userData, updateUserContext, logout]}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser deve ser usado dentro de um UserProvider');
    }
    return context;
}