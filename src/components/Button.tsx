import Link from 'next/link';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps {
  variant?: Variant;
  size?: Size;
  href?: string;
  external?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const variantClasses: Record<Variant, string> = {
  primary: 'bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-600/25 hover:shadow-blue-500/30',
  secondary: 'border-2 border-white/30 text-white hover:bg-white hover:text-slate-900',
  ghost: 'bg-white text-primary hover:bg-gray-100 shadow-md',
};

const sizeClasses: Record<Size, string> = {
  sm: 'px-5 py-2.5 text-sm',
  md: 'px-8 py-4 text-base',
  lg: 'px-10 py-5 text-lg',
};

const base = 'inline-flex items-center justify-center rounded-btn font-semibold transition-all duration-300 transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50 disabled:pointer-events-none';

export default function Button({ variant = 'primary', size = 'md', href, external, disabled, type = 'button', className = '', children, onClick }: ButtonProps) {
  const classes = `${base} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
  if (href) {
    if (external) return <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>{children}</a>;
    return <Link href={href} className={classes}>{children}</Link>;
  }
  return <button type={type} disabled={disabled} onClick={onClick} className={classes}>{children}</button>;
}
