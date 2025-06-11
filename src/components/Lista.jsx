import Aviso from "./Aviso.jsx";
import {Link} from "react-router-dom";
import Tabela from "./Tabela.jsx";
import {formatarCEP, formatarCNPJ} from "../utils.js";
import EditModal from "./EditModal.jsx";
import Input from "./Input.jsx";
import Botao from "./Botao.jsx";

export default function Lista({children, aviso, onclose, botaoNovo, isEditing, tabela, selectTipo, link}) {
    return (
        <div className="flex-grow p-6 space-y-6">
            {aviso.ativo && (
                <Aviso onConfirm={aviso.onConfirm} titulo={aviso.titulo} mensagem={aviso.mensagem} onClose={onclose}/>)}
            <div id="container-botao" className="flex items-center justify-left gap-2 mb-6">
                <Botao variant="tertiary" to={link}>
                    {botaoNovo}
                </Botao>
                {selectTipo}
            </div>
            <div className="overflow-x-auto bg-tertiary rounded-lg shadow-lg">
                {tabela}
            </div>

            {/*} modal edição*/}
            {isEditing && (
                <div id="modal" className="fixed inset-0 bg-black/50 items-center justify-center">
                    {children}
                </div>)}
        </div>)

}