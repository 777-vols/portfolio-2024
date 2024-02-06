import { ILocaleProps } from '@/types';

const LayoutFooter = ({ locale }: ILocaleProps) => {
  return (
    <footer className="h-40 flex items-center bg-slate-500 bg-opacity-50 dark:bg-indigo-900 dark:bg-opacity-50">
      <div className="container">footer</div>
    </footer>
  );
};

export default LayoutFooter;
