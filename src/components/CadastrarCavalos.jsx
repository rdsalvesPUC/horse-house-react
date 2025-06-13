import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
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
import Select from "./Select.jsx";

export default function CadastrarCavalos({haras, userType}) {

    const [formData, setFormData] = useState({
        nome: "",
        pelagem: "",
        peso: "",
        registro: "",
        cert: "",
        sangue: "",
        sexo: "",
        situacao: "",
        status: "",
        importado: "",
        dataNascimento: ""
    });
    const [aviso, setAviso] = useState(
        {
            ativo: false,
            mensagem: "",
            titulo: ""
        });
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const TOKEN = localStorage.getItem('token');
        const harasId = haras;
        if (userType === "Proprietário" && !harasId) {
            setAviso({
                ativo: true,
                mensagem: "Por favor, selecione um Haras antes de cadastrar um Cavalo.",
                titulo: "Haras Não Selecionado"
            });
            return;
        }
        const data = {
            nome: formData.nome.trim(),
            pelagem: formData.pelagem.trim(),
            peso: formData.peso.trim(),
            registro: formData.registro.trim(),
            cert: formData.cert.trim(),
            sangue: formData.sangue,
            sexo: formData.sexo,
            situacao: formData.situacao.trim(),
            status: formData.status.trim(),
            imp: formData.importado,
            dataNascimento: formData.dataNascimento,
            harasId: harasId
        };

        if (!validarNome(data.nome) || !data.pelagem || !data.peso || isNaN(data.peso) || !data.registro || !data.cert || !data.sangue || !data.sexo || !data.situacao || !data.status || data.importado === "" || !data.dataNascimento) {
            setAviso({
                ativo: true,
                mensagem: "Por favor, preencha todos os campos corretamente.",
                titulo: "Erro no Cadastro"
            });
            return;
        }
        fetch("http://localhost:3000/api/cavalos/criar", {
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
                    throw new Error("Cavalo já cadastrado");
                });
            } else {
                throw new Error("Erro ao cadastrar cavalo");
            }
        }).then((data) => {
            setAviso({
                ativo: true,
                mensagem: "Cavalo cadastrado com sucesso!",
                titulo: "Cadastro Concluído",
                onConfirm: () => {
                    navigate("/cavalos")
                }
            });
        }).catch((error) => {
            if (error.message === "Cavalo já cadastrado") {
                setAviso({
                    ativo: true,
                    mensagem: "Cavalo já cadastrado. Por favor, verifique os dados e tente novamente.",
                    titulo: "Erro no Cadastro"
                });
            } else {
                setAviso({
                    ativo: true,
                    mensagem: "Erro ao cadastrar Cavalo. Por favor, tente novamente mais tarde.",
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
            <ModalCadastro link="/cavalos" handleSubmit={handleSubmit} titulo="Cadastro de Cavalos"
                           subtitulo="Cadastre o seu novo Cavalo">
                <Input nome="Nome"
                       erro={!validarNome(formData.nome)}
                       textoErro="O Nome é obrigatório."
                       placeHolder="Digite seu nome"
                       valor={formData.nome}
                       tipo="text"
                       onchange={(value) => setFormData({...formData, nome: value})}
                       variant="register"/>
                <Input nome="Pelagem"
                       erro={!formData.pelagem}
                       textoErro="A Pelagem é obrigatória."
                       placeHolder="Digite a pelagem do cavalo"
                       valor={formData.pelagem}
                       tipo="text"
                       onchange={(value) => setFormData({...formData, pelagem: value})}
                       variant="register"/>
                <Input nome="Peso"
                       erro={!formData.peso || isNaN(formData.peso)}
                       textoErro="O Peso é obrigatório e deve ser um número."
                       placeHolder="Digite o peso do cavalo"
                       valor={formData.peso}
                       tipo="number"
                       onchange={(value) => setFormData({...formData, peso: value})}
                       variant="register"/>
                <Input nome="Registro"
                       erro={!formData.registro}
                       textoErro="O Registro é obrigatório."
                       placeHolder="Digite o registro do cavalo"
                       valor={formData.registro}
                       tipo="text"
                       onchange={(value) => setFormData({...formData, registro: value})}
                       variant="register"/>
                <Input nome="Certificado"
                          erro={!formData.cert}
                            textoErro="O Certificado é obrigatório."
                            placeHolder="Digite o certificado do cavalo"
                            valor={formData.cert}
                            tipo="text"
                            onchange={(value) => setFormData({...formData, cert: value})}
                            variant="register"/>
                <Select nome="Sangue"
                        erro={!formData.sangue}
                        textoErro="O Sangue é obrigatório."
                        valor={formData.sangue}
                        onchange={(value) => setFormData({...formData, sangue: value})}
                        placeHolder="Selecione o sangue do cavalo"
                        required={true}
                        options={[
                            {value: "A", label: "A"},
                            {value: "C", label: "C"},
                            {value: "D", label: "D"},
                            {value: "K", label: "K"},
                            {value: "P", label: "P"},
                            {value: "Q", label: "Q"},
                            {value: "U", label: "U"},
                            {value: "T", label: "T"}
                        ]}
                        variant="register"/>
                <Select nome="Sexo"
                        erro={!formData.sexo}
                        textoErro="O Sexo é obrigatório."
                        valor={formData.sexo}
                        onchange={(value) => setFormData({...formData, sexo: value})}
                        placeHolder="Selecione o sexo do cavalo"
                        required={true}
                        options={[
                            {value: "Macho", label: "Macho"},
                            {value: "Fêmea", label: "Fêmea"}
                        ]}
                        variant="register"/>
                <Input nome="Situação"
                       erro={!formData.situacao}
                       textoErro="A Situação é obrigatória."
                       placeHolder="Digite a situação do cavalo"
                       valor={formData.situacao}
                       tipo="text"
                       onchange={(value) => setFormData({...formData, situacao: value})}
                       variant="register"/>
                <Input nome="Status"
                       erro={!formData.status}
                       textoErro="O Status é obrigatório."
                       placeHolder="Digite o status do cavalo"
                       valor={formData.status}
                       tipo="text"
                       onchange={(value) => setFormData({...formData, status: value})}
                       variant="register"/>
                <Select nome="Importado"
                        erro={!formData.importado}
                        textoErro="O campo Importado é obrigatório."
                        valor={formData.importado}
                        onchange={(value) => setFormData({...formData, importado: value})}
                        placeHolder="Selecione se o cavalo é importado"
                        required={true}
                        options={[
                            {value: 1, label: "Sim"},
                            {value: 0, label: "Não"}
                        ]}
                        variant="register"/>
                <Input nome="Data de Nascimento"
                       erro={!formData.dataNascimento}
                       textoErro="A Data de Nascimento é obrigatória."
                       placeHolder="Selecione a data de nascimento do cavalo"
                       valor={formData.dataNascimento}
                       tipo="date"
                       onchange={(value) => setFormData({...formData, dataNascimento: value})}
                       variant="register"/>


            </ModalCadastro>
        </>
    );
}