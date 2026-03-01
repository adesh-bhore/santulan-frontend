import './Input.module.css';

export const Input = ({
  type = 'text',
  label,
  value,
  onChange,
  placeholder,
  disabled = false,
  error,
  className = '',
  ...props
}) => {
  const inputId = props.id || `input-${Math.random().toString(36).substr(2, 9)}`;

  const renderInput = () => {
    const baseClass = 'input';
    const errorClass = error ? 'input--error' : '';
    const inputClassName = `${baseClass} ${errorClass} ${className}`.trim();

    switch (type) {
      case 'checkbox':
        return (
          <input
            type="checkbox"
            id={inputId}
            checked={value}
            onChange={onChange}
            disabled={disabled}
            className="input-checkbox"
            {...props}
          />
        );

      case 'radio':
        return (
          <input
            type="radio"
            id={inputId}
            checked={value}
            onChange={onChange}
            disabled={disabled}
            className="input-radio"
            {...props}
          />
        );

      case 'file':
        return (
          <input
            type="file"
            id={inputId}
            onChange={onChange}
            disabled={disabled}
            className="input-file"
            {...props}
          />
        );

      case 'number':
        return (
          <input
            type="number"
            id={inputId}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            className={inputClassName}
            {...props}
          />
        );

      default:
        return (
          <input
            type={type}
            id={inputId}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            className={inputClassName}
            {...props}
          />
        );
    }
  };

  if (type === 'checkbox' || type === 'radio') {
    return (
      <div className="input-wrapper input-wrapper--inline">
        {renderInput()}
        {label && (
          <label htmlFor={inputId} className="input-label input-label--inline">
            {label}
          </label>
        )}
      </div>
    );
  }

  return (
    <div className="input-wrapper">
      {label && (
        <label htmlFor={inputId} className="input-label">
          {label}
        </label>
      )}
      {renderInput()}
      {error && <span className="input-error-message">{error}</span>}
    </div>
  );
};
