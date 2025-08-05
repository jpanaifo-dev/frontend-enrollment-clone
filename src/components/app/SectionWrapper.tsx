import { ReactNode } from 'react';

interface SectionWrapperProps {
  title: string;
  description: string;
  children: ReactNode;
  bgColor?: string;
  center?: boolean;
}

const SectionWrapper = ({
  title,
  description,
  children,
  bgColor = 'bg-white',
  center = false,
}: SectionWrapperProps) => (
  <section className={`${bgColor} py-16`}>
    <div className="container mx-auto px-4">
      <div className={`${center ? 'text-center' : 'text-left'} mb-12`}>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {title}
        </h2>
        <p className="text-gray-950 text-lg">{description}</p>
      </div>
      {children}
    </div>
  </section>
);

export default SectionWrapper;
