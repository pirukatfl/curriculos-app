import { defineStore } from 'pinia'

export const dataUser = ({
    id: 'dataUser',
    state: () => ({
        dataUser: null
    }),
    actions: {
        addDataUser(data) {
            this.dataUser = data
        }
    }
})