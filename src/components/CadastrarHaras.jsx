import {useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import ModalCadastro from "./ModalCadastro.jsx";
import Input from "./Input.jsx";
import {
    formatarCEP,
    formatarCNPJ,
    validarCNPJ,
    validarCPF,
    validarEmail,
    validarNome,
    validarSenha,
    validarTelefone
} from "../utils.js";
import Aviso from "./Aviso.jsx";
import useCep from "../hooks/useCep.jsx";

export default function CadastrarHaras({}) {
    const [formData, setFormData] = useState({
        nome: "",
        cnpj: "",
        cep: "",
        estado: "",
        cidade: "",
        bairro: "",
        rua: "",
        numero: "",
        complemento: ""
    });
    const [aviso, setAviso] = useState(
        {
            ativo: false,
            mensagem: "",
            titulo: ""
        });
    const [cepValido, buscarCep] = useCep();
    const navigate = useNavigate();

    useEffect(() => {
        if (formData.cep.length === 8) {
            buscarCep(formData.cep)
        }
    }, [formData.cep, buscarCep]);
    useEffect(() => {
        if (cepValido.cep) {
            setFormData({
                ...formData,
                estado: cepValido.estado,
                cidade: cepValido.cidade,
                bairro: cepValido.bairro,
                rua: cepValido.logradouro
            });
        }
    }, [cepValido]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const TOKEN = localStorage.getItem('token');
        const data = {
            nome: formData.nome.trim(),
            cnpj: formData.cnpj.replace(/\D/g, ''),
            cep: formData.cep.replace(/\D/g, ''),
            estado: formData.estado.trim(),
            cidade: formData.cidade.trim(),
            bairro: formData.bairro.trim(),
            rua: formData.rua.trim(),
            numero: formData.numero.trim(),
            complemento: formData.complemento.trim()
        };

        if (!validarNome(formData.nome) || !cepValido.cep || !validarCNPJ(formData.cnpj) || !formData.estado || !formData.cidade || !formData.bairro || !formData.rua || !formData.numero){
            setAviso({
                ativo: true,
                mensagem: "Por favor, preencha todos os campos corretamente.",
                titulo: "Erro no Cadastro"
            });
            return;
        }
        fetch("http://localhost:3000/api/criarHaras", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${TOKEN}`,
            },
            body: JSON.stringify(data)
        }).then((response) => {
            if (response.ok) {
                return response.json();
            } else if (response.status === 409) {
                return response.json().then((data) => {
                    throw new Error("Haras já cadastrado");
                });
            } else {
                throw new Error("Erro ao cadastrar Haras");
            }
        }).then((data) => {
            setAviso({
                ativo: true,
                mensagem: "Haras cadastrado com sucesso!",
                titulo: "Cadastro Concluído",
                onConfirm: () => {
                    navigate("/haras")
                }
            });
        }).catch((error) => {
            if (error.message === "Haras já cadastrado") {
                setAviso({
                    ativo: true,
                    mensagem: "Haras já cadastrado. Por favor, verifique os dados e tente novamente.",
                    titulo: "Erro no Cadastro"
                });
            } else {
                setAviso({
                    ativo: true,
                    mensagem: "Erro ao cadastrar Haras. Por favor, tente novamente mais tarde.",
                    titulo: "Erro no Cadastro"
                });
            }
        });
    }
    return (
        <>
            {aviso.ativo && (
                <Aviso mensagem={aviso.mensagem} titulo={aviso.titulo}
                       onClose={() => {
                           setAviso({ativo: false, titulo: "", mensagem: ""});
                           if (aviso.onConfirm) {
                               aviso.onConfirm();
                           }
                       }}
                />)}
            <ModalCadastro link="/haras" handleSubmit={handleSubmit} titulo="Cadastro de Haras"
                           subtitulo="Cadastre o seu novo Haras">
                <Input nome="Nome"
                       erro={!validarNome(formData.nome)}
                       textoErro="O Nome é obrigatório."
                       placeHolder="Digite seu nome"
                       valor={formData.nome}
                       tipo="text"
                       onchange={(value) => setFormData({...formData, nome: value})}
                       variant="register"/>
                <Input nome="CNPJ"
                       erro={!validarCNPJ(formData.cnpj)}
                       textoErro="Insira um CNPJ válido."
                       placeHolder="Digite o CNPJ do Haras"
                       valor={formatarCNPJ(formData.cnpj)}
                       tipo="text"
                       onchange={(value) => setFormData({...formData, cnpj: value.replace(/\D/g, '').slice(0, 14)})}
                       variant="register"/>
                <Input nome="CEP"
                       erro={!cepValido.cep}
                       textoErro="Insira um cep válido."
                       placeHolder="Digite o CEP do Haras"
                       valor={formatarCEP(formData.cep)}
                       tipo="text"
                       onchange={(value) => setFormData({...formData, cep: value.replace(/\D/g, '').slice(0, 8)})}
                       variant="register"/>
                <Input nome="Estado"
                       erro={!cepValido.cep || !formData.estado}
                       textoErro="O Estado é obrigatório."
                       placeHolder="Digite o Estado do Haras"
                       valor={formData.estado}
                       disabled={cepValido.cep && cepValido.estado}
                       tipo="text"
                       onchange={(value) => setFormData({...formData, estado: value})}
                       variant="register"/>
                <Input nome="Cidade"
                       erro={!cepValido.cep || !formData.cidade}
                       textoErro="A Cidade é obrigatória."
                       placeHolder="Digite a Cidade do Haras"
                       valor={formData.cidade}
                       disabled={cepValido.cep && cepValido.cidade}
                       tipo="text"
                       onchange={(value) => setFormData({...formData, cidade: value})}
                       variant="register"/>
                <Input nome="Bairro"
                       erro={!cepValido.cep || !formData.bairro}
                       textoErro="A Bairro é obrigatório."
                       placeHolder="Digite o Bairro do Haras"
                       valor={formData.bairro}
                          disabled={cepValido.cep && cepValido.bairro}
                       tipo="text"
                       onchange={(value) => setFormData({...formData, bairro: value})}
                       variant="register"/>
                <Input nome="Rua"
                       erro={!cepValido.cep || !formData.rua}
                       textoErro="A Rua é obrigatória."
                       placeHolder="Digite a Rua do Haras"
                       valor={formData.rua}
                       disabled={cepValido.cep && cepValido.logradouro}
                       tipo="text"
                       onchange={(value) => setFormData({...formData, rua: value})}
                       variant="register"/>
                <Input nome="Número"
                       erro={!formData.numero}
                       textoErro="O Número é obrigatório."
                       placeHolder="Digite o Número do Haras"
                       valor={formData.numero}
                       tipo="text"
                       onchange={(value) => setFormData({...formData, numero: value.replace(/\D/g, '')})}
                       variant="register"/>
                <Input nome="Complemento"
                       placeHolder="Digite o Complemento do Haras (opcional)"
                       valor={formData.complemento}
                       tipo="text"
                       onchange={(value) => setFormData({...formData, complemento: value})}
                       variant="register"/>
            </ModalCadastro>
        </>
    );
}