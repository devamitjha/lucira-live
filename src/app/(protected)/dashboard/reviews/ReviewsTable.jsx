"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight, Star, User, MessageCircle } from "lucide-react";

export default function ReviewsTable({ data, pagination, onPageChange }) {
  // Defensive pagination values
  const currentPage = pagination?.page || 1;
  const totalPages = pagination?.totalPages || 1;
  const totalItems = pagination?.total || 0;

  const columns = [
    {
      accessorKey: "productTitle",
      header: "Product",
      cell: ({ row }) => (
        <div className="flex flex-col max-w-[200px]">
          <span className="font-medium text-zinc-900 dark:text-zinc-50 truncate">
            {row.original.productTitle || "General Review"}
          </span>
          <span className="text-xs text-zinc-500 font-mono">
            {row.original.productId}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "name",
      header: "Reviewer",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <User size={16} className="text-zinc-400" />
          <span className="font-medium">{row.original.name}</span>
        </div>
      ),
    },
    {
      accessorKey: "rating",
      header: "Rating",
      cell: ({ row }) => (
        <div className="flex items-center text-amber-500">
          <Star size={16} fill="currentColor" />
          <span className="ml-1 font-bold">{row.original.rating}</span>
        </div>
      ),
    },
    {
      accessorKey: "text",
      header: "Review Content",
      cell: ({ row }) => (
        <div className="flex gap-2 max-w-[400px]">
          <MessageCircle size={16} className="text-zinc-400 shrink-0 mt-1" />
          <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 italic">
            "{row.original.text}"
          </p>
        </div>
      ),
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => {
        const date = row.original.date;
        return date ? new Date(date).toLocaleDateString() : "N/A";
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 text-zinc-500 font-medium">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="px-4 py-4 uppercase text-xs font-bold tracking-wider">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 bg-white dark:bg-zinc-950">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/50 transition-colors">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-4 align-middle">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="px-4 py-12 text-center text-zinc-500">
                  No reviews found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between px-2">
        <span className="text-xs text-zinc-500">
          Page {currentPage} of {totalPages} ({totalItems.toLocaleString()} total reviews)
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className="p-2 border rounded-lg disabled:opacity-30 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="p-2 border rounded-lg disabled:opacity-30 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
