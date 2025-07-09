import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const invoices = [
    { id: "INV001", status: "Paid", amount: "$250.00", method: "Credit Card" },
    { id: "INV002", status: "Pending", amount: "$150.00", method: "PayPal" },
    { id: "INV003", status: "Paid", amount: "$350.00", method: "Bank Transfer" },
    { id: "INV004", status: "Unpaid", amount: "$450.00", method: "Credit Card" },
    { id: "INV005", status: "Paid", amount: "$550.00", method: "PayPal" },
]

export default function SampleTable() {
  return (
    <div className="rounded-md border">
        <Table>
        <TableHeader>
            <TableRow>
            <TableHead>Invoice</TableHead>
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
