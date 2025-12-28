interface StatCardProps {
  value: string | number;
  label: string;
  icon?: React.ReactNode;
}

export function StatCard({ value, label, icon }: StatCardProps) {
  return (
    <div
      className="text-center p-6 rounded-lg"
      style={{
        backgroundColor: 'var(--color-surface)',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'var(--color-border-light)',
      }}
    >
      {icon && (
        <div className="flex justify-center mb-3" style={{ color: 'var(--color-primary-600)' }}>
          {icon}
        </div>
      )}
      <div
        className="text-4xl font-bold mb-2"
        style={{
          color: 'var(--color-primary-600)',
          fontWeight: 'var(--font-weight-bold)',
        }}
      >
        {value}
      </div>
      <div
        className="text-sm font-medium"
        style={{
          color: 'var(--color-text-secondary)',
          fontWeight: 'var(--font-weight-medium)',
        }}
      >
        {label}
      </div>
    </div>
  );
}
