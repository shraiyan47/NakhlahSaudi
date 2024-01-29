'use client'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import React from 'react'

const invoices = [
    {
        invoice: "Google",
        paymentStatus: "20k",
        totalAmount: "4.5k",
        paymentMethod: "$20000",
    },
    {
        invoice: "Facebook",
        paymentStatus: "26.3k",
        totalAmount: "6.1k",
        paymentMethod: "$30000",
    },
    {
        invoice: "X (Twitter)",
        paymentStatus: "17k",
        totalAmount: "3.5k",
        paymentMethod: "$28000",
    },
    {
        invoice: "Bing",
        paymentStatus: "19.8k",
        totalAmount: "1.9k",
        paymentMethod: "$22000",
    },
]

function RecentOrders() {
    return (
        <Card className='w-[70%] textPrimaryColor bg-white border-none rounded-xl' >
            <CardHeader>
                <CardTitle className='textSemiHeader font-bold'>Traffic Source Timeline</CardTitle>
            </CardHeader>

            <Table className='textSmall'> 
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Source</TableHead>
                        <TableHead>Unpaid User</TableHead>
                        <TableHead>Paid User</TableHead>
                        <TableHead className="text-right">Earned</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {invoices.map((invoice) => (
                        <TableRow key={invoice.invoice}>
                            <TableCell className="font-medium">{invoice.invoice}</TableCell>
                            <TableCell>{invoice.paymentStatus}</TableCell>
                            <TableCell>{invoice.paymentMethod}</TableCell>
                            <TableCell className="text-right">{invoice.totalAmount}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={3}>Total</TableCell>
                        <TableCell className="text-right">$1,00,000</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>

        </Card>
    )
}

export default RecentOrders