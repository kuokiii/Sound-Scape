export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 rounded-full border-4 border-green-200 border-t-green-600 animate-spin"></div>
        <p className="text-lg font-medium text-gray-600">Loading...</p>
      </div>
    </div>
  )
}

