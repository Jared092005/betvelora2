import { useRef } from 'react'

function DraggableCarousel({ children, className = '' }) {
  const scrollRef = useRef(null)
  const dragRef = useRef({ dragging: false, startX: 0, scrollLeft: 0, moved: false })

  const handlePointerDown = (event) => {
    if (event.pointerType === 'touch') return

    const element = scrollRef.current
    if (!element) return

    dragRef.current = {
      dragging: true,
      startX: event.clientX,
      scrollLeft: element.scrollLeft,
      moved: false,
    }
  }

  const handlePointerMove = (event) => {
    if (!dragRef.current.dragging || !scrollRef.current) return

    const distance = event.clientX - dragRef.current.startX
    if (Math.abs(distance) > 6) dragRef.current.moved = true
    scrollRef.current.scrollLeft = dragRef.current.scrollLeft - distance
  }

  const stopDragging = () => {
    dragRef.current.dragging = false
  }

  const handleClickCapture = (event) => {
    if (!dragRef.current.moved) return

    event.preventDefault()
    event.stopPropagation()
    dragRef.current.moved = false
  }

  return (
    <div
      ref={scrollRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={stopDragging}
      onPointerLeave={stopDragging}
      onPointerCancel={stopDragging}
      onDragStart={(event) => event.preventDefault()}
      onClickCapture={handleClickCapture}
      className={`no-scrollbar flex cursor-grab snap-x snap-proximity gap-2 overflow-x-auto overscroll-x-contain pb-1 active:cursor-grabbing ${className}`}
    >
      {children}
    </div>
  )
}

export default DraggableCarousel
