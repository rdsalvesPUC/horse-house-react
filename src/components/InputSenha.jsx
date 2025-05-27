import {useState} from "react";

export default function InputSenha({onchange, nome, erro, textoErro, placeHolder, valor}) {
    const [mostrarSenha, setMostrarSenha] = useState(false)
    return (
        <div>
            <label className="inline-block text-sm font-medium mb-2">{nome}</label><span className="text-error"> *</span>
            <div className="relative w-full">
                <input
                    type={mostrarSenha ? "text" : "password"}
                    placeholder={placeHolder}
                    className="input-register-spa"
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
        </div>
    )
}