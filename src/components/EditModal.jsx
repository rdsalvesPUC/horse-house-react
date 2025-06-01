export default function EditModal({onCancel, onSubmit, titulo, children }) {
    return (
        <form onSubmit={onSubmit} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg max-w-md w-full space-y-4">
            <h2 className="text-xl font-semibold">{titulo}</h2>
            { children }
            <div className="flex justify-end gap-3">
                <button onClick={onCancel} id="btn-cancelar" className="px-4 py-2 rounded-md bg-gray-300" type="button">Cancelar</button>
                <button type="submit" id="btn-salvar" className="px-4 py-2 rounded-md bg-secondary text-tertiary">Salvar</button>
            </div>
        </form>
    );
}