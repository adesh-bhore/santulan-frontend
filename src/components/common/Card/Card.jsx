import './Card.module.css';

export const Card = ({
  children,
  variant = 'mahogany',
  className = '',
  ...props
}) => {
  const baseClass = 'card';
  const variantClass = `card--${variant}`;

  return (
    <div className={`${baseClass} ${variantClass} ${className}`.trim()} {...props}>
      {children}
    </div>
  );
};
