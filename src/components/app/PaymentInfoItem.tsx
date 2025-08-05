import { ReactNode } from 'react';

interface PaymentInfoItemProps {
  icon: ReactNode;
  label: string;
  value: string;
  iconColor: string;
}

const PaymentInfoItem = ({ icon, label, value, iconColor }: PaymentInfoItemProps) => (
  <div className="flex items-center space-x-3">
    <div className={`${iconColor} rounded-lg p-2`}>{icon}</div>
    <div>
      <div className="text-sm opacity-80">{label}</div>
      <div className="font-semibold">{value}</div>
    </div>
  </div>
);

export default PaymentInfoItem;
