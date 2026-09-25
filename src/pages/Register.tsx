import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setError(error.message);
    } else {
      setDone(true);
    }
  };

  if (done) {
    return (
      <div className="max-w-sm mx-auto mt-20 p-6 border rounded-lg text-center">
        <h1 className="text-xl font-bold mb-4">注册成功</h1>
        <p className="text-gray-600 mb-4">请查收邮件确认，然后登录。</p>
        <Link to="/login" className="text-blue-600">去登录</Link>
      </div>
    );
  }

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 border rounded-lg">
      <h1 className="text-xl font-bold mb-6 text-center">注册</h1>
      {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="邮箱"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded px-3 py-2 text-sm"
        />
        <input
          type="password"
          placeholder="密码（至少 6 位）"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded px-3 py-2 text-sm"
        />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
          注册
        </button>
      </form>
      <div className="text-center text-sm mt-4 text-gray-500">
        已有账号？<Link to="/login" className="text-blue-600">去登录</Link>
      </div>
    </div>
  );
}