import { CreditCard, FileText, CalendarRange } from 'lucide-react';
import PaymentInfoItem from './PaymentInfoItem';

interface PaymentCardProps {
  title: string;
  amount: string;
  code: string;
  dates: string;
  gradient: string;
  iconColor: string;
}

const PaymentCard = ({
  title,
  amount,
  code,
  dates,
  gradient,
  iconColor,
}: PaymentCardProps) => (
  <div className={`rounded-lg p-6 shadow-sm text-white ${gradient}`}>
    <h3 className="text-lg font-semibold mb-6">{title}</h3>
    <div className="space-y-4">
      <PaymentInfoItem
        icon={<CreditCard />}
        label="Monto a pagar:"
        value={amount}
        iconColor={iconColor}
      />
      <PaymentInfoItem
        icon={<FileText />}
        label="Código de pago:"
        value={code}
        iconColor={iconColor}
      />
      <PaymentInfoItem
        icon={<CalendarRange />}
        label="Fecha límite:"
        value={dates}
        iconColor={iconColor}
      />
    </div>
  </div>
);

export default PaymentCard;
