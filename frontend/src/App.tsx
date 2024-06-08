import { useState } from 'react';
import All from './components/tabs/all';
import Deploy from './components/tabs/deploy';
import DeployAccount from './components/tabs/deployAccount';
import Invoke from './components/tabs/invoke';
import Declare from './components/tabs/declare';
import L1_Handler from './components/tabs/l1Handler';

const tabs = [
  { name: 'All', id: 'all' },
  { name: 'declare', id: 'declare' },
  { name: 'deploy', id: 'deploy' },
  { name: 'deploy_account', id: 'deploy_account' },
  { name: 'invoke', id: 'invoke' },
  { name: 'l1_handler', id: 'l1_handler' },
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');

  return (
    <main className={`bg-[#121212] p-9 text-white h-full`}>
      <div className="bg-[rgb(27,27,27)] h-max rounded-xl p-7">
        <div className="grid gap-y-1">
          <div className="text-2xl">
            Transactions
          </div>
          <div className="text-sm text-[#C9CAC9]">
            A list of transactions on Starknet
          </div>
        </div>

        <div className="cursor-pointer border-none outline-none flex mt-9">
          {tabs.map((tab) => (
            <div key={tab.id} className='border border-[#4B4B4B] text-sm'>
              <button
                className={`cursor-pointer border-none outline-none px-4 py-2 transition-colors duration-300 ${
                  activeTab === tab.id ? 'bg-[#4B4B4B]' : 'bg-transparent'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.name}
              </button>
            </div>
          ))}
        </div>

        <div className='my-6'>
          {activeTab === 'all' && <All />}
          {activeTab === 'declare' && <Declare />}
          {activeTab === 'deploy' && <Deploy />}
          {activeTab === 'deploy_account' && <DeployAccount />}
          {activeTab === 'invoke' && <Invoke />}
          {activeTab === 'l1_handler' && <L1_Handler />}
        </div>
      </div>
    </main>
  );
}

export default App;
