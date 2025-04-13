'use client';
import React, { useState } from 'react';
import { Button, Input, message } from 'antd';
import Link from 'next/link';
import JinaSearch from '@/app/images/JinaSearch.svg';
import { checkSearch } from '@/app/admin/search/actions';

interface JinaSettingsProps {
  apiKey: string | null;
  onApiKeyChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onApiKeyBlur: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const JinaSettings: React.FC<JinaSettingsProps> = ({
  apiKey,
  onApiKeyChange,
  onApiKeyBlur,
}) => {
  const [isChecking, setIsChecking] = useState(false);
  const check = async () => {
    setIsChecking(true);
    const webSearchResult = await checkSearch('jina', apiKey as string);
    setIsChecking(false);
    if (webSearchResult.valid) {
      message.success('校验成功');
    } else {
      message.error(webSearchResult.message);
    }
  }
  return (
    <div className='flex flex-col items-start mt-6 p-6 border border-gray-200 rounded-md'>
      <div className='flex flex-row text-base font-medium border-b items-center w-full mb-4 pb-2'>
        <JinaSearch style={{ width: '40px', height: '20px' }} />
        <h3 className='ml-2'>Jina</h3>
      </div>
      <span className='text-sm font-medium'>API 密钥</span>
      <div className='flex items-center my-2 w-full'>
        <Input
          name='apikey'
          value={apiKey || ''}
          onChange={onApiKeyChange}
          onBlur={onApiKeyBlur}
          placeholder="请输入 API 密钥"
        />
        <Button
          className='ml-2 w-24'
          loading={isChecking}
          onClick={() => { check() }}
        >检查</Button>
      </div>
      <Link href="https://jina.ai/" target='_blank'>
        <Button type='link' size='small' style={{ padding: 0 }}>获取密钥</Button>
      </Link>
    </div>
  );
};

export default JinaSettings; 