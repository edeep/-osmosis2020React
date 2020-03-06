

export const subscriptions = [
    {
        subscriptionId: 1,
        subscriptionName: 'Jan 2020 S',
        subscriptionDesc: 'Jan 2020 Sedan',
        subscriptionPrice: '$2500',
        subscriptionStartDate: 'Jan-05-2020',
        subscriptionEndDate: 'Jan-07-2021'
    },
    {
        subscriptionId: 2,
        subscriptionName: 'Dec2019 H',
        subscriptionDesc: 'Dec 2019 Hatchback',
        subscriptionPrice: '$7200',
        subscriptionStartDate: 'Dec-05-2019',
        subscriptionEndDate: 'Dec-07-2020'
    },
    {
        subscriptionId: 3,
        subscriptionName: 'Jan 2020H',
        subscriptionDesc: 'Dec 2019 Hatchback',
        subscriptionPrice: '$6100',
        subscriptionStartDate: 'Jan-01-2020',
        subscriptionEndDate: 'Jan-07-2022'
    }
];


export const services = [
    {
        serviceId: 1,
        servicename: 'Safety connect',
        servicedec: 'Connecting all your safety',
        servicePrice: '$500',
    },
    {
        serviceId: 2,
        servicename: 'Service connect',
        servicedec: 'Connecting all your services',
        servicePrice: '$200',
    },
    {
        serviceId: 3,
        servicename: 'Remote connect',
        servicedec: 'Connecting all your remotes',
        servicePrice: '$100',
    },
    {
        serviceId: 4,
        servicename: 'Navigation connect',
        servicedec: 'Connecting all your navigation',
        servicePrice: '$400',
    },
    {
        serviceId: 5,
        servicename: 'Destination Assist connect',
        servicedec: 'Connecting all your destinations',
        servicePrice: '$100',
    }
]


export const vehicles = [
    {
        vehicleId: 1,
        vehicleName: 'Polo',

    },
    {
        vehicleId: 2,
        vehicleName: 'Toyota Camry',

    },
    {
        vehicleId: 3,
        vehicleName: 'Toyota Corollo',

    },
    {
        vehicleId: 4,
        vehicleName: 'Honda City',

    },
    {
        vehicleId: 5,
        vehicleName: 'Honda Jazz',

    }
];


export const custSubscriptions = [
    {
        subscriptionId: 1,
        subscriptionName: 'Jan 2020 S',
        subscriptionDesc: 'Jan 2020 Sedan',
        subscriptionPrice: '$2500',
        vin:'',
        subscriptionStartDate: 'Jan-05-2020',
        subscriptionEndDate: 'Jan-07-2021'
    },
    {
        subscriptionId: 2,
        subscriptionName: 'Dec2019 H',
        subscriptionDesc: 'Dec 2019 Hatchback',
        subscriptionPrice: '$7200',
        subscriptionStartDate: 'Dec-05-2019',
        subscriptionEndDate: 'Dec-07-2020',
        vin: ''
    },
    {
        subscriptionId: 3,
        subscriptionName: 'Jan 2020H',
        subscriptionDesc: 'Dec 2019 Hatchback',
        subscriptionPrice: '$6100',
        subscriptionStartDate: 'Jan-01-2020',
        subscriptionEndDate: 'Jan-07-2022',
        vin: ''
    }
];

export const custmoerVehicles = [
    {
        vehicleId: 1,
        vin:10000000000000001,
        registationNo:'TN 07 BL 1234',    
        maker: 'Volkswagon',
        model: 'Polo',
        year:'2010'

    },
    {
        vehicleId: 2,
        vin: 10000000000000002,
        registationNo: 'BA 07 BL 4534',
      
        maker: 'Toyota',
        model:'Camry',
        year: '2020'

    },
    {
        vehicleId: 3,
        vin: 10000000000000003,
        registationNo: 'PO 09 AL 1113',
        maker: 'Toyota',
        year: '2018',
        model: 'Corollo',

    },
    {
        vehicleId: 4,
        vin: 10000000000000004,
        registationNo: 'FL 07 XL 2238',
        maker: 'Honda',
        year: '2011',
        model:'City'

    },
    {
        vehicleId: 5,
        vin: 10000000000000005,
        registationNo: 'PG 09 BL 3331',
        maker: 'Honda',
        year: '2011',
        model: 'Civic'

    }
];

export const Custservices = [
    {
        serviceId: 1,
        customerId:1,
        servicename: 'Safety connect',
        servicedec: 'Connecting all your safety',
        servicePrice: '$500',
        vin: '',
        dealerId: '',
        serviceStationId: '',
        serviceRequestedDate: '',
        serviceStartedDate: '',
        serviceCompletedDate: '',
        serviceCustomerComplaints: '',
        servicecomplaintAnalysis: '',
        serviceRepairsDesc: '',
        serviceRepairsCost: '',
        
    },
    {
        serviceId: 2,
        customerId: 1,
        servicename: 'Remote connect',
        servicedec: 'Connecting all your remote',
        servicePrice: '$500',
        vin: '',
        dealerId: '',
        serviceStationId: '',
        serviceRequestedDate: '',
        serviceStartedDate: '',
        serviceCompletedDate: '',
        serviceCustomerComplaints: '',
        servicecomplaintAnalysis: '',
        serviceRepairsDesc: '',
        serviceRepairsCost: '',

    }
]