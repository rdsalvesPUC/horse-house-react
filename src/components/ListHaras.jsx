import {Link} from "react-router-dom";
import {useState} from "react";
import Input from "./Input.jsx";

export default function ListHaras({harasList}) {
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
    const handleSubmit = (e) => {
        e.preventDefault();
        // Aqui você pode adicionar a lógica para enviar os dados do formulário
        console.log("Dados do formulário:", formData);
        // Resetar o formulário após o envio
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
    return (
        <div className="flex-grow p-6 space-y-6">
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
                            valor={formData.CNPJ}
                            tipo="text"
                            onchange={(value) => setFormData((prev) => ({...prev, CNPJ: value}))}
                            variant="list"
                        />
                        <Input
                            nome="CEP"
                            placeHolder="CEP"
                            valor={formData.Cep}
                            tipo="text"
                            onchange={(value) => setFormData((prev) => ({...prev, Cep: value}))}
                            variant="list"
                        />
                        <Input
                            nome="Estado"
                            placeHolder="Estado"
                            valor={formData.Estado}
                            tipo="text"
                            onchange={(value) => setFormData((prev) => ({...prev, Estado: value}))}
                            variant="list"
                            readOnly
                        />
                        <Input
                            nome="Cidade"
                            placeHolder="Cidade"
                            valor={formData.Cidade}
                            tipo="text"
                            onchange={(value) => setFormData((prev) => ({...prev, Cidade: value}))}
                            variant="list"
                            readOnly
                        />
                        <Input
                            nome="Bairro"
                            placeHolder="Bairro"
                            valor={formData.Bairro}
                            tipo="text"
                            onchange={(value) => setFormData((prev) => ({...prev, Bairro: value}))}
                            variant="list"
                        />
                        <Input
                            nome="Rua"
                            placeHolder="Rua"
                            valor={formData.Rua}
                            tipo="text"
                            onchange={(value) => setFormData((prev) => ({...prev, Rua: value}))}
                            variant="list"
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
