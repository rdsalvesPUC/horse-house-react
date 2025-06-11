export default function Input({
                                  onchange,
                                  nome,
                                  erro,
                                  textoErro,
                                  placeHolder,
                                  valor,
                                  tipo,
                                  disabled,
                                  variant = "profile"
                              }) {
    const variants = {
        profile: {
            label: "inline-block text-sm font-medium text-primary",
            input: "mt-1 block w-full border border-secondary/20 rounded-md px-3 py-2",
            error: "text-error text-sm mt-1"
        },
        form: {
            label: "inline-block text-sm font-medium mb-2",
            input: "input-register-spa",
            error: "text-error text-sm"
        },
        list: {
            label: "inline-block text-sm font-medium mb-2 text-primary",
            input: "w-full p-3 border rounded-md text-sm border-secondary",
            error: "text-error text-sm"
        },
        register: {
            label: "font-medium",
            input: "mt-2 w-full rounded-md p-3 text-sm border border-secondary",
            error: "text-error text-sm mt-1"
        }
    };
    return (
        <div>
            {variant !== "list" && (<><label htmlFor="nome" className={variants[variant].label}>{nome}</label><span className="text-error"> *</span></>)}
            <input
                id={nome}
                disabled={disabled}
                type={tipo}
                {...tipo === "date" ? {min: "1900-01-01", max: new Date().toISOString().split("T")[0]} : {}}
                placeholder={placeHolder}
                className={variants[variant].input}
                value={valor}
                onChange={(e) => {
                    onchange(e.target.value)
                }}
            />
            {erro && (
                <span className={variants[variant].error}>
                    {textoErro}
                </span>
            )}
        </div>
    )
}