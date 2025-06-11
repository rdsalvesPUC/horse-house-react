import { Link } from "react-router-dom";

export default function Botao({ onClick, variant, children, to, ...props }) {
    const variants = {
        primary: "btn-primary",
        secondary: "btn-secondary",
        tertiary: "btn-tertiary",
        next: "btn-form-next",
        previous: "btn-form-previous",
        search: "btn-form-search",
        edit: "edit text-blue-600 hover:underline",
        delete: "delete text-red-600 hover:underline",
    };

    const className = variants[variant];

    if (to) {
        return (
            <Link to={to} className={className} {...props}>
                {children}
            </Link>
        );
    }

    return (
        <button onClick={onClick} className={className} {...props}>
            {children}
        </button>
    );
}