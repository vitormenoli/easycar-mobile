import repositoryRide from "../repositories/repository.ride.js"

async function List(passenger_user_id, pickup_date, ride_id, driver_user_id, status, status_not) {

    const rides = await repositoryRide.List(passenger_user_id, pickup_date, ride_id, driver_user_id, status, status_not)

    return rides
}

async function Insert(passenger_user_id, pickup_address, pickup_latitude, pickup_longitude, dropoff_address) {


    const dt = new Date().toISOString('pt-BR', { timeSone: 'America/Sao_Paulo' }).substring(0, 10)
    const searchRides = await List(passenger_user_id, dt, null, null, null, "F")

    if (searchRides.length > 0) {
        throw "Você já possui uma carona em andamento!"
    }

    const ride = await repositoryRide.Insert(passenger_user_id, pickup_address, pickup_latitude, pickup_longitude, dropoff_address)

    return ride
}

async function Delete(ride_id) {

    const ride = await repositoryRide.Delete(ride_id)

    return ride
}

async function Finish(ride_id, passenger_user_id) {

    const ride = await repositoryRide.Finish(ride_id, passenger_user_id)

    return ride
}

async function ListForDriver(driver_user_id) {

    const rides = await repositoryRide.ListForDriver(driver_user_id)

    return rides
}

async function Accept(ride_id, driver_user_id) {

    const dt = new Date().toISOString('pt-BR', { timeSone: 'America/Sao_Paulo' }).substring(0, 10)
    const searchRides = await List(null, dt, null, driver_user_id, 'A', null)
    
    if (searchRides.length > 0) {
        throw `Você já possui uma carona em andamento com: ${searchRides[0].passenger_name}`
    }

    const ride = await repositoryRide.Accept(ride_id, driver_user_id)

    return ride
}

async function Cancel(ride_id) {

    const ride = await repositoryRide.Cancel(ride_id)

    return ride
}


export default { List, Insert, Delete, Finish, ListForDriver, Accept, Cancel }