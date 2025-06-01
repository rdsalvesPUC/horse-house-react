export default function Tabela({children, campos}) {

    return (
        <table className="w-full border-collapse text-sm">
            <thead className="bg-secondary text-tertiary">
            <tr>
                {campos.map((campo, index) => (
                    <th key={index} className="p-3 text-left">{campo}</th>
                ))}
                <th className="p-3 text-center">Ações</th>
            </tr>
            </thead>
            <tbody id="tbody-haras">
            {children}
            </tbody>
        </table>
    )
}