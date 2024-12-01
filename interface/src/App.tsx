import { useState } from 'react'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './components/ui/table'
import { Search } from 'lucide-react'
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogFooter } from './components/ui/dialog'

interface Driver {
  id: number;
  name: string;
  description: string;
  vehicle: string;
  rating: number;
  price: number;
}

interface Trip {
  driverName: string;
  departure: string;
  destination: string;
  date: string;
  time: string;
  distance: string;
  duration: string;
  price: number;
}

const drivers: Driver[] = [
  { id: 1, name: 'Brian', description: 'Good Driver', vehicle: 'Nissan Skilen', rating: 4.5, price: 100 },
  { id: 2, name: 'John', description: 'Experienced Driver', vehicle: 'Honda Civic', rating: 4.7, price: 120 },
];

const initialTrips: Trip[] = [
  {
    driverName: 'Brian',
    departure: 'Centro',
    destination: 'Aeroporto',
    date: '2024-11-25',
    time: '10:30',
    distance: '15 km',
    duration: '20 min',
    price: 100
  },
  {
    driverName: 'John',
    departure: 'Shopping',
    destination: 'Praia',
    date: '2024-11-26',
    time: '14:00',
    distance: '30 km',
    duration: '40 min',
    price: 120
  },
  {
    driverName: 'Brian',
    departure: 'Estádio',
    destination: 'Centro',
    date: '2024-11-27',
    time: '18:15',
    distance: '10 km',
    duration: '15 min',
    price: 80
  }
];

