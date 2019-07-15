var conn = new Mongo();
var db = conn.getDB("house-search");

db.houses.insertOne({
    Rent: 460,
    Price: 800000,
    LandSize: '500 sqm',
    Address: {
        Line1: '65',
        Line2: 'Girraween Road',
        Suburb: 'Girraween',
        Postcode: '2145',
        State: 'NSW'
    },
    Schools: [
        {
            Name: 'Girraween Public School',
            Type: 'Public',
            Address: {
                Line1: '10',
                Line2: 'Bando Street',
                Suburb: 'Girraween',
                Postcode: '2145',
                State: 'NSW'
            }
        }
    ],
    Stations: [
        {
            Name: 'Pendle Hill Station',
            IsParkingAvailable: true
        }
    ],
    BusStops: [
        {
            Name: 'After Girraween Road',
            Suburb: 'Toongabie'
        }
    ]
});