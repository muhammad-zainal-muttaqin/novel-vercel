import React from 'react';
import Link from 'next/link';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit';
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  disabled = false,
  className = '',
  type = 'button'
}) => {
  // Base styles yang konsisten
  const baseStyles = {
    display: 'inline-block',
    fontWeight: '500',
    fontFamily: 'Inter, system-ui, sans-serif',
    textDecoration: 'none',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
    borderRadius: '0.375rem',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
  };

  // Variant styles
  const variantStyles = {
    primary: {
      backgroundColor: '#2563eb',
      color: '#ffffff',
      ':hover': {
        backgroundColor: '#1d4ed8'
      }
    },
    secondary: {
      backgroundColor: '#6b7280',
      color: '#ffffff',
      ':hover': {
        backgroundColor: '#4b5563'
      }
    },
    danger: {
      backgroundColor: '#dc2626',
      color: '#ffffff',
      ':hover': {
        backgroundColor: '#b91c1c'
      }
    },
    success: {
      backgroundColor: '#059669',
      color: '#ffffff',
      ':hover': {
        backgroundColor: '#047857'
      }
    }
  };

  // Size styles
  const sizeStyles = {
    sm: {
      padding: '0.375rem 0.75rem',
      fontSize: '0.875rem'
    },
    md: {
      padding: '0.5rem 1rem',
      fontSize: '1rem'
    },
    lg: {
      padding: '0.75rem 1.5rem',
      fontSize: '1.125rem'
    }
  };

  // Combine all styles
  const combinedStyles = {
    ...baseStyles,
    ...variantStyles[variant],
    ...sizeStyles[size],
    opacity: disabled ? 0.5 : 1,
    cursor: disabled ? 'not-allowed' : 'pointer'
  };

  // CSS classes untuk hover effects
  const hoverClasses = {
    primary: 'hover:bg-blue-700',
    secondary: 'hover:bg-gray-600',
    danger: 'hover:bg-red-700',
    success: 'hover:bg-green-700'
  };

  const buttonClasses = `
    transition-colors shadow-sm ${hoverClasses[variant]} ${className}
  `.trim();

  // Jika ada href, render sebagai Link
  if (href) {
    return (
      <Link
        href={href}
        className={buttonClasses}
        style={combinedStyles}
      >
        {children}
      </Link>
    );
  }

  // Jika tidak ada href, render sebagai button
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
      style={combinedStyles}
    >
      {children}
    </button>
  );
};

export default Button; 