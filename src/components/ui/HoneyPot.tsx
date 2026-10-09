
export default function HoneyPot() {
    return (
        <input
            type="text"
            name="site"
            className="hidden"
            aria-hidden="true"
            tabIndex={-1}
        />
    );
}
