const cell = document.querySelector('.cell')
let isDraggable = false
let cellOffsetY = 0
let cellOffsetX = 0
let currentTop = 0
let currentLeft = 0
let currentColumn

document.addEventListener('DOMContentLoaded', () => {
    cell.style.top = `${localStorage.getItem('currentTop')}px`
    cell.style.left = `${localStorage.getItem('currentLeft')}px`
})

cell.addEventListener('mousedown', (event) => {
    cellOffsetY = event.offsetY
    cellOffsetX = event.offsetX
    isDraggable = true
})

document.addEventListener('mousemove', (event) => {
    if(isDraggable) {
        moveAt(event.pageX - cellOffsetX, event.pageY - cellOffsetY)
        resetColumnHover()

        const elementFromPoint = getElementFromPoint(event.pageX, event.pageY)

        if(isColumnRelative(elementFromPoint)) {
            setColumnHover(elementFromPoint)
        }
    }
})

cell.addEventListener('mouseup', (event) => {
    isDraggable = false

    if(currentColumn) {
        moveCellToColumn()
    }

    localStorage.setItem('currentTop', currentTop)
    localStorage.setItem('currentLeft', currentLeft)
})

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
    currentColumn = column
    currentColumn.classList.add('column_hover')
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
    const coords = currentColumn.getBoundingClientRect()
    moveAt(coords.left, coords.top)
}
