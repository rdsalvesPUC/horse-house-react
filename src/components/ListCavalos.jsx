import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import Input from "./Input.jsx";
import Aviso from "./Aviso.jsx";
import EditModal from "./EditModal.jsx";
import Tabela from "./Tabela.jsx";
import {formatarData} from '../utils';
import Select from "./Select.jsx";
import Lista from "./Lista.jsx";

export default function ListCavalos({haras, search}) {
    const [aviso, setAviso] = useState(
        {
            ativo: false,
            mensagem: "",
            titulo: ""
        });
    const [isEditing, setIsEditing] = useState("")
    const [horseList, setHorseList] = useState([]);
    const [formData, setFormData] = useState({
        nome: "",
        sobrenome: "",
        email: "",
        telefone: "",
        cpf: "",
        data_nascimento: ""
    });
    const filteredHorseList = horseList.filter(horse => {
        if (!search) return true; // Se não houver termo de busca, retorna todos os itens
        const searchCPF = search.replace(/\D/g, ""); // Remove caracteres não numéricos
        return (
            horse.Nome.toLowerCase().includes(search.toLowerCase()) ||
            (searchCPF && horse.Cpf.includes(searchCPF))
        );
    });
    const handleDelete = (id) => {
        function deletar(id) {
            fetch(`http://localhost:3000/api/deleteCavalos/${id}`, {
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
            }).then(
                data => {
                    setAviso({
                        ativo: true,
                        mensagem: "Cavalo excluído com sucesso.",
                        titulo: "Sucesso"
                    });
                    updateHorses();
                }).catch(error => {
                console.error("Erro ao excluir o Cavalo:", error);
                setAviso({
                    ativo: true,
                    mensagem: "Erro ao excluir o Cavalo. Tente novamente mais tarde.",
                    titulo: "Erro"
                });
            });
        }

        setAviso({
            ativo: true,
            mensagem: "Tem certeza que deseja excluir este Cavalo?",
            titulo: "Atenção",
            onConfirm: () => {
                deletar(id);
            }
        });
    }
    useEffect(() => {
        if (haras) {
            updateHorses();
        } else {
            setHorseList([])
        }
    }, [haras]);

    function updateHorses() {
        let url = `http://localhost:3000/api/cavalos/haras/${haras}`;
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
                setHorseList(data);
                console.log(data)
            })
            .catch((error) => {
                console.error("Erro ao buscar Cavalos:", error);
                setAviso({
                    ativo: true,
                    mensagem: "Erro ao buscar Cavalos. Tente novamente mais tarde.",
                    titulo: "Erro"
                });
            })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.nome || !formData.pelagem || !formData.peso || !formData.registro || !formData.sangue || !formData.sexo || !formData.situacao || !formData.status || !formData.data_nascimento) {
            setAviso({
                ativo: true,
                mensagem: "Todos os campos são obrigatórios.",
                titulo: "Erro"
            });
            return;
        }
        let url = `http://localhost:3000/api/cavalos/editar/${isEditing || 0}`;

        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                nome: formData.nome,
                pelagem: formData.pelagem,
                peso: formData.peso,
                registro: formData.registro,
                sangue: formData.sangue,
                sexo: formData.sexo,
                situacao: formData.situacao,
                status: formData.status,
                data_nascimento: formData.data_nascimento
            })
        })
            .then(response => {
                if (response.status === 409) {
                    throw new Error("Cavalo já cadastrado.");
                }
                if (!response.ok) {
                    throw new Error(`Erro ${response.status}: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                setAviso({
                    ativo: true,
                    mensagem: "Cavalo atualizado com sucesso.",
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
                updateHorses();
            })
            .catch(error => {
                console.error("Erro ao atualizar o Cavalo:", error);
                setAviso({
                    ativo: true,
                    mensagem: error.message === "Cavalo já cadastrado." ? "Cavalo já cadastrado. Por favor, utilize outro." : "Erro ao atualizar o cavalo. Tente novamente mais tarde.",
                    titulo: "Erro"
                });
            });
        setIsEditing("");
    };
    const handleEdit = (id) => {
        const horse = horseList.find(h => h.ID === id);
        if (horse) {
            let dataNascimento = "";
            if (horse.Data_Nascimento) {
                const date = new Date(horse.Data_Nascimento);
                if (!isNaN(date)) {
                    dataNascimento = date.toISOString().slice(0, 10);
                }
            }
            setFormData({
                nome: horse.Nome || "",
                pelagem: horse.Pelagem || "",
                peso: horse.Peso || "",
                registro: horse.Registro || "",
                sangue: horse.Sangue || "",
                sexo: horse.Sexo || "",
                situacao: horse.Situacao || "",
                status: horse.Status || "",
                data_nascimento: dataNascimento
            });
            setIsEditing(id);
        }
    };

    return (
        <Lista isEditing={isEditing} aviso={aviso} onclose={() => setAviso({ativo: false, mensagem: "", titulo: ""})}
               botaoNovo="Adicionar Novo Cavalo" tabela={
            <Tabela campos={[
                "Nome",
                "Pelagem",
                "Peso",
                "Registro",
                "Sangue",
                "Sexo",
                "Situação",
                "Status",
                "Data de Nascimento"
            ]}>
                {filteredHorseList.map((horse) => (
                    <tr key={horse.ID} className="border-b border-secondary/20 hover:bg-secondary/10">
                        <td className="p-3">{horse.Nome}</td>
                        <td className="p-3">{horse.Pelagem}</td>
                        <td className="p-3">{horse.Peso}</td>
                        <td className="p-3">{horse.Registro}</td>
                        <td className="p-3">{horse.Sangue}</td>
                        <td className="p-3">{horse.Sexo}</td>
                        <td className="p-3">{horse.Situacao}</td>
                        <td className="p-3">{horse.Status}</td>
                        <td className="p-3">{formatarData(horse.Data_Nascimento)}</td>

                        <td className="p-3 text-center space-x-2">
                            <button
                                onClick={() => handleEdit(horse.ID)}
                                className="edit text-blue-600 hover:underline">Editar
                            </button>
                            <button onClick={() => handleDelete(horse.ID)}
                                    className="del  text-red-600  hover:underline">Excluir
                            </button>
                        </td>
                    </tr>))}
            </Tabela>
        }>
            <EditModal
                titulo="Editar Cavalo"
                onCancel={() => setIsEditing("")}
                onSubmit={handleSubmit}
            >
                <Input
                    nome="Nome"
                    placeHolder="Nome do Cavalo"
                    valor={formData.nome}
                    tipo="text"
                    onchange={(value) => setFormData((prev) => ({...prev, nome: value}))}
                    variant="list"
                />
                <Input
                    nome="Pelagem"
                    placeHolder="Pelagem do Cavalo"
                    valor={formData.pelagem}
                    tipo="text"
                    onchange={(value) => setFormData((prev) => ({...prev, pelagem: value}))}
                    variant="list"
                />
                <Input
                    nome="Peso"
                    placeHolder="Peso do Cavalo"
                    valor={formData.peso}
                    tipo="number"
                    onchange={(value) => setFormData((prev) => ({...prev, peso: value}))}
                    variant="list"
                />
                <Input
                    nome="Registro"
                    placeHolder="Registro do Cavalo"
                    valor={formData.registro}
                    tipo="text"
                    onchange={(value) => setFormData((prev) => ({...prev, registro: value}))}
                    variant="list"
                />
                <Input
                    nome="Sangue"
                    placeHolder="Tipo Sanguíneo do Cavalo"
                    valor={formData.sangue}
                    tipo="text"
                    onchange={(value) => setFormData((prev) => ({...prev, sangue: value}))}
                    variant="list"
                />
                <Select
                    nome="Sexo"
                    placeHolder="Sexo do Cavalo"
                    valor={formData.sexo}
                    options={[
                        {value: "Macho", label: "Macho"},
                        {value: "Fêmea", label: "Fêmea"}
                    ]}
                    onchange={(value) => setFormData((prev) => ({...prev, sexo: value}))}
                    variant="list"
                />
                <Input
                    nome="Situação"
                    placeHolder="Situação do Cavalo"
                    valor={formData.situacao}
                    tipo="text"
                    onchange={(value) => setFormData((prev) => ({...prev, situacao: value}))}
                    variant="list"
                />
                <Input
                    nome="Status"
                    placeHolder="Status do Cavalo"
                    valor={formData.status}
                    tipo="text"
                    onchange={(value) => setFormData((prev) => ({...prev, status: value}))}
                    variant="list"
                />
                <Input
                    nome="Data de Nascimento"
                    placeHolder="Data de Nascimento do Cavalo"
                    valor={formData.data_nascimento}
                    tipo="date"
                    onchange={(value) => setFormData((prev) => ({...prev, data_nascimento: value}))}
                    variant="list"
                />
            </EditModal>
        </Lista>)
}
