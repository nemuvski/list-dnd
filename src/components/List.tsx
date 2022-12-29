import { useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

const DEF_ITEMS: Array<{ id: string; value: string; orderWeight: number }> = [
  {
    id: 'id0',
    value: 'item0',
    orderWeight: 0,
  },
  {
    id: 'id1',
    value: 'item1',
    orderWeight: 1,
  },
  {
    id: 'id2',
    value: 'item2',
    orderWeight: 2,
  },
  {
    id: 'id3',
    value: 'item3',
    orderWeight: 3,
  },
  {
    id: 'id4',
    value: 'item4',
    orderWeight: 4,
  },
  {
    id: 'id5',
    value: 'item5',
    orderWeight: 5,
  },
]

const DND_ID = 'list'

const List = () => {
  const [items, setItems] = useState(DEF_ITEMS)

  return (
    <DragDropContext
      onDragEnd={(result) => {
        console.debug({ result })
        if (result.reason === 'DROP' && result.destination) {
          const nextItems = items.concat()
          const srcIdx = result.source.index
          const destIdx = result.destination.index
          const itemSrc = items[srcIdx]
          const itemDest = items[destIdx]
          const tempOrderWeight = itemSrc.orderWeight
          itemSrc.orderWeight = itemDest.orderWeight
          itemDest.orderWeight = tempOrderWeight
          nextItems[srcIdx] = itemDest
          nextItems[destIdx] = itemSrc
          setItems(nextItems)
        }
      }}
    >
      <Droppable droppableId={DND_ID}>
        {(provided) => (
          <ul {...provided.droppableProps} ref={provided.innerRef}>
            {items.map(({ id, value, orderWeight }, index) => (
              <Draggable key={id} draggableId={id} index={index}>
                {(provided) => (
                  <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    {value}(order:{orderWeight})
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default List
