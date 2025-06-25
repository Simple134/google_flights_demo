"use client"
import { Menu, Sun, User, Moon} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useTheme } from '@/src/context/useTheme';
import { useRouter } from 'next/navigation';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  return (
    <header className={`${theme === 'dark' ? 'bg-[#202123]' : 'bg-white'}`}>
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 border-b border-gray-400">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Menu className={`w-6 h-6 ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`} onClick={() => setIsOpen(true)}/>
            <span className={`text-[22px] cursor-pointer ${theme === 'dark' ? 'text-white' : 'text-gray-700'}` } onClick={() => router.push('/')}>Google</span>
          </div>
          
          <nav className="flex items-center space-x-8">
            <div onClick={toggleTheme} className='cursor-pointer'>
            {theme === 'dark' ? <Sun className="w-6 h-6 text-gray-200" /> : <Moon className="w-6 h-6 text-gray-500" />}

            </div>
            <div className={`flex items-center gap-2 border ${theme === 'dark' ? 'border-white' : 'border-gray-500'} rounded-full p-2`}>
                <User className={`w-6 h-6 ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`} />
            </div>

          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;