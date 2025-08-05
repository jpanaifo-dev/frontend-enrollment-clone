import Image from 'next/image';

interface PaymentMethodProps {
  image: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

const PaymentMethod = ({ image, alt, width, height, className = '' }: PaymentMethodProps) => (
  <div className={`w-36 h-20 flex items-center justify-center ${className}`}>
    <Image
      src={image}
      alt={alt}
      width={width}
      height={height}
      className="object-contain"
    />
  </div>
);

export default PaymentMethod;
