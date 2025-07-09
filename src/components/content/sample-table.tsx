import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const invoices = [
    { id: "INV001", status: "Paid", amount: "$250.00", method: "Credit Card", customerName: "Liam Johnson", customerInitials: "LJ" },
    { id: "INV002", status: "Pending", amount: "$150.00", method: "PayPal", customerName: "Olivia Smith", customerInitials: "OS" },
    { id: "INV003", status: "Paid", amount: "$350.00", method: "Bank Transfer", customerName: "Noah Williams", customerInitials: "NW" },
    { id: "INV004", status: "Unpaid", amount: "$450.00", method: "Credit Card", customerName: "Emma Brown", customerInitials: "EB" },
    { id: "INV005", status: "Paid", amount: "$550.00", method: "PayPal", customerName: "Ava Jones", customerInitials: "AJ" },
]

export default function SampleTable() {
  return (
    <div className="rounded-md border">
        <Table>
        <TableHeader>
            <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Amount</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                    <TableCell className="font-medium">{invoice.id}</TableCell>
                    <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src="/avatar.png" alt="Avatar" data-ai-hint="person face" />
                            <AvatarFallback>{invoice.customerInitials}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{invoice.customerName}</span>
                        </div>
                    </TableCell>
                    <TableCell>
                        <Badge variant={invoice.status === "Paid" ? "default" : invoice.status === "Pending" ? "secondary" : "destructive"}>
                            {invoice.status}
                        </Badge>
                    </TableCell>
                    <TableCell>{invoice.method}</TableCell>
                    <TableCell>{invoice.amount}</TableCell>
                </TableRow>
            ))}
        </TableBody>
        </Table>
    </div>
  );
}
