import React from 'react';
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

    const formatHash = (hash: string) => {
        return `${hash.slice(0, 6)}...${hash.slice(-4)}`;
    };

const L1_Handler: React.FC = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchTransactions = async () => {
          try {
            const { data } = await axios.get<Transaction[]>('https://karnot-zeta.vercel.app/transactions?type=L1_HANDLER');
            setTransactions(data);
            setLoading(false);
          } catch (error) {
            console.error('Error fetching transactions', error);
          }
        };
    
        fetchTransactions();
      }, []);

  return (
    <div>
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
              {!loading && transactions.map((transaction) => (
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
  )
}

export default L1_Handler
