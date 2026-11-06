// square box function
export default function Square({ value, onSquareClick }) {
    return <button className="square" onClick={onSquareClick}>
        {value}
    </button>;
}