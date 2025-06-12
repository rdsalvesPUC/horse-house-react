import {useNavigate} from "react-router-dom";
import {useState} from "react";
import ModalCadastro from "./ModalCadastro.jsx";
import Input from "./Input.jsx";
import {
    formatarCPF,
    formatarTelefone,
    validarCPF,
    validarEmail,
    validarNome,
    validarSenha,
    validarTelefone
} from "../utils.js";
import InputSenha from "./InputSenha.jsx";
import Select from "./Select.jsx";
import Aviso from "./Aviso.jsx";
import {useUser} from "../contexts/UserData.jsx";

export default function CadastrarUsuarios({haras, userType}) {
    const [formData, setFormData] = useState({
        nome: "",
        sobrenome: "",
        email: "",
        senha: "",
        telefone: "",
        cpf: "",
        dataNascimento: "",
        tipoUsuario: "",
        crmv: ""
    })
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
        const data = {
            nome: formData.nome.trim(),
            sobrenome: formData.sobrenome.trim(),
            email: formData.email.trim(),
            senha: formData.senha.trim(),
            telefone: formData.telefone,
            cpf: formData.cpf,
            dataNascimento: formData.dataNascimento,
            crmv: formData.tipoUsuario === "veterinario" ? formData.crmv.trim() : "",
            haras_id: haras
        };
        let url;
        switch (formData.tipoUsuario) {
            case "gerente":
                url = "http://localhost:3000/api/criarGerente";
                break;
            case "treinador":
                url = "http://localhost:3000/api/treinador";
                break;
            case "tratador":
                url = "http://localhost:3000/api/tratador";
                break;
            case "veterinario":
                url = "http://localhost:3000/api/veterinario";
                break;
            default:
                setAviso({
                    ativo: true,
                    mensagem: "Tipo de usuário inválido.",
                    titulo: "Erro no Cadastro"
                });
                return;
        }
        if (!validarNome(formData.nome) || !validarNome(formData.sobrenome) || !validarEmail(formData.email) || !validarSenha(formData.senha, formData.senha) || !validarTelefone(formData.telefone) || !validarCPF(formData.cpf) || !formData.dataNascimento || (formData.tipoUsuario === "veterinario" && !formData.crmv)) {
            setAviso({
                ativo: true,
                mensagem: "Por favor, preencha todos os campos corretamente.",
                titulo: "Erro no Cadastro"
            });
            return;
        }
        if (userType === "Proprietário" && !haras) {
            setAviso({
                ativo: true,
                mensagem: "Por favor, selecione um Haras antes de cadastrar usuários.",
                titulo: "Erro no Cadastro"
            });
            return;
        }
        fetch(url, {
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
                    throw new Error("Usuário já cadastrado");
                });
            } else {
                throw new Error("Erro ao cadastrar usuário");
            }
        }).then((data) => {
            setAviso({
                ativo: true,
                mensagem: "Usuário cadastrado com sucesso!",
                titulo: "Cadastro Concluído",
                onConfirm: () => {
                    navigate("/usuarios")
                }
            });
        }).catch((error) => {
            if (error.message === "Usuário já cadastrado") {
                setAviso({
                    ativo: true,
                    mensagem: "Usuário já cadastrado. Por favor, verifique os dados e tente novamente.",
                    titulo: "Erro no Cadastro"
                });
            } else {
                setAviso({
                    ativo: true,
                    mensagem: "Erro ao cadastrar usuário. Por favor, tente novamente mais tarde.",
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
            <ModalCadastro link="/usuarios" handleSubmit={handleSubmit} titulo="Cadastro de Usuários"
                           subtitulo="Cadastre todos os tipos de funcionários no seu Haras">
                <Input nome="Nome"
                       erro={!validarNome(formData.nome)}
                       textoErro="O Nome é obrigatório."
                       placeHolder="Digite seu nome"
                       valor={formData.nome}
                       tipo="text"
                       onchange={(value) => setFormData({...formData, nome: value})}
                       variant="register"/>
                <Input nome="Sobrenome"
                       erro={!validarNome(formData.sobrenome)}
                       textoErro="O Sobrenome é obrigatório."
                       placeHolder="Digite seu sobrenome"
                       valor={formData.sobrenome}
                       tipo="text"
                       onchange={(value) => setFormData({...formData, sobrenome: value})}
                       variant="register"/>
                <Input nome="Email"
                       erro={!validarEmail(formData.email)}
                       textoErro="O Email é obrigatório."
                       placeHolder="Digite seu email"
                       valor={formData.email}
                       tipo="text"
                       onchange={(value) => setFormData({...formData, email: value})}
                       variant="register"/>
                <InputSenha nome="Senha"
                            textoErro="A Senha é obrigatória."
                            placeHolder="Digite sua senha"
                            valor={formData.senha}
                            onchange={(value) => setFormData({...formData, senha: value})}
                            passwordRequirements={true}
                            variant="usuario"
                />
                <Input nome="Telefone"
                       erro={!validarTelefone(formData.telefone)}
                       textoErro="O Telefone é obrigatório."
                       placeHolder="Digite seu telefone"
                       valor={formatarTelefone(formData.telefone)}
                       tipo="text"
                       onchange={(value) => setFormData({...formData, telefone: value.replace(/\D/g, '').slice(0, 11)})}
                       variant="register"/>

                <Input nome="CPF"
                       erro={!validarCPF(formData.cpf)}
                       textoErro="O CPF é obrigatório."
                       placeHolder="Digite seu CPF"
                       valor={formatarCPF(formData.cpf)}
                       tipo="text"
                       onchange={(value) => setFormData({...formData, cpf: value.replace(/\D/g, '').slice(0, 11)})}
                       variant="register"/>
                <Input nome="Data de Nascimento"
                       erro={!formData.dataNascimento}
                       textoErro="A Data de Nascimento é obrigatória."
                       placeHolder="Selecione sua data de nascimento"
                       valor={formData.dataNascimento}
                       tipo="date"
                       onchange={(value) => setFormData({...formData, dataNascimento: value})}
                       variant="register"/>

                <Select nome="Tipo de Usuário"
                        erro={!formData.tipoUsuario}
                        textoErro="Selecione um Tipo de Usuário."
                        valor={formData.tipoUsuario}
                        onchange={(value) => {
                            setFormData({...formData, tipoUsuario: value});
                        }}
                        placeHolder="Selecione"
                        options={[
                            ...(userType === "Proprietário" ? [{value: "gerente", label: "Gerente"}] : []),
                            {value: "veterinario", label: "Veterinário"},
                            {value: "tratador", label: "Tratador"},
                            {value: "treinador", label: "Treinador"}
                        ]}
                        required={true}
                        variant="register"
                />
                {formData.tipoUsuario === "veterinario" && (
                    <Input nome="CRMV"
                           textoErro="O CRMV é obrigatório."
                           placeHolder="Digite o CRMV"
                           valor={formData.crmv}
                           onchange={(value) => setFormData({...formData, crmv: value})}
                           variant="register"/>
                )}
            </ModalCadastro>
        </>
    );
}