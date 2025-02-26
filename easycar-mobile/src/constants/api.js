import axios from 'axios'
import { Alert } from 'react-native'

const api = axios.create({
    baseURL: 'http://localhost:3000', // Troque localhost pelo endereço IP, ou hospede a API do backend e troque pela url gerada
    timeout: 10_000
})

function HandleError(error) {
    if (error.response?.data.error) {
        Alert.alert(error.response?.data.error)
    } else {
        Alert.alert('Ocorreu um erro. Tente novamente mais tarde!')
    }
}

export { api, HandleError }