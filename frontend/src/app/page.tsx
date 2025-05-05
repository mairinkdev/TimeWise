import { DashboardWrapper } from "@/components/dashboard/dashboard-wrapper"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              TimeWise
            </span>{" "}
            Dashboard
          </h1>
          <div className="flex items-center space-x-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
            <span className="text-sm text-gray-600">Atualizado agora</span>
          </div>
        </div>
        <DashboardWrapper />
      </div>
    </main>
  )
}
