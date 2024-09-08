import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useEditorState } from "./hooks/useEditorEngine"
import { Button } from "../button"
import Link from "next/link"
import { useRouter } from "next/navigation"

function TableDemo() {
  const router = useRouter()
  const { documentHistory } = useEditorState()
  console.log(documentHistory)
  return (
    <Table className="">
      <TableCaption className="text-white">Your Documents</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px] text-white text-2xl">Title</TableHead>
          <TableHead className="text-white text-2xl">Content</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="">
        {documentHistory.map((invoice) => (
          <TableRow key={invoice.content} className="" onClick={() => router.push(`/`)}>
            <TableCell className="font-medium text-white text-lg">{invoice.title}</TableCell>
            <TableCell className="text-lg">{invoice.content}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default TableDemo
