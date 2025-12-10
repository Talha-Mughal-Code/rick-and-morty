interface Props {
  label: string;
  selected: string[];
  onToggle: (value: string) => void;
  options: string[];
}

export default function FilterSelect({ label, selected, onToggle, options }: Props) {
  return (
    <div className="filter-multi-select">
      <span className="filter-label">{label}:</span>
      <div className="filter-options">
        {options.slice(1).map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onToggle(opt)}
            className={`filter-option ${selected.includes(opt) ? 'active' : ''}`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
