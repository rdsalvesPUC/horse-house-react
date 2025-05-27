export default function InputEdit({onchange, nome, erro, textoErro, valor, tipo, disabled}) {
    return (
        <div>
            <label htmlFor={nome} className="inline-block text-sm font-medium text-primary">{nome}</label><span className="text-error"> *</span>
            <input
                onChange={(event) => onchange(event.target.value)}
                disabled={disabled}
                id={nome}
                type={tipo}
                value={valor}
                className="mt-1 block w-full border border-secondary/20 rounded-md px-3 py-2"
            />
            {erro && <p id="nome-erro" className="text-error text-sm mt-1">{textoErro}</p>}
        </div>
    )
}