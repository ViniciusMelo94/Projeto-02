import { useNavigate } from "react-router-dom";
import './card.css';

export function Card({ title, total, redirectTo }) {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(redirectTo);
    };

    return (
        <div className="card" onClick={handleCardClick}>
            <div className="card-content">
                <h3 className="card-title">{title}</h3>
                <p className="card-total">{total}</p>
            </div>
        </div>
    );
}