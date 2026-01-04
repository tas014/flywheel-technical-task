"use client";

import { useState } from "react";
import TaskFilter from "@/components/tasks/TaskFilter";
import TaskSearchBar from "@/components/tasks/TaskSearchbar";
import TaskSort from "@/components/tasks/TaskSort";
import type { FetchTasksParams } from "@/app/_lib/types/tasks";
import FilterSparking from "./Icons/FilterSparking";

interface Props {
  updateParams: (updates: FetchTasksParams) => void;
}

export default function Filters({ updateParams }: Props) {
  const [showModal, setShowModal] = useState(false);

  const handleFilterChange = (updates: FetchTasksParams) => {
    updateParams(updates);
  };

  return (
    <section>
      <button
        onClick={() => setShowModal(true)}
        className="md:hidden mb-3 w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        <FilterSparking />
      </button>
      <div className="hidden md:flex flex-col gap-3">
        <TaskSearchBar onSearchChange={handleFilterChange} />
        <TaskFilter onFilterChange={handleFilterChange} />
        <TaskSort onParamsChange={handleFilterChange} />
      </div>

      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-40"
          onClick={() => setShowModal(false)}
        >
          <div
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-11/12 max-w-md max-h-[90vh] overflow-y-auto z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Filters</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            <div className="flex flex-col gap-4">
              <TaskSearchBar onSearchChange={handleFilterChange} />
              <TaskFilter onFilterChange={handleFilterChange} />
              <TaskSort onParamsChange={handleFilterChange} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
