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
  primary: 'bg-red-600 text-white hover:bg-red-500 shadow-lg shadow-red-600/20 hover:-translate-y-0.5',
  secondary: 'border border-white/25 text-white hover:border-white/60 hover:bg-white/5 hover:-translate-y-0.5',
  ghost: 'bg-white text-slate-900 hover:bg-slate-50 shadow-md hover:-translate-y-0.5',
};

const sizeClasses: Record<Size, string> = {
  sm: 'px-5 py-2.5 text-sm',
  md: 'px-7 py-3.5 text-base',
  lg: 'px-8 py-4 text-base font-semibold',
};

const base = 'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 disabled:opacity-50 disabled:pointer-events-none';

export default function Button({ variant = 'primary', size = 'md', href, external, disabled, type = 'button', className = '', children, onClick }: ButtonProps) {
  const classes = `${base} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
  if (href) {
    if (external) return <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>{children}</a>;
    return <Link href={href} className={classes}>{children}</Link>;
  }
  return <button type={type} disabled={disabled} onClick={onClick} className={classes}>{children}</button>;
}
