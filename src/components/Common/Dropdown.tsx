import styled from '@emotion/styled'
import useOutsideClick from 'hooks/useOutsideClick'
import { useState, useCallback, useEffect, useRef } from 'react'

type DropdownProps = {
  initLabel: string
  items: DropdownItem[]
  isSelected?: (item: DropdownItem) => void
}
type DropdownItem = {
  label: string
  value: string
}
const DropdownWrapper = styled.div`
  position: relative;
  font-size: 14px;
`
const DropdownButton = styled.button<{ isOpen: boolean }>`
  position: relative;
  display: block;
  width: 100%;
  padding: 10px 12px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 3px;
  text-align: left;
  line-height: 1;
  z-index: 10;
  &:after {
    content: '';
    position: absolute;
    right: 6px;
    top: 0;
    bottom: 0;
    margin: auto 0;
    display: inline-block;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 6px 5px 0px 5px;
    border-color: #7c7c7c transparent transparent transparent;
    border-radius: 3px;
    ${({ isOpen }) => isOpen && 'transform: rotate(-180deg)'};
    transition: transform 0.2s;
  }
`
type DropdownListProps = {
  isOpen: boolean
  height: number
  dropUp: boolean
}
const DropdownList = styled.ul<DropdownListProps>`
  position: absolute;
  ${({ dropUp }) => (dropUp ? 'bottom: 0;' : 'top: 0;')}
  overflow: hidden;
  min-width: 100%;
  max-height: 0;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  list-style: none;
  opacity: 0;
  box-sizing: border-box;
  pointer-events: none;
  ${({ isOpen, height, dropUp }) =>
    isOpen &&
    `
		${dropUp ? 'bottom: 100%; margin-bottom: 4px;' : 'top: 100%; margin-top: 4px;'}
		max-height:${height}px;
		border: 1px solid #ddd;
		opacity:1;
		pointer-events:auto;
	`};
  transition: ${({ dropUp }) => (dropUp ? 'bottom' : 'top')} 0.2s,
    opacity 0.25s ease;
`
const DropdownItem = styled.li`
  padding: 8px 12px;
  cursor: pointer;
  &:hover {
    background: #f8f8f8;
  }
`

function Dropdown({ initLabel, items, isSelected }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const listRef = useRef<HTMLUListElement>(null)
  const [listHeight, setListHeight] = useState(0)
  const [dropUp, setDropUp] = useState(false)
  const [selected, setSelected] = useState<DropdownItem | null>(null)

  const onClose = useCallback(() => {
    setIsOpen(false)
  }, [])

  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  const itemHandler = (item: DropdownItem) => {
    setIsOpen(false)
    setSelected(item)
    isSelected?.(item)
  }

  const buttonHandler = () => {
    if (!isOpen && listRef.current && dropdownRef.current) {
      const listH = listRef.current.scrollHeight
      setListHeight(listH)
      const dropdownBottom = dropdownRef.current.getBoundingClientRect().bottom
      // window 뷰포트 - bottom 위치 = 여유공간
      const bottomOffset = window.innerHeight - dropdownBottom
      setDropUp(bottomOffset < listH + 8)
    }
    setIsOpen(prev => !prev)
  }

  const dropdownRef = useOutsideClick<HTMLDivElement>(onClose, {
    enabled: isOpen,
  })

  return (
    <DropdownWrapper ref={dropdownRef}>
      <DropdownButton isOpen={isOpen} onClick={buttonHandler}>
        {selected ? selected.label : initLabel}
      </DropdownButton>

      <DropdownList
        ref={listRef}
        height={listHeight}
        isOpen={isOpen}
        dropUp={dropUp}
      >
        {items.map(item => (
          <DropdownItem key={item.value} onClick={() => itemHandler(item)}>
            {item.label}
          </DropdownItem>
        ))}
      </DropdownList>
    </DropdownWrapper>
  )
}

export default Dropdown
