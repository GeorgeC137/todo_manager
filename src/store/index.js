import { createStore } from 'vuex'

// Import todos module 
import todos from './modules/todos'

// Create store 
const store = createStore({
    modules: {
        todos
    }
})

export default store
