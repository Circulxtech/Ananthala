


export default function AdminCouponsLoading() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="h-8 bg-gray-200 rounded w-48 mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-64 animate-pulse"></div>
        </div>
        <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
      </div>

      <div className="bg-white rounded-lg border border-[#D9CFC7] p-4 animate-pulse">
        <div className="h-10 bg-gray-200 rounded"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-lg border border-[#D9CFC7] p-6 animate-pulse">
            <div className="h-12 bg-gray-200 rounded mb-4"></div>
            <div className="h-8 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg border border-[#D9CFC7] p-6 animate-pulse">
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-12 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    </div>
  )
}
