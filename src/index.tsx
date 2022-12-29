import { createRoot } from 'react-dom/client'
import App from '~/components/App'

const container = document.getElementById('app')

if (!container) throw new Error('Oops, root element is missing.')

const root = createRoot(container)
/**
 * NOTE: Strict Modeを意図的に外している
 *
 * @see {@link https://stackoverflow.com/questions/60029734/react-beautiful-dnd-i-get-unable-to-find-draggable-with-id-1}
 * @see {@link https://github.com/atlassian/react-beautiful-dnd/issues/1673}
 */
root.render(<App />)
