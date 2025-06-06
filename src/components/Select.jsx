export default function Select({
                                   onchange,
                                   nome,
                                   erro,
                                   textoErro,
                                   placeHolder,
                                   valor,
                                   required,
                                   options = [],
                                   disabled = false,
                                   variant = "profile"
                               }) {
    const variants = {
        topbar: {
            label: "inline-block text-sm font-medium text-primary",
            select: "w-[200px] py-2 pl-3 pr-8 border border-secondary/50 rounded-md text-gray-700 bg-white appearance-none focus:outline-none",
            error: "text-error text-sm mt-1"
        },
        list: {
            label: "inline-block text-sm font-medium mb-2 text-primary",
            select: "w-full p-3 border rounded-md text-sm border-secondary appearance-none",
            error: "text-error text-sm"
        }
    };

    return (
        <div>
            {required && (<><label htmlFor={nome} className={variants[variant].label}>{nome}</label><span
                className="text-error"> *</span></>)}
            <select
                id={nome}
                disabled={disabled}
                className={variants[variant].select}
                value={valor}
                onChange={(e) => onchange(e.target.value)}
            >
                <option value="" disabled>{placeHolder}</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
            {erro && (
                <span className={variants[variant].error}>
                    {textoErro}
                </span>
            )}
        </div>
    );
}