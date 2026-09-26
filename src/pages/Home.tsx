import React, { useState } from 'react';

type Luck = '大吉' | '中吉' | '小吉' | '凶' | '大凶';

const LUCK_TABLE: { luck: Luck; weight: number; coins: number }[] = [
  { luck: '大吉', weight: 10, coins: 100 },
  { luck: '中吉', weight: 15, coins: 50 },
  { luck: '小吉', weight: 35, coins: 30 },
  { luck: '凶', weight: 30, coins: 10 },
  { luck: '大凶', weight: 20, coins: 5 },
];

function drawLuck(): { luck: Luck; coins: number } {
  const total = LUCK_TABLE.reduce((s, i) => s + i.weight, 0);
  let r = Math.random() * total;
  for (const item of LUCK_TABLE) {
    if (r < item.weight) return { luck: item.luck, coins: item.coins };
    r -= item.weight;
  }
  return { luck: '凶', coins: 10 };
}

const Home = () => {
  const [result, setResult] = useState<{ luck: Luck; coins: number } | null>(null);

  return (
    <div className="p-8">
      <div className="flex gap-6 items-stretch">
        <div className="flex-1 rounded-lg overflow-hidden border bg-gray-50">
          <img
            src="https://cdn.luogu.com.cn/upload/image_hosting/bt8r9swc.webp"
            alt="banner"
            className="w-full h-auto"
          />
        </div>

        <div className="w-64 shrink-0 border rounded-lg p-5 flex flex-col justify-center items-center">
          {result ? (
            <>
              <div className="text-lg font-medium">
                你的运气：<span className="text-blue-600">{result.luck}</span>
              </div>
              <div className="mt-2 text-gray-700">+{result.coins} V币</div>
            </>
          ) : (
            <>
              <button
                onClick={() => setResult(drawLuck())}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                签到
              </button>
              <div className="mt-3 text-xs text-gray-400 text-center">
                签到可获得随机 V 币
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;