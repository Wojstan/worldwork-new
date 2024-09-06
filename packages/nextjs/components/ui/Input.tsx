interface InputProps {
  id: string
  label?: string
  placeholder?: string
  className?: string
  inputClass?: string
  textarea?: boolean
  removeLabel?: boolean
}

export const Input = ({ id, label, placeholder, className, textarea, removeLabel = false }: InputProps) => {
  return (
    <label className={className}>
      {!removeLabel && <div className="label">{label && <span className="label-text">{label}</span>}</div>}

      {textarea ? (
        <textarea
          id={id}
          name={id}
          rows={6}
          placeholder={placeholder}
          className="input p-3 input-bordered w-full bg-white h-auto mb-4"
        />
      ) : (
        <input
          id={id}
          name={id}
          type="text"
          placeholder={placeholder}
          className="input input-bordered w-full bg-white"
        />
      )}
    </label>
  )
}
