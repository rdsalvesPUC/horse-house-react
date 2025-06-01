import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import Input from "./Input.jsx";
import Aviso from "./Aviso.jsx";
import EditModal from "./EditModal.jsx";
import Tabela from "./Tabela.jsx";

export default function ListUsuarios({haras, search}) {
    const [aviso, setAviso] = useState(
        {
            ativo: false,
            mensagem: "",
            titulo: ""
        });
    const [isEditing, setIsEditing] = useState("")
    const [userList, setUserList] = useState([]);
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
            user.Nome.toLowerCase().includes(search.toLowerCase()) ||
            (searchCPF && user.Cpf.includes(searchCPF))
        );
    });
    const handleDelete = (id) => {
        function deletar(id) {
            fetch(`http://localhost:3000/api/haras/${id}`, {
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
        if (haras) {
            updateUsers();
        } else {
            setUserList([])
        }
    }, [haras]);

    function updateUsers() {
        fetch(`http://localhost:3000/api/gerentes/haras/${haras}`, {
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

        fetch(`http://localhost:3000/api/haras/${isEditing}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                nome: formData.Nome,
                cnpj: formData.CNPJ,
                cep: formData.Cep,
                estado: formData.Estado,
                rua: formData.Rua,
                numero: formData.Numero,
                complemento: formData.Complemento
            })
        })
            .then(response => {
                if (response.status === 409) {
                    throw new Error("CNPJ duplicado.");
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
                    mensagem: error.message === "CNPJ duplicado." ? "CNPJ já cadastrado. Por favor, utilize outro." : "Erro ao atualizar o Usuário. Tente novamente mais tarde.",
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

    function formatarCPF(cpf) {
        return cpf.replace(/\D/g, "").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    }

    function formatarTelefone(telefone) {
        if (telefone.length === 11) {
            return telefone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
        }
        if (telefone.length === 10) {
            return telefone.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
        }
        return telefone.replace(/\D/g, "")
            .replace(/^(\d{2})(\d)/, "($1) $2")
            .replace(/(\d{5})(\d)/, "$1-$2")
    }

    function formatarData(data) {
        const date = new Date(data);
        if (!isNaN(date)) {
            const dia = String(date.getDate()).padStart(2, "0");
            const mes = String(date.getMonth() + 1).padStart(2, "0");
            const ano = String(date.getFullYear());
            return `${dia}/${mes}/${ano}`;
        }
        return data;
    }

    return (
        <div className="flex-grow p-6 space-y-6">
            {aviso.ativo && (<Aviso onConfirm={aviso.onConfirm} titulo={aviso.titulo} mensagem={aviso.mensagem} onClose={() => setAviso({ativo: false, mensagem: "", titulo: ""})}/>)}
            <div className="overflow-x-auto bg-tertiary rounded-lg shadow-lg">
                <div id="container-botao" className="flex items-center justify-between mb-6">
                    <Link to="#"
                          className="bg-secondary font-heebo text-base font-bold text-tertiary px-5 py-2 rounded-md transition hover:bg-tertiary hover:text-secondary"> Adicionar
                        Novo Usuário </Link>
                    <select>

                    </select>
                </div>
                <Tabela campos={["Nome","Sobrenome","Email","Telefone","CPF","Nascimento"]}>
                    {filteredUserList.map((user) => {
                        console.log(user);
                        return <tr key={haras.ID} className="border-b border-secondary/20 hover:bg-secondary/10">
                            <td className="p-3">{user.nome}</td>
                            <td className="p-3">{user.sobrenome}</td>
                            <td className="p-3">{user.email}</td>
                            <td className="p-3">{formatarTelefone(user.telefone)}</td>
                            <td className="p-3">{formatarCPF(user.cpf)}</td>
                            <td className="p-3">{formatarData(user.data_nascimento)}</td>


                            <td className="p-3 text-center">
                                <button
                                    onClick={() => handleEdit(user.ID)}
                                    className="bg-secondary text-tertiary px-4 py-2 rounded-md">Editar
                                </button>
                                <button onClick={() => handleDelete(user.ID)} className="bg-red-500 text-white px-4 py-2 rounded-md ml-2">Excluir
                                </button>
                            </td>
                        </tr>
                })}
                </Tabela>
            </div>
            {/* modal edição*/}
            {isEditing && (
                <div id="modal" className="fixed inset-0 bg-black/50 items-center justify-center">
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
                            onchange={(value) => setFormData((prev) => ({...prev, telefone: value.replace(/\D/g, "").slice(0, 11)}))}
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
                </div>)}
        </div>)
}