const App: React.FC = () => {
  const [showTable, setShowTable] = useState<boolean>(false);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [selectedDriverData, setSelectedDriverData] = useState<Driver | null>(null);
  const [isTripSaved, setIsTripSaved] = useState<boolean>(false);
  const [isDriverDataVisible, setIsDriverDataVisible] = useState<boolean>(false);
  const [isTitleVisible, setIsTitleVisible] = useState<boolean>(true);
  const [tripSearchTerm, setTripSearchTerm] = useState<string>('');
  const [driverIdFilter, setDriverIdFilter] = useState<string>('');

  const [departure, setDeparture] = useState<string>('');
  const [destination, setDestination] = useState<string>('');

  const [userChoice, setUserChoice] = useState<string | null>(null);
  
  const [trips, setTrips] = useState<Trip[]>(initialTrips);

  const [isTripsTableVisible, setIsTripsTableVisible] = useState<boolean>(false);

  const isSearchButtonDisabled = !departure || !destination;

  const handleSearch = () => {
    if (!departure || !destination) {
      alert('Preencha os campos');
    } else {
      setShowTable(true);
    }
  };

  const handleRowClick = (driver: Driver) => {
    setSelectedDriver(driver);
  };

  const handleCloseModal = () => {
    setSelectedDriver(null);
  };

  const handleTripSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTripSearchTerm(e.target.value);
  };

  const handleDriverIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDriverIdFilter(e.target.value);
  };

  const handleConfirmTrip = () => {
    if (selectedDriver) {
      const newTrip: Trip = {
        driverName: selectedDriver.name,
        departure: departure,
        destination: destination,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        distance: '20 km',
        duration: '30 min',
        price: selectedDriver.price,
      };

      const updatedTrips = [...trips, newTrip];
      setTrips(updatedTrips);
      setSelectedDriverData(selectedDriver);
      setSelectedDriver(null);
      setIsTripSaved(true);
      setIsDriverDataVisible(true);

      setTimeout(() => {
        setIsTripSaved(false);
        setIsDriverDataVisible(false);
      }, 2000);
    }
  };

  const handleDepartureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeparture(e.target.value);
    if (!e.target.value || !destination) {
      setShowTable(false);
    }
  };

  const handleDestinationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDestination(e.target.value);
    if (!departure || !e.target.value) {
      setShowTable(false);
    }
  };

  const showSearchFlow = () => {
    setUserChoice("search");
    setDeparture('');
    setDestination('');
    setShowTable(false);
    setIsTitleVisible(false);
  };

  const showMyTrips = () => {
    setUserChoice("myTrips");
    setIsTitleVisible(false);
    setTripSearchTerm('');
  };

  const handleBackToMenu = () => {
    setUserChoice(null);
    setIsTitleVisible(true);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {isTitleVisible && (
        <h1 className="text-2xl font-bold">Escolha o que deseja fazer</h1>
      )}

      {userChoice === null && (
        <div className="mt-4">
          <Button onClick={showSearchFlow} className="w-full mb-4" variant="outline">
            Quero chegar fácil ao meu destino
          </Button>
          <Button onClick={showMyTrips} className="w-full" variant="outline">
            Minhas viagens
          </Button>
        </div>
      )}

      {userChoice === "search" && (
        <div>
          <h1 className="text-2xl font-bold">Chame um motorista</h1>
          <form className="flex items-center gap-2 mt-1">
            <Input
              name="departure"
              placeholder="Digite seu local de saída"
              value={departure}
              onChange={handleDepartureChange}
            />
            <Input
              name="destination"
              placeholder="Digite seu local de destino"
              value={destination}
              onChange={handleDestinationChange}
            />
            <Button
              className="p-3"
              type="button"
              variant="outline"
              onClick={handleSearch}
              disabled={isSearchButtonDisabled}
            >
              <Search className="w-4 h-4 mr-2" />
              Buscar motoristas
            </Button>
          </form>

          {showTable && (
            <div className="border rounded-lg p-4 mt-8">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Veículo</TableHead>
                    <TableHead>Avaliação</TableHead>
                    <TableHead>Valor da viagem</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {drivers.map((driver) => (
                    <TableRow
                      key={driver.id}
                      onClick={() => handleRowClick(driver)}
                      className="cursor-pointer"
                    >
                      <TableCell>{driver.name}</TableCell>
                      <TableCell>{driver.description}</TableCell>
                      <TableCell>{driver.vehicle}</TableCell>
                      <TableCell>{driver.rating}</TableCell>
                      <TableCell>R$ {driver.price}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {selectedDriver && (
            <Dialog open={Boolean(selectedDriver)} onOpenChange={(open) => !open && handleCloseModal()}>
              <DialogContent>
                <DialogTitle>{selectedDriver.name}</DialogTitle>
                <DialogDescription>
                  <p>{selectedDriver.description}</p>
                  <p><strong>Veículo:</strong> {selectedDriver.vehicle}</p>
                  <p><strong>Avaliação:</strong> {selectedDriver.rating}</p>
                  <p><strong>Valor da viagem:</strong> R$ {selectedDriver.price}</p>
                </DialogDescription>
                <DialogFooter>
                  <Button onClick={handleCloseModal}>Fechar</Button>
                  <Button onClick={handleConfirmTrip}>Chegar fácil</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}

          {isDriverDataVisible && selectedDriverData && (
            <div className="mt-8 p-4 border rounded-lg">
              <h2 className="text-xl font-semibold">Dados do Motorista Selecionado</h2>
              <p><strong>Nome:</strong> {selectedDriverData.name}</p>
              <p><strong>Descrição:</strong> {selectedDriverData.description}</p>
              <p><strong>Veículo:</strong> {selectedDriverData.vehicle}</p>
              <p><strong>Avaliação:</strong> {selectedDriverData.rating}</p>
              <p><strong>Valor da Viagem:</strong> R$ {selectedDriverData.price}</p>
            </div>
          )}

          {isTripSaved && (
            <div className="mt-4 p-4 bg-green-200 text-green-800 rounded-lg">
              <p><strong>Viagem requisitada com sucesso!</strong></p>
            </div>
          )}

          <Button onClick={handleBackToMenu} className="mt-4" variant="outline">
            Voltar
          </Button>
        </div>
      )}

      {userChoice === "myTrips" && (
        <div>
          <h2 className="text-2xl font-bold">Minhas viagens</h2>
          
          <div className="flex items-center gap-2 mt-4 mb-4">
            <Input
              placeholder="Buscar por motorista, origem, destino ou data"
              value={tripSearchTerm}
              onChange={handleTripSearchChange}
            />
            <Input
              placeholder="ID do motorista"
              value={driverIdFilter}
              onChange={handleDriverIdChange}
            />
            <Button
              className="p-3"
              type="button"
              variant="outline"
              disabled={!tripSearchTerm.trim()}
              onClick={() => setIsTripsTableVisible(true)}
            >
              <Search className="w-4 h-4 mr-2" />
              Buscar
            </Button>
          </div>

          {isTripsTableVisible && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Motorista</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Hora</TableHead>
                  <TableHead>Origem</TableHead>
                  <TableHead>Destino</TableHead>
                  <TableHead>Distância</TableHead>
                  <TableHead>Duração</TableHead>
                  <TableHead>Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {trips.map((trip, index) => (
                  <TableRow key={index}>
                    <TableCell>{trip.driverName}</TableCell>
                    <TableCell>{trip.date}</TableCell>
                    <TableCell>{trip.time}</TableCell>
                    <TableCell>{trip.departure}</TableCell>
                    <TableCell>{trip.destination}</TableCell>
                    <TableCell>{trip.distance}</TableCell>
                    <TableCell>{trip.duration}</TableCell>
                    <TableCell>R$ {trip.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          <Button onClick={handleBackToMenu} className="mt-4" variant="outline">
            Voltar
          </Button>
        </div>
      )}
    </div>
  );
}

export default App;