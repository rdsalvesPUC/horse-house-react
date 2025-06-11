import {useState} from "react";

export default function InputSenha({onchange, nome, placeHolder, valor, variant = "proprietario", passwordRequirements}) {
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const variants = {
        proprietario: {
            label: "inline-block text-sm font-medium mb-2",
            input: "input-register-spa",
            error: "text-error text-sm"
        },
        usuario: {
            label: "font-medium",
            input: "rounded-md p-3 text-sm border border-secondary w-full",
            error: "text-error text-sm"
        }
    }
    return (
        <div>
            <label className={variants[variant].label}>{nome}</label><span className="text-error"> *</span>
            <div className="relative w-full">
                <input
                    type={mostrarSenha ? "text" : "password"}
                    placeholder={placeHolder}
                    className={variants[variant].input}
                    value={valor}
                    onChange={(e) => {
                        onchange(e.target.value)
                    }}
                />
                <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 focus:outline-none"
                    onClick={() => setMostrarSenha(!mostrarSenha)}
                >
                    <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M1 12C1 12 5 20 12 20C19 20 23 12 23 12" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="12" cy="12" r="3" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
            </div>
            {passwordRequirements && <div className="text-sm text-gray-600 mt-2">
                <div className="font-medium">A senha deve conter:</div>
                <ul className="list-disc list-inside">
                    <li className={valor.match(/[A-Z]/) ? "text-success" : "text-error"}>Pelo menos uma letra maiúscula
                    </li>
                    <li className={valor.match(/\d/) ? "text-success" : "text-error"}>Pelo menos um
                        número
                    </li>
                    <li className={valor.match(/[@$!%*?&#]/) ? "text-success" : "text-error"}>Pelo menos um
                        caractere especial
                    </li>
                    <li className={valor ? "text-success" : "text-error"}>Mínimo
                        de 6 caracteres
                    </li>
                </ul>
            </div>}
        </div>
    )
}