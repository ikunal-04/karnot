import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Layers2 } from 'lucide-react';

interface Transaction {
  _id: string;
  status: string;
  transactionHash: string;
  type: string;
  blockNumber: number;
  age: string;
}

const tabs = [
  { name: 'All', id: 'all' },
  { name: 'declare', id: 'declare' },
  { name: 'deploy', id: 'deploy' },
  { name: 'deploy_account', id: 'deploy_account' },
  { name: 'invoke', id: 'invoke' },
  { name: 'l1_handler', id: 'l1_handler' },
];

const formatHash = (hash: string) => {
  return `${hash.slice(0, 6)}...${hash.slice(-4)}`;
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const { data } = await axios.get<Transaction[]>('http://localhost:3000/transactions');
        setTransactions(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching transactions', error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <main className={`bg-[#121212] p-9 text-white ${loading ? 'h-screen' : 'h-full'}`}>
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
          <Table>
            <TableHeader>
              <TableRow className='hover:bg-transparent'>
                <TableHead className="w-[100px]">Status</TableHead>
                <TableHead>Hash</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Block</TableHead>
                <TableHead className="text-right">Age</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading && (
                <TableRow>
                  <TableCell>
                    <Skeleton className="bg-slate-500 w-[50px] h-[20px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="bg-slate-500 w-[100px] h-[20px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="bg-slate-500 w-[100px] h-[20px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="bg-slate-500 w-[100px] h-[20px]" />
                  </TableCell>
                  <TableCell className="flex justify-end">
                    <Skeleton className="bg-slate-500 w-[50px] h-[20px]" />
                  </TableCell>
                </TableRow>            
              )}
              {!loading && activeTab === 'all' && transactions.map((transaction) => (
                <TableRow key={transaction._id}>
                  <TableCell>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Layers2 size={16} fill="green" strokeWidth={1}/>
                        </TooltipTrigger>
                        <TooltipContent className='bg-white text-black'>
                          <p>{transaction.status}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                  <TableCell>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>{formatHash(transaction.transactionHash)}</TooltipTrigger>
                        <TooltipContent className='bg-white text-black'>
                          <p >{transaction.transactionHash}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                  <TableCell>
                    {transaction.type}
                  </TableCell>
                  <TableCell>{transaction.blockNumber}</TableCell>
                  <TableCell className="text-right">{transaction.age}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </main>
  );
}

export default App;
