CRATE TABLE lista_vehiculos(
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL;
    brand TEXT NOT NULL;
    model TEXT NOT NULL;
    year_manufactured INTEGER NOT NULL;
    kms INTEGER NOT NULL;
    color TEXT NOT NULL;
    air_conditioner BOOLEAN NOT NULL;
    passengers INTEGER NOT NULL;
    transmission TEXT NOT NULL;
    created_at DATE DEFAULT (datetime('now')) NOT NULL,
    updated_at DATE DEFAULT (datetime('now')) NOT NULL
);

INSERT INTO lista_vehiculos (brand, model, year_manufactured, kms, air_conditioner, passengers, transmission) VALUES('Audi', 'R8', 2018, 20000, 'Red', 'Yes', 2, 'Automatic');
INSERT INTO lista_vehiculos (brand, model, image, year_manufactured, kms, air_conditioner, passengers, transmission) VALUES('Fiat', 'Duna', 1994, 150000, 'Red', 'No', 4, 'Manual');