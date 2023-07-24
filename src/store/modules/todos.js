import axios from 'axios'

const state = {
    todos: []
}

const getters = {
    allTodos: (state) => state.todos
}

const actions = {
    async fetchTodos({ commit }) {
        const response = await axios.get('api/todos')

        commit('setTodos', response.data)
    },
    async addTodo({ commit }, title) {
        const response = await axios.post('api/todos', {
            title, completed: false
        }) 

        commit('newTodo', response.data)
    },
    async deleteTodo({ commit }, id) {
        await axios.delete(`api/todos/${id}`)

        commit('removeTodo', id)
    },
    async filterTodos({ commit }, e) {
        // Get the selected number 
        const limit = parseInt(e.target.options[e.target.options.selectedIndex].innerText)

        const response = await axios.get(`api/todos?_limit=${limit}`)

        commit('setTodos', response.data)
    },
    async updTodo({ commit }, updTodo) {
        const response = await axios.put(`api/todos/${updTodo.id}`, updTodo)

        // console.log(response.data)

        commit('updateTodo', response.data)
    }
}

const mutations = {
    setTodos: (state, todos) => (state.todos = todos),

    newTodo: (state, todo) => state.todos.unshift(todo),

    removeTodo: (state, id) => state.todos = state.todos.filter(todo => todo.id !== id),

    updateTodo: (state, updTodo) => {
        // Maintain the same position 
        const index = state.todos.findIndex(todo => todo.id === updTodo.id)

        // Check if index exists 
        if(index !== -1)
        {
            state.todos.splice(index, 1, updTodo)
        }
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}