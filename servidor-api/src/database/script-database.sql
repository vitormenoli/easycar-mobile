create table users(
    user_id		integer not null primary key AUTOINCREMENT,
    name 		varchar(50),
	phone		varchar(100),
	email		varchar(100),
	password	varchar(100)
);

create table rides(
    ride_id		integer not null primary key AUTOINCREMENT,
	passenger_user_id integer,
    pickup_address varchar(100),
	pickup_date   datetime,
	pickup_latitude varchar(50),
	pickup_longitude varchar(50),
	dropoff_address varchar(100),
	status		char(1), /*  P=Pendente  A=Corrida Aceita  F=Finalizada  */
	driver_user_id integer	
);

