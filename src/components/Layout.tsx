import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

const navItems = [
  { path: '/', label: '主页' },
  { path: '/problems', label: '题库' },
  { path: '/team', label: '团队' },
  { path: '/me', label: '我的' },
  { path: '/discussions', label: '讨论' },
];

const Layout = () => {
  const location = useLocation();

  return (
    <div className="w-screen h-screen flex">
      <aside className="w-56 shrink-0 border-r bg-gray-50 flex flex-col">
        <div className="h-14 flex items-center px-5 border-b font-bold text-lg">
          VTQ OJ
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-3 py-2 rounded-md text-sm ${
                  active
                    ? 'bg-blue-100 text-blue-700 font-medium'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {item.label}
              </Link>
            );
          })}

          <div className="my-3 border-t" />

          <a
            href="https://www.luogu.com.cn/team/133998"
            target="_blank"
            rel="noopener noreferrer"
            className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            SAH OI
          </a>

          <div className="my-3 border-t" />

          <Link
            to="/stats"
            className={`block px-3 py-2 rounded-md text-sm ${
              location.pathname === '/stats'
                ? 'bg-blue-100 text-blue-700 font-medium'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            统计
          </Link>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 shrink-0 border-b bg-white flex items-center justify-end px-6">
          <div className="flex items-center gap-4 text-sm">
            <Link to="/login" className="text-gray-600 hover:text-blue-600">登录</Link>
            <Link to="/register" className="text-gray-600 hover:text-blue-600">注册</Link>
          </div>
        </header>

        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;