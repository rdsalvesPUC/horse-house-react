import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import Input from "./Input.jsx";
import Aviso from "./Aviso.jsx";
import EditModal from "./EditModal.jsx";
import Tabela from "./Tabela.jsx";
import {
    formatarCPF,
    formatarTelefone,
    formatarData,
    validarEmail,
    validarCPF,
    validarTelefone
} from '../utils';
import Select from "./Select.jsx";
import Lista from "./Lista.jsx";
import Botao from "./Botao.jsx";

export default function ListUsuarios({haras, search}) {
    const [aviso, setAviso] = useState(
        {
            ativo: false,
            mensagem: "",
            titulo: ""
        });
    const [isEditing, setIsEditing] = useState("")
    const [userList, setUserList] = useState([]);
    const [tipo, setTipo] = useState("")
    const [formData, setFormData] = useState({
        nome: "",
        sobrenome: "",
        email: "",
        telefone: "",
        cpf: "",
        data_nascimento: ""
    });
    const filteredUserList = userList.filter(user => {
        if (!search) return true; // Se não houver termo de busca, retorna todos os itens
        const searchCPF = search.replace(/\D/g, ""); // Remove caracteres não numéricos
        return (
            user.nome.toLowerCase().includes(search.toLowerCase()) ||
            user.sobrenome.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase()) ||
            (searchCPF && user.Cpf.includes(searchCPF))
        );
    });
    const handleDelete = (id) => {
        function deletar(id) {
            fetch(`http://localhost:3000/api/deletarFuncionario/${tipo}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }).then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error(`Erro ${res.status}: ${res.statusText}`);
                }
            }).then(data => {
                setAviso({
                    ativo: true,
                    mensagem: "Usuário excluído com sucesso.",
                    titulo: "Sucesso"
                });
                updateUsers();
            }).catch(error => {
                console.error("Erro ao excluir o Usuário:", error);
                setAviso({
                    ativo: true,
                    mensagem: "Erro ao excluir o Usuário. Tente novamente mais tarde.",
                    titulo: "Erro"
                });
            });
        }

        setAviso({
            ativo: true,
            mensagem: "Tem certeza que deseja excluir este Usuário?",
            titulo: "Atenção",
            onConfirm: () => {
                deletar(id);
            }
        });
    }
    useEffect(() => {
        if (haras && tipo) {
            updateUsers();
        } else {
            setUserList([])
        }
    }, [haras, tipo]);

    function updateUsers() {
        let url;
        if (tipo === "gerente") {
            url = `http://localhost:3000/api/gerentes/haras/${haras}`;
        } else if (tipo === "veterinario") {
            url = `http://localhost:3000/api/veterinarios/haras/${haras}`;
        } else if (tipo === "treinador") {
            url = `http://localhost:3000/api/treinadores/haras/${haras}`;
        } else if (tipo === "tratador") {
            url = `http://localhost:3000/api/tratadores/haras/${haras}`;
        } else {
            setUserList([]);
            return;
        }

        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Erro ${response.status}: ${response.statusText}`);
                }
                return response.json();
            })
            .then((data) => {
                setUserList(data);
            })
            .catch((error) => {
                console.error("Erro ao buscar usuários:", error);
                setAviso({
                    ativo: true,
                    mensagem: "Erro ao buscar usuários. Tente novamente mais tarde.",
                    titulo: "Erro"
                });
            })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.nome || !formData.sobrenome || !formData.email || !formData.telefone || !formData.cpf || !formData.data_nascimento) {
            setAviso({
                ativo: true,
                mensagem: "Todos os campos são obrigatórios.",
                titulo: "Erro"
            });
            return;
        }
        if (!validarEmail(formData.email)) {
            setAviso({
                ativo: true,
                mensagem: "Email inválido.",
                titulo: "Erro"
            });
            return;
        }
        if (!validarCPF(formData.cpf)) {
            setAviso({
                ativo: true,
                mensagem: "CPF inválido.",
                titulo: "Erro"
            });
            return;
        }
        if (!validarTelefone(formData.telefone)) {
            setAviso({
                ativo: true,
                mensagem: "Telefone inválido.",
                titulo: "Erro"
            });
            return;
        }
        let url;
        if (tipo === "gerente") {
            url = `http://localhost:3000/api/gerente/${isEditing}`;
        } else if (tipo === "veterinario") {
            url = `http://localhost:3000/api/veterinario/${isEditing}`;
        } else if (tipo === "treinador") {
            url = `http://localhost:3000/api/treinador/${isEditing}`;
        } else if (tipo === "tratador") {
            url = `http://localhost:3000/api/tratador/${isEditing}`;
        } else {
            setAviso({
                ativo: true,
                mensagem: "Tipo de usuário inválido.",
                titulo: "Erro"
            });
            return;
        }
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                nome: formData.nome,
                sobrenome: formData.sobrenome,
                email: formData.email,
                telefone: formData.telefone,
                cpf: formData.cpf,
                dataNascimento: formData.data_nascimento
            })
        })
            .then(response => {
                if (response.status === 409) {
                    throw new Error("CPF ou Email duplicado.");
                }
                if (!response.ok) {
                    throw new Error(`Erro ${response.status}: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                setAviso({
                    ativo: true,
                    mensagem: "Usuário atualizado com sucesso.",
                    titulo: "Sucesso"
                });
                setFormData({
                    Nome: "",
                    CNPJ: "",
                    Cep: "",
                    Estado: "",
                    Cidade: "",
                    Bairro: "",
                    Rua: "",
                    Numero: "",
                    Complemento: ""
                });
                updateUsers();
            })
            .catch(error => {
                console.error("Erro ao atualizar o Usuário:", error);
                setAviso({
                    ativo: true,
                    mensagem: error.message === "CPF ou Email duplicado." ? "CPF ou Email já cadastrado. Por favor, utilize outro." : "Erro ao atualizar o Usuário. Tente novamente mais tarde.",
                    titulo: "Erro"
                });
            });
        setIsEditing("");
    };
    const handleEdit = (id) => {
        const user = userList.find(u => u.ID === id);
        if (user) {
            let dataNascimento = "";
            if (user.data_nascimento) {
                const date = new Date(user.data_nascimento);
                if (!isNaN(date)) {
                    dataNascimento = date.toISOString().slice(0, 10);
                }
            }
            setFormData({
                nome: user.nome,
                sobrenome: user.sobrenome,
                email: user.email,
                telefone: user.telefone,
                cpf: user.cpf,
                data_nascimento: dataNascimento
            });
            setIsEditing(id);
        }
    }

    return (
        <Lista link="/cadastrar-usuario" botaoNovo="Adicionar Novo Usuário" isEditing={isEditing} aviso={aviso}
               onclose={() => setAviso({ativo: false, mensagem: "", titulo: ""})}
               selectTipo={
                   <Select
                       onchange={(valor) => {
                           setTipo(valor)
                       }}
                       options={[
                           {value: "gerente", label: "Gerente"},
                           {value: "veterinario", label: "Veterinário"},
                           {value: "treinador", label: "Treinador"},
                           {value: "tratador", label: "Tratador"}
                       ]}
                       placeHolder="Tipo de Usuário"
                       valor={tipo}
                       nome="tipo-usuario"
                       variant="topbar"
                   />
               }
               tabela={
                   <Tabela
                       campos={[
                           "Nome",
                           "Sobrenome",
                           "Email",
                           "Telefone",
                           "CPF",
                           ...(tipo === "veterinario" ? ["CRMV"] : []),
                           "Nascimento",
                       ]}>
                       {filteredUserList.map((user) => {
                           console.log(user);
                           return <tr key={haras.ID} className="border-b border-secondary/20 hover:bg-secondary/10">
                               <td className="p-3">{user.nome}</td>
                               <td className="p-3">{user.sobrenome}</td>
                               <td className="p-3">{user.email}</td>
                               <td className="p-3">{formatarTelefone(user.telefone)}</td>
                               <td className="p-3">{formatarCPF(user.cpf)}</td>
                               {tipo === "veterinario" && <td className="p-3">{user.crmv}</td>}
                               <td className="p-3">{formatarData(user.data_nascimento)}</td>


                               <td className="p-3 text-center space-x-2">
                                   <Botao variant="edit" onClick={() => handleEdit(user.ID)}>
                                       Editar
                                   </Botao>
                                   <Botao variant="delete" onClick={() => handleDelete(user.ID)}>
                                       Excluir
                                   </Botao>
                               </td>
                           </tr>
                       })}
                   </Tabela>
               }>
            <EditModal
                titulo="Editar Usuário"
                onCancel={() => setIsEditing("")}
                onSubmit={handleSubmit}
            >
                <Input
                    nome="Nome"
                    placeHolder="Nome do Usuário"
                    valor={formData.nome}
                    tipo="text"
                    onchange={(value) => setFormData((prev) => ({...prev, nome: value}))}
                    variant="list"
                />
                <Input
                    nome="Sobrenome"
                    placeHolder="Sobrenome do Usuário"
                    valor={formData.sobrenome}
                    tipo="text"
                    onchange={(value) => setFormData((prev) => ({...prev, sobrenome: value}))}
                    variant="list"
                />
                <Input
                    nome="Email"
                    placeHolder="Email do Usuário"
                    valor={formData.email}
                    tipo="email"
                    onchange={(value) => setFormData((prev) => ({...prev, email: value}))}
                    variant="list"
                />
                <Input
                    nome="Telefone"
                    placeHolder="Telefone do Usuário"
                    valor={formatarTelefone(formData.telefone)}
                    tipo="text"
                    onchange={(value) => setFormData((prev) => ({
                        ...prev,
                        telefone: value.replace(/\D/g, "").slice(0, 11)
                    }))}
                    variant="list"
                />
                <Input
                    nome="CPF"
                    placeHolder="CPF do Usuário"
                    valor={formatarCPF(formData.cpf)}
                    tipo="text"
                    onchange={(value) => setFormData((prev) => ({...prev, cpf: value.replace(/\D/g, "").slice(0, 11)}))}
                    variant="list"
                />
                <Input
                    nome="Data de Nascimento"
                    placeHolder="Data de Nascimento do Usuário"
                    valor={formData.data_nascimento}
                    tipo="date"
                    onchange={(value) => setFormData((prev) => ({...prev, data_nascimento: value}))}
                    variant="list"
                />
            </EditModal>
        </Lista>)
}
