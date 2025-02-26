import { Text, TextInput, View } from "react-native"
import MyButton from "../../components/mybutton/mybutton"
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps"
import { styles } from "./ride-detail.style.js"
import { useEffect, useState } from "react"
import icons from "../../constants/icons.js"
import { api, HandleError } from "../../constants/api.js"

function RideDetail(props) {

  const rideId = props.route.params.rideId
  const userId = props.route.params.userId
  const [title, setTitle] = useState('')
  const [ride, setRide] = useState([])

  async function AcceptRide() {
    const json = {
        driver_user_id: userId
    }

    try {
        const response = await api.put(`/rides/${rideId}/accept`, json)

        if (response.data) {
            props.navigation.goBack()
        }

    } catch (error) {
        HandleError(error)
        props.navigation.goBack()
    }
  }

  async function CancelRide() {
    const json = {
        driver_user_id: userId
    }

    try {
        const response = await api.put(`/rides/${rideId}/cancel`, json)

        if (response.data) {
            props.navigation.goBack()
        }

    } catch (error) {
        HandleError(error)
        props.navigation.goBack()
    }
  }

  async function RequestRideDetail() {
    try {
        const response = await api.get(`/rides/${rideId}`)

        if (response.data) {
            setRide(response.data)
            setTitle(`${response.data.passenger_name} - ${response.data.passenger_phone}`)
        }

    } catch (error) {
        HandleError(error)
        props.navigation.goBack()
    }
  }

  useEffect(() => {
    RequestRideDetail()
  }, [])

  return (
    <View style={styles.container}>
        <MapView
            style={styles.map}
            provider={PROVIDER_DEFAULT}
            initialRegion={{
                latitude: Number(ride.pickup_latitude),
                longitude: Number(ride.pickup_longitude),
                latitudeDelta: 0.004,
                longitudeDelta: 0.004
            }}
        >
            <Marker
                coordinate={{
                    latitude: Number(ride.pickup_latitude),
                    longitude: Number(ride.pickup_longitude),
                }}
                title={ride.passenger_name}
                description={ride.pickup_address}
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
                    value={ride.pickup_address}
                    editable={false}
                />
            </View>

            <View style={styles.footerFields}>
                <Text>Destino</Text>
                <TextInput
                    style={styles.input}
                    value={ride.dropoff_address}
                    editable={false}
                />
            </View>
        </View>

        {ride.status == 'P' && <MyButton text="ACEITAR" theme="default" onClick={AcceptRide} />}
        {ride.status == 'A' && <MyButton text="CANCELAR" theme="red" onClick={CancelRide} />}

    </View>
  )
}

export default RideDetail