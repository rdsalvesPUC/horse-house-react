export default function Aviso({mensagem, titulo = "Aviso", onClose , onConfirm}) {
    return(
        <div className="fixed inset-0 bg-black/50 z-50">
            <div className="bg-tertiary rounded-2xl shadow-xl max-w-sm w-full p-6 space-y-4 animate-fade-in absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
                <h2 className="text-xl font-semibold text-gray-800 modal-title">{titulo}</h2>
                <p className="text-gray-600 modal-message">{mensagem}</p>
                <div className={`flex ${onConfirm ? "justify-between":"justify-end"} space-x-2`}>
                    {onConfirm && (
                        <button onClick={onClose} className="modal-ok px-4 py-2 bg-secondary text-tertiary rounded-lg transition">
                            Cancelar
                        </button>)}
                    <button onClick={() => {
                        if (onConfirm) onConfirm();
                        onClose();
                    }} className={`modal-ok px-4 py-2 ${onConfirm ? "bg-error" : "bg-secondary"} text-tertiary rounded-lg transition`}>
                        {onConfirm ? "Confirmar" : "OK"}
                    </button>
                </div>
            </div>
        </div>
    )
}