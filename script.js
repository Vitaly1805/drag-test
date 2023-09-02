const cell = document.querySelector('.cell')
let isDraggable = false
let cellOffsetY = 0
let cellOffsetX = 0
let currentTop = localStorage.getItem('currentTop') ?? 0
let currentLeft = localStorage.getItem('currentLeft') ?? 0
let currentColumn

document.addEventListener('DOMContentLoaded', () => {
    if(!isDragCoords()) {
        const column = cell.closest('.column')
        currentTop = column.pageY
        currentLeft = column.pageX
    }

    cell.style.top = `${currentTop}px`
    cell.style.left = `${currentLeft}px`
})

cell.addEventListener('mousedown', dragStart)
cell.addEventListener('touchstart', (event) => {
    prepareTouchToMouse(event)
    dragStart(event)
})

document.addEventListener('mousemove', dragMove)
cell.addEventListener('touchmove', (event) => {
    prepareTouchToMouse(event)
    dragMove(event)
})

cell.addEventListener('mouseup', dragEnd)
cell.addEventListener('touchend', dragEnd)

window.addEventListener('resize', () => {
    if(currentColumn) {
        moveCellToColumn()
    }
})

function dragStart(event) {
    cellOffsetY = event.offsetY
    cellOffsetX = event.offsetX
    isDraggable = true
}

function dragMove(event) {
    event.preventDefault()
    
    if(isDraggable) {
        moveAt(event.pageX - cellOffsetX, event.pageY - cellOffsetY)
        resetColumnHover()

        const elementFromPoint = getElementFromPoint(event.pageX, event.pageY)

        if(isColumnRelative(elementFromPoint)) {
            setColumnHover(elementFromPoint)
        }
    }
}

function dragEnd() {
    isDraggable = false

    if(currentColumn) {
        moveCellToColumn()
    }

    currentColumn.classList.remove('column_hover')
}

function moveAt(pageX, pageY) {
    currentTop = pageY
    currentLeft = pageX
    cell.style.top = `${currentTop}px`
    cell.style.left = `${currentLeft}px`
}

function isColumnRelative(element) {
    return element ? element.closest('.droppable') : false
}

function setColumnHover(column) {
    if(!!column) {
        currentColumn = column
        currentColumn.classList.add('column_hover')
    }
}

function getElementFromPoint(pageX, pageY) {
    cell.hidden = true
    const elementFromPoint = document.elementFromPoint(pageX, pageY)
    cell.hidden = false

    return elementFromPoint
}

function resetColumnHover() {
    if(currentColumn) {
        currentColumn.classList.remove('column_hover')
    }
}

function moveCellToColumn() {
    currentColumn.append(cell)
    const coords = currentColumn.getBoundingClientRect()
    moveAt(coords.left, coords.top)
    localStorage.setItem('currentTop', currentTop)
    localStorage.setItem('currentLeft', currentLeft)
}

function prepareTouchToMouse(event) {
    const touch = event.targetTouches[0]
    const target = event.target

    event.offsetX = touch.pageX - target.offsetLeft
    event.offsetY = touch.pageY - target.offsetTop

    event.pageX = touch.pageX
    event.pageY = touch.pageY
}


function isDragCoords() {
    return !!currentTop && !!currentLeft
}