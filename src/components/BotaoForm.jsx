export default function BotaoForm({onchange, nome, erro, textoErro, placeHolder, valor, tipo, disabled}) {
    return (
        <div>
            <label className="inline-block text-sm font-medium mb-2">{nome}</label><span className="text-error"> *</span>
            <input
                disabled={disabled}
                type={tipo}
                {...tipo === "date" ? {min: "1900-01-01", max: new Date().toISOString().split("T")[0]} : {}}
                placeholder={placeHolder}
                className="input-register-spa"
                value={valor}
                onChange={(e) => {
                    onchange(e.target.value)
                }}
            />
            {erro && (
                <span className="text-error text-sm">
                    {textoErro}
                </span>
            )}
        </div>
    )
}