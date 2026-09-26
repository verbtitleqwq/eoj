import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState<'form' | 'code'>('form');
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);
  const navigate = useNavigate();

  // 第一步：发送验证码（用 signUp 触发 Supabase 发信）
  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (username.length < 2) {
      setError('用户名至少 2 个字符');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('请输入有效的邮箱地址');
      return;
    }
    if (password.length < 6) {
      setError('密码至少 6 位');
      return;
    }

    setSending(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { username } },
    });
    setSending(false);

    if (error) {
      setError(error.message);
    } else {
      setStep('code');
    }
  };

  // 第二步：验证码校验
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const { error } = await supabase.auth.verifyOtp({
      email,
      token: code,
      type: 'signup',
    });

    if (error) {
      setError(error.message);
    } else {
      // 写入用户名到 profiles
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from('profiles').insert({
          id: user.id,
          username,
        });
      }
      navigate('/');
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 border rounded-lg">
      <h1 className="text-xl font-bold mb-6 text-center">注册</h1>
      {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

      {step === 'form' ? (
        <form onSubmit={handleSendCode} className="space-y-4">
          <input
            type="text"
            placeholder="用户名"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border rounded px-3 py-2 text-sm"
          />
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
          <button
            type="submit"
            disabled={sending}
            className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50"
          >
            {sending ? '发送中...' : '发送验证码'}
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerify} className="space-y-4">
          <p className="text-sm text-gray-600">
            验证码已发到 <strong>{email}</strong>，请查收。
          </p>
          <input
            type="text"
            placeholder="6 位验证码"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            maxLength={6}
            className="w-full border rounded px-3 py-2 text-sm text-center tracking-widest"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            验证并注册
          </button>
          <button
            type="button"
            onClick={() => setStep('form')}
            className="w-full text-sm text-gray-500"
          >
            返回修改
          </button>
        </form>
      )}

      <div className="text-center text-sm mt-4 text-gray-500">
        已有账号？<Link to="/login" className="text-blue-600">去登录</Link>
      </div>
    </div>
  );
}