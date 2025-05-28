import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import Input from "./Input.jsx";
import Aviso from "./Aviso.jsx";

export default function ListHaras({harasList}) {
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
    const handleSubmit = (e) => {
        e.preventDefault();
        // Aqui você pode adicionar a lógica para enviar os dados do formulário
        setIsEditing("");
    }
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
        return cnpj.replace(/\D/g, "")
            .replace(/^(\d{2})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d{1,2})$/, "$1/$2")
            .replace(/(\d{2})$/, "-$1");
    }

    function formatarCEP(cep) {
        return cep.replace(/\D/g, "").replace(/(\d{5})(\d)/, "$1-$2"); // Formata o CEP
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
            {aviso.ativo && (<Aviso titulo={aviso.titulo} mensagem={aviso.mensagem} onClose={() => setAviso({ativo: false, mensagem: "", titulo: ""})}/>)}
            <div className="overflow-x-auto bg-tertiary rounded-lg shadow-lg">
                <div id="container-botao" className="flex items-center justify-between mb-6">
                    {/*<select id="select-haras" class="bg-tertiary w-55 p-3 rounded-md border border-secondary"></select>*/}
                    <Link to="#"
                       className="bg-secondary font-heebo text-base font-bold text-tertiary px-5 py-2 rounded-md transition hover:bg-tertiary hover:text-secondary"> Adicionar
                        Novo Haras </Link>
                </div>
                <table className="w-full border-collapse text-sm">
                    <thead className="bg-secondary text-tertiary">
                    <tr>
                        <th className="p-3 text-left">Nome</th>
                        <th className="p-3 text-left">CNPJ</th>
                        <th className="p-3 text-left">CEP</th>
                        <th className="p-3 text-left">Estado</th>
                        <th className="p-3 text-left">Cidade</th>
                        <th className="p-3 text-left">Bairro</th>
                        <th className="p-3 text-left">Rua</th>
                        <th className="p-3 text-left">Número</th>
                        <th className="p-3 text-left">Complemento</th>
                        <th className="p-3 text-center">Ações</th>
                    </tr>
                    </thead>
                    <tbody id="tbody-haras">
                    {harasList.map((haras) => (
                        <tr key={haras.ID} className="border-b border-secondary/20 hover:bg-secondary/10">
                            <td className="p-3">{haras.Nome}</td>
                            <td className="p-3">{haras.CNPJ}</td>
                            <td className="p-3">{haras.Cep}</td>
                            <td className="p-3">{haras.Estado}</td>
                            <td className="p-3">{haras.Cidade}</td>
                            <td className="p-3">{haras.Bairro}</td>
                            <td className="p-3">{haras.Rua}</td>
                            <td className="p-3">{haras.Numero}</td>
                            <td className="p-3">{haras.Complemento}</td>
                            <td className="p-3 text-center">
                                <button onClick={() => handleEdit(haras.ID)}
                                        className="bg-secondary text-tertiary px-4 py-2 rounded-md">Editar
                                </button>
                                <button className="bg-red-500 text-white px-4 py-2 rounded-md ml-2">Excluir
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/*} modal edição*/}
            {isEditing && (
                <div id="modal" className="fixed inset-0 bg-black/50 items-center justify-center">
                    <form onSubmit={handleSubmit} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg max-w-md w-full space-y-4">
                        <h2 className="text-xl font-semibold">Editar Haras</h2>
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

                        <div className="flex justify-end gap-3">
                            <button id="btn-cancelar" className="px-4 py-2 rounded-md bg-gray-300">Cancelar</button>
                            <button type="submit" id="btn-salvar" className="px-4 py-2 rounded-md bg-secondary text-tertiary">Salvar
                            </button>
                        </div>
                    </form>
                </div>)}
        </div>
    )
}
