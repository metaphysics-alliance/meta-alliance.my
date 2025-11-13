import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'

/**
 * Standardized CTA Button Component
 * Based on the Add to Cart button styling from /pricing
 * 
 * @param {string} variant - 'primary' (gold glow) or 'secondary' (green success)
 * @param {string} size - 'sm', 'md', 'lg'
 * @param {string} to - Internal route (uses Link)
 * @param {string} href - External URL (uses <a>)
 * @param {function} onClick - Click handler
 * @param {boolean} disabled - Disabled state
 * @param {node} icon - Custom icon component
 * @param {boolean} showArrow - Show right arrow (default: false)
 * @param {string} className - Additional classes
 */
export default function CTAButton({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  onClick,
  disabled = false,
  icon,
  showArrow = false,
  className = '',
  ...props
}) {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm rounded-[12px]',
    md: 'px-5 py-2 text-sm rounded-[14px]',
    lg: 'px-6 py-3 text-base rounded-xl',
  }

  const variantClasses = {
    primary: 'bg-black/85 text-[#f4deb4]',
    secondary: 'bg-emerald-400/90 text-black shadow-[0_14px_34px_rgba(16,185,129,0.45)] hover:bg-emerald-300',
  }

  const baseClasses = `
    group relative inline-flex items-center justify-center gap-2 
    overflow-hidden font-semibold transition-all duration-300
    disabled:opacity-50 disabled:cursor-not-allowed
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${className}
  `.trim().replace(/\s+/g, ' ')

  const content = (
    <>
      {/* Gold glow effects (only for primary variant) */}
      {variant === 'primary' && !disabled && (
        <>
          <span className="absolute inset-0 bg-gradient-to-r from-[#f8d884cc] via-[#f6e7b8aa] to-[#f8d884cc] opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-30" />
          <span className="absolute inset-0 scale-[0.86] rounded-[12px] border border-[#f8d88433] transition duration-300 group-hover:scale-100 group-hover:border-[#f8d88480]" />
          <span
            className="absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-40"
            style={{ boxShadow: '0 0 45px 10px rgba(248,216,132,0.32)' }}
          />
        </>
      )}

      {/* Content */}
      <span
        className={`relative inline-flex items-center gap-2 ${
          variant === 'primary' && !disabled
            ? 'tracking-[0.18em] text-[#f4deb4] group-hover:text-[#fff5dc]'
            : ''
        }`}
      >
        {icon}
        <span className="tracking-normal">{children}</span>
        {showArrow && <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
      </span>
    </>
  )

  // Internal Link
  if (to && !disabled) {
    return (
      <Link to={to} className={baseClasses} {...props}>
        {content}
      </Link>
    )
  }

  // External Link
  if (href && !disabled) {
    return (
      <a href={href} className={baseClasses} target="_blank" rel="noopener noreferrer" {...props}>
        {content}
      </a>
    )
  }

  // Button
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={baseClasses}
      {...props}
    >
      {content}
    </button>
  )
}
