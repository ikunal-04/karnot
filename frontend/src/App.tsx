import { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const tabs = [
  { name: 'All', id: 'all' },
  { name: 'declare', id: 'declare' },
  { name: 'deploy', id: 'deploy' },
  { name: 'deploy_account', id: 'deploy_account' },
  { name: 'invoke', id: 'invoke' },
  { name: 'l1_handler', id: 'l1_handler' },
];

useEffect(() => {
  
})

function App() {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <main className="h-screen bg-[#121212] p-9 text-white">
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
            <div className='border border-[#4B4B4B] text-sm'>
              <button
              key={tab.id}
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
          <Table>
            <TableHeader>
              <TableRow className='hover:bg-transparent'>
                <TableHead className="w-[100px]">Status</TableHead>
                <TableHead>Hash</TableHead>
                <TableHead>Type</TableHead>
                <TableHead >Block</TableHead>
                <TableHead className="text-right">Age</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className='hover:bg-[#4B4B4C]'>
                <TableCell className="font-medium">INV001</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>Credit Card</TableCell>
                <TableCell >$250.00</TableCell>
                <TableCell className="text-right">3 minutes ago</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        {/* <div className="mt-4 p-4 border">
          {activeTab === 'all' && <div>All transactions content</div>}
          {activeTab === 'declare' && <div>declare transactions content</div>}
          {activeTab === 'deploy' && <div>deploy transactions content</div>}
          {activeTab === 'deploy_account' && <div>deploy_account transactions content</div>}
          {activeTab === 'invoke' && <div>invoke transactions content</div>}
          {activeTab === 'l1_handler' && <div>l1_handler transactions content</div>}
        </div> */}
      </div>
    </main>
  )
}

export default App
