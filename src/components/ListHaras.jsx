import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import Input from "./Input.jsx";
import Aviso from "./Aviso.jsx";
import EditModal from "./EditModal.jsx";
import Tabela from "./Tabela.jsx";

export default function ListHaras({harasList, updateHaras, search}) {
    const [aviso, setAviso] = useState(
        {
            ativo: false,
            mensagem: "",
            titulo: ""
        });
    const [isEditing, setIsEditing] = useState("")
    const [formData, setFormData] = useState({
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
    const [cepValido, setCepValido] = useState({
        cep: false,
        estado: "",
        cidade: "",
        bairro: "",
        logradouro: ""
    });
    const filteredHarasList = harasList.filter(haras => {
        if (!search) return true; // Se não houver termo de busca, retorna todos os itens
        const searchCNPJ = search.replace(/\D/g, ""); // Remove caracteres não numéricos
        return (
            haras.Nome.toLowerCase().includes(search.toLowerCase()) ||
            (searchCNPJ && haras.CNPJ.includes(searchCNPJ)) ||
            haras.Cidade.toLowerCase().includes(search.toLowerCase())
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
                        mensagem: "Haras excluído com sucesso.",
                        titulo: "Sucesso"
                    });
                    updateHaras();
                }).catch(error => {
                console.error("Erro ao excluir o haras:", error);
                setAviso({
                    ativo: true,
                    mensagem: "Erro ao excluir o haras. Tente novamente mais tarde.",
                    titulo: "Erro"
                });
            });
        }
        setAviso({
            ativo: true,
            mensagem: "Tem certeza que deseja excluir este haras?",
            titulo: "Atenção",
            onConfirm: () => {
                deletar(id);
            }
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.Nome || !formData.CNPJ || !formData.Cep || !formData.Estado || !formData.Cidade || !formData.Bairro || !formData.Rua || !formData.Numero) {
            setAviso({
                ativo: true,
                mensagem: "Todos os campos são obrigatórios.",
                titulo: "Erro"
            });
            return;
        }
        if (!cepValido.cep) {
            setAviso({
                ativo: true,
                mensagem: "CEP inválido. Por favor, verifique o CEP informado.",
                titulo: "Erro"
            });
            return;
        }
        if (!validarCNPJ(formData.CNPJ)) {
            setAviso({
                ativo: true,
                mensagem: "CNPJ inválido. Por favor, verifique o CNPJ informado.",
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
                    mensagem: "Haras atualizado com sucesso.",
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
                updateHaras();
            })
            .catch(error => {
                console.error("Erro ao atualizar o haras:", error);
                setAviso({
                    ativo: true,
                    mensagem: error.message === "CNPJ duplicado." ? "CNPJ já cadastrado. Por favor, utilize outro." : "Erro ao atualizar o haras. Tente novamente mais tarde.",
                    titulo: "Erro"
                });
            });
        setIsEditing("");
    };
    const handleEdit = (id) => {
        const haras = harasList.find(h => h.ID === id);
        if (haras) {
            setFormData({
                Nome: haras.Nome,
                CNPJ: haras.CNPJ,
                Cep: haras.Cep,
                Estado: haras.Estado,
                Cidade: haras.Cidade,
                Bairro: haras.Bairro,
                Rua: haras.Rua,
                Numero: haras.Numero,
                Complemento: haras.Complemento
            });
            setIsEditing(id);
        }
    }

    function formatarCNPJ(cnpj) {
        return cnpj
            .replace(/\D/g, "") // Remove caracteres não numéricos
            .replace(/^(\d{2})(\d)/, "$1.$2") // Adiciona o primeiro ponto
            .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3") // Adiciona o segundo ponto
            .replace(/\.(\d{3})(\d)/, ".$1/$2") // Adiciona a barra
            .replace(/(\d{4})(\d)/, "$1-$2"); // Adiciona o traço
    }

    function formatarCEP(cep) {
        return cep.replace(/\D/g, "").replace(/(\d{5})(\d)/, "$1-$2"); // Formata o CEP
    }
    function validarCNPJ(cnpj) {
        cnpj = cnpj.replace(/\D/g, ""); // Remove caracteres não numéricos

        if (cnpj.length !== 14) return false; // Verifica se o CNPJ tem 14 dígitos

        // Verifica se todos os dígitos são iguais
        if (/^(\d)\1+$/.test(cnpj)) return false;

        // Calcula o primeiro dígito verificador
        let soma = 0;
        let peso = 5;
        for (let i = 0; i < 12; i++) {
            soma += parseInt(cnpj[i], 10) * peso;
            peso = peso === 2 ? 9 : peso - 1;
        }
        let resto = soma % 11;
        let digito1 = resto < 2 ? 0 : 11 - resto;

        // Calcula o segundo dígito verificador
        soma = 0;
        peso = 6;
        for (let i = 0; i < 13; i++) {
            soma += parseInt(cnpj[i], 10) * peso;
            peso = peso === 2 ? 9 : peso - 1;
        }
        resto = soma % 11;
        let digito2 = resto < 2 ? 0 : 11 - resto;

        // Verifica se os dígitos calculados são iguais aos informados
        return digito1 === parseInt(cnpj[12], 10) && digito2 === parseInt(cnpj[13], 10);
    }

    useEffect(() => {
        if (formData.Cep && formData.Cep.length === 8) {
            fetch(`https://viacep.com.br/ws/${formData.Cep}/json/`)
                .then((response) => response.json())
                .then((data) => {

                    if (!data.erro) {
                        const estado = data.uf;
                        const cidade = data.localidade;
                        const bairro = data.bairro;
                        const logradouro = data.logradouro;
                        setCepValido(
                            {
                                cep: true,
                                estado: estado,
                                cidade: cidade,
                                bairro: bairro,
                                logradouro: logradouro
                            }
                        );
                        setFormData((prevState) => ({
                            ...prevState,
                            Rua: data.logradouro,
                            Bairro: data.bairro,
                            Cidade: data.localidade,
                            Estado: data.estado
                        }));
                    } else {
                        setCepValido(
                            {
                                cep: false,
                                estado: "",
                                cidade: "",
                                bairro: "",
                                logradouro: ""
                            }
                        );
                        console.error("CEP inválido");
                    }
                })
                .catch((error) => {
                    setCepValido(
                        {
                            cep: false,
                            estado: "",
                            cidade: "",
                            bairro: "",
                            logradouro: ""
                        }
                    );
                    console.error("Erro ao buscar o CEP:", error);
                })
        } else {
            setCepValido(
                {
                    cep: false,
                    estado: "",
                    cidade: "",
                    bairro: "",
                    logradouro: ""
                }
            );
        }
    }, [formData.Cep]);
    return (
        <div className="flex-grow p-6 space-y-6">
            {aviso.ativo && (<Aviso onConfirm={aviso.onConfirm} titulo={aviso.titulo} mensagem={aviso.mensagem} onClose={() => setAviso({ativo: false, mensagem: "", titulo: ""})}/>)}
            <div className="overflow-x-auto bg-tertiary rounded-lg shadow-lg">
                <div id="container-botao" className="flex items-center justify-between mb-6">
                    <Link to="#"
                       className="bg-secondary font-heebo text-base font-bold text-tertiary px-5 py-2 rounded-md transition hover:bg-tertiary hover:text-secondary"> Adicionar
                        Novo Haras </Link>
                </div>
                <Tabela campos={["Nome", "CNPJ", "CEP", "Estado", "Cidade", "Bairro", "Rua", "Número", "Complemento"]}>
                    {filteredHarasList.map((haras) => (
                        <tr key={haras.ID} className="border-b border-secondary/20 hover:bg-secondary/10">
                            <td className="p-3">{haras.Nome}</td>
                            <td className="p-3">{formatarCNPJ(haras.CNPJ)}</td>
                            <td className="p-3">{formatarCEP(haras.Cep)}</td>
                            <td className="p-3">{haras.Estado}</td>
                            <td className="p-3">{haras.Cidade}</td>
                            <td className="p-3">{haras.Bairro}</td>
                            <td className="p-3">{haras.Rua}</td>
                            <td className="p-3">{haras.Numero}</td>
                            <td className="p-3">{haras.Complemento}</td>
                            <td className="p-3 text-center">
                                <button
                                    onClick={() => handleEdit(haras.ID)}
                                    className="bg-secondary text-tertiary px-4 py-2 rounded-md">Editar
                                </button>
                                <button onClick={() => handleDelete(haras.ID)} className="bg-red-500 text-white px-4 py-2 rounded-md ml-2">Excluir
                                </button>
                            </td>
                        </tr>
                    ))}
                </Tabela>
            </div>

            {/*} modal edição*/}
            {isEditing && (
                <div id="modal" className="fixed inset-0 bg-black/50 items-center justify-center">
                    <EditModal
                        titulo="Editar Haras"
                        onCancel={() => setIsEditing("")}
                        onSubmit={handleSubmit}
                    >
                        <Input
                            nome="Nome"
                            placeHolder="Nome do Haras"
                            valor={formData.Nome}
                            tipo="text"
                            onchange={(value) => setFormData((prev) => ({...prev, Nome: value}))}
                            variant="list"
                        />
                        <Input
                            nome="CNPJ"
                            placeHolder="CNPJ"
                            valor={formatarCNPJ(formData.CNPJ)}
                            tipo="text"
                            onchange={(value) => setFormData((prev) => ({...prev, CNPJ: value.replace(/\D/g, "").slice(0,14)}))}
                            variant="list"
                        />
                        <Input
                            nome="CEP"
                            placeHolder="CEP"
                            valor={formatarCEP(formData.Cep)}
                            tipo="text"
                            onchange={(value) => setFormData((prev) => ({...prev, Cep: value.replace(/\D/g, "").slice(0,8)}))}
                            variant="list"
                        />
                        <Input
                            nome="Estado"
                            placeHolder="Estado"
                            valor={formData.Estado}
                            tipo="text"
                            onchange={(value) => setFormData((prev) => ({...prev, Estado: value}))}
                            variant="list"
                            disabled={cepValido.cep && cepValido.estado}
                        />
                        <Input
                            nome="Cidade"
                            placeHolder="Cidade"
                            valor={formData.Cidade}
                            tipo="text"
                            onchange={(value) => setFormData((prev) => ({...prev, Cidade: value}))}
                            variant="list"
                            disabled={cepValido.cep && cepValido.cidade}
                        />
                        <Input
                            nome="Bairro"
                            placeHolder="Bairro"
                            valor={formData.Bairro}
                            tipo="text"
                            onchange={(value) => setFormData((prev) => ({...prev, Bairro: value}))}
                            variant="list"
                            disabled={cepValido.cep && cepValido.bairro}
                        />
                        <Input
                            nome="Rua"
                            placeHolder="Rua"
                            valor={formData.Rua}
                            tipo="text"
                            onchange={(value) => setFormData((prev) => ({...prev, Rua: value}))}
                            variant="list"
                            disabled={cepValido.cep && cepValido.logradouro}
                        />
                        <Input
                            nome="Número"
                            placeHolder="Número"
                            valor={formData.Numero}
                            tipo="text"
                            onchange={(value) => setFormData((prev) => ({...prev, Numero: value}))}
                            variant="list"
                        />
                        <Input
                            nome="Complemento"
                            placeHolder="Complemento"
                            valor={formData.Complemento}
                            tipo="text"
                            onchange={(value) => setFormData((prev) => ({...prev, Complemento: value}))}
                            variant="list"
                        />
                    </EditModal>
                </div>)}
        </div>)
}
