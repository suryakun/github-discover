import { createPortal } from "react-dom"

export function Spinner({ dimension = 32 }: { dimension?: number }) {
  return <div data-testid="spinner" className={`animate-spin rounded-full border-b-2 border-green-500`} style={{ width: dimension, height: dimension }}></div>
}

function LoaderContent() {
  return (
    <div data-testid="loader" className="flex justify-center items-center bg-transparent absolute left-1/2 top-1/2">
      <Spinner dimension={60} />
    </div>
  )
}

export default function Loader() {
  return <>
    {createPortal(<LoaderContent />, document.body)}
  </>
}