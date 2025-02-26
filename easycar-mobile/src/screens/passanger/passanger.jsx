import { ActivityIndicator, Alert, Text, TextInput, View } from "react-native"
import MyButton from "../../components/mybutton/mybutton"
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps"
import { styles } from "./passanger.style.js"
import { useEffect, useState } from "react"
import icons from "../../constants/icons.js"
import { getCurrentPositionAsync, requestForegroundPermissionsAsync, reverseGeocodeAsync } from "expo-location"
import { api, HandleError } from "../../constants/api.js"

function Passanger(props) {
  const userId = 1
  const [myLocation, setMyLocation] = useState({})
  const [title, setTitle] = useState('')
  const [pickupAddress, setPickupAddress] = useState('')
  const [dropoffAdress, setDropoffAdress] = useState('')
  const [status, setStatus] = useState('')
  const [rideId, setRideId] = useState(0)
  const [driverName, setDriverName] = useState('')

  async function RequestRideFromUser() {

    try {
        const response = await api.get('/rides', {
            params: {
                passenger_user_id: userId,
                pickup_date: new Date().toISOString('pt-BR', { timeSone: 'America/Sao_Paulo' }).substring(0, 10),
                status_not: 'F'
            }
        })

        if (response.data[0]) {
            return response.data[0]
        } else {
            return {}
        }

    } catch (error) {
        HandleError(error)
        props.navigation.goBack()
    }

    return response
  }

  async function RequestPermissionAndGetLocation() {

    const { granted } = await requestForegroundPermissionsAsync()

    if (granted) {
        const currentPosition = await getCurrentPositionAsync()
        
        if (currentPosition.coords)
            return currentPosition.coords
        else
            return {}
    } else {
        return {}
    }

  }

  async function RequestAddressName(lat, long) {
    const response = await reverseGeocodeAsync({
        latitude: lat,
        longitude: long
    })

    if (response[0].street && response[0].streetNumber && response[0].district) {
        setPickupAddress(`${response[0].street}, ${response[0].streetNumber} - ${response[0].district}`)
    }
  }

  async function LoadScreen() {
    const response = await RequestRideFromUser()

    if (!response.ride_id) {
        const location = await RequestPermissionAndGetLocation()

        if (location.latitude) {
            setTitle('Encontre a sua carona agora')
            setMyLocation(location)
            RequestAddressName(location.latitude, location.longitude)
        } else {
            Alert.alert('Não foi possível obter sua localização')
        }
    } else {
        setTitle(response.status == 'P' ? 'Aguardando uma carona...' : 'Carona confirmada')
        setMyLocation({
            latitude: Number(response.pickup_latitude),
            longitude: Number(response.pickup_longitude)
        })
        setPickupAddress(response.pickup_address)
        setDropoffAdress(response.dropoff_address)
        setStatus(response.status)
        setRideId(response.ride_id)
        setDriverName(`${response.driver_name} - ${response.driver_phone}`)
    }
  }

  async function AskForRide() {
      try {
        const json = {
            passenger_user_id: userId,
            pickup_address: pickupAddress,
            dropoff_address: dropoffAdress,
            pickup_latitude: myLocation.latitude,
            pickup_longitude: myLocation.longitude
        }

        if (!pickupAddress || !dropoffAdress) return Alert.alert('Por favor preencha todos os campos')

        const response = await api.post('/rides', json)

        if (response.data) props.navigation.goBack()

    } catch (error) {
        HandleError(error)
    }
  }

  async function CancelRide() {
    try {
        const response = await api.delete(`/rides/${rideId}`)

        if (response.data) props.navigation.goBack()

    } catch (error) {
        HandleError(error)
    }
  }

  async function FinishRide() {
    const json = {
        passenger_user_id: userId
    }

    try {
        const response = await api.put(`/rides/${rideId}/finish`, json)

        if (response.data) props.navigation.goBack()

    } catch (error) {
        HandleError(error)
    }
  }

  useEffect(() => {
    LoadScreen()
  }, [])

  return (
    <View style={styles.container}>

        {myLocation.latitude ? <>
            <MapView
            style={styles.map}
            provider={PROVIDER_DEFAULT}
            initialRegion={{
                latitude: myLocation.latitude,
                longitude: myLocation.longitude,
                latitudeDelta: 0.004,
                longitudeDelta: 0.004
            }}
        >
            <Marker
                coordinate={{
                    latitude: myLocation.latitude,
                    longitude: myLocation.longitude,
                }}
                title='Heber Stein Mazutti'
                description='Av. Paulista, 1500'
                image={icons.location}
                style={styles.marker}
            />
        </MapView>

        <View style={styles.footer}>
            <View style={styles.footerText}>
                <Text>{title}</Text>
            </View>

            <View style={styles.footerFields}>
                <Text>Origem</Text>
                <TextInput
                    style={styles.input}
                    value={pickupAddress} onChangeText={(text) => setPickupAddress(text)}
                    editable={status == '' ? true : false}
                />
            </View>

            <View style={styles.footerFields}>
                <Text>Destino</Text>
                <TextInput
                    style={styles.input}
                    value={dropoffAdress} onChangeText={(text) => setDropoffAdress(text)}
                    editable={status == '' ? true : false}
                />
            </View>

            {status == 'A' &&
            <View style={styles.footerFields}>
            <Text>Motorista</Text>
            <TextInput
                style={styles.input}
                value={driverName}
                editable={false}
            />
            </View>
            }

        </View>
        {status == '' && <MyButton text="CONFIRMAR" theme="default" onClick={AskForRide} />}
        {status == 'P' && <MyButton text="CANCELAR" theme="red" onClick={CancelRide} />}
        {status == 'A' && <MyButton text="FINALIZAR CARONA" theme="red" onClick={FinishRide} />}
        
        </> : <>
            <View style={styles.loading}>
                <ActivityIndicator size="large" />
            </View>
        </>}
    </View>
  )
}

export default Passanger