import { useEffect, useState } from 'react'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './components/ui/table'
import { Search } from 'lucide-react'
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogFooter } from './components/ui/dialog'
import { getDefaultCustomers } from './service/getDefaultCustomers'
import { listDriversDefault } from './service/listDriversVailables'
import { createRide } from './service/createRide'
import { parseStrinForFloat } from './utils/parseStrinForFloat'
import { getHistory } from './service/getHistory'

export interface IReview {
  rating: number;
  comment: string;
}

interface Driver {
  price: ReactNode
  rating: ReactNode
  id: string;
  name: string;
  options: object;
  description: string;
  vehicle: string;
  review: IReview;
  value: string;
}
export interface IRenderTrip {
  driverName: string;
  date: string;
  time: string;
  departure: string;
  destination: string;
  distance: string;
  duration: string;
  value: number;
}

interface ITrip {
  customer_id?: string;
  origin: string;
  driver: {
    id: string;
    name: string;
  }
  destination: string;
  date?: string;
  distance: number;
  duration: string;
  value: number;
}

export interface ICustomerDefault {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}

const App: React.FC = () => {
  const [defaultCustomer, setDefaultCustomer] = useState<ICustomerDefault | undefined>();
  const [showTable, setShowTable] = useState<boolean>(false);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [selectedDriverData, setSelectedDriverData] = useState<Driver | null>(null);
  const [isTripSaved, setIsTripSaved] = useState<boolean>(false);
  const [isDriverDataVisible, setIsDriverDataVisible] = useState<boolean>(false);
  const [isTitleVisible, setIsTitleVisible] = useState<boolean>(true);
  const [tripSearchTerm, setTripSearchTerm] = useState<string>('');
  const [driverIdFilter, setDriverIdFilter] = useState<string>('');
  const [drivers, setDrivers] = useState<Driver[]>([]);

  const [departure, setDeparture] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [duration, setDuration] = useState<string>('');
  const [distance, setDistance] = useState<number>(0);

  const [userChoice, setUserChoice] = useState<string | null>(null);
  
  const [trips, setTrips] = useState<ITrip[]>([]);

  const [isTripsTableVisible, setIsTripsTableVisible] = useState<boolean>(false);

  const isSearchButtonDisabled = !departure || !destination;

  useEffect(() => {
    async function fetchDefaultCustomers() {
      const customers = await getDefaultCustomers();
      setDefaultCustomer(customers[0]);
    }
    
    fetchDefaultCustomers();
  }, []);

  useEffect(() => {
    if (defaultCustomer?.id) {
      setTripSearchTerm(defaultCustomer.id);
    }
  }, [defaultCustomer]);

  const handleSearch = async () => {
    if (departure && destination) {
        const driversAvailables = await listDriversDefault({
          customer_id: defaultCustomer?.id,
          origin: departure,
          destination: destination
        });
      setDrivers(driversAvailables.options);
      setShowTable(true);
      setDistance(driversAvailables.distance)
      setDuration(driversAvailables.duration)
      setDrivers([]);
    }
  };

  useEffect(() => {
    if (drivers.length > 0) {
      console.log("Motoristas:", drivers);
    }
  }, [drivers]);

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

  const handleConfirmTrip = async () => {
    if (selectedDriver) {
      const newTrip: ITrip = {
        customer_id: defaultCustomer?.id,
        origin: departure,
        destination: destination,
        distance: distance,
        duration: duration,
        driver: {
          id: selectedDriver.id,
          name: selectedDriver.name
        },
        value: parseStrinForFloat(selectedDriver.value),
      };
      
      const createdTrip = await createRide(newTrip);

      setSelectedDriverData(createdTrip.success);
      setSelectedDriver(null);
      setIsTripSaved(true);
      setIsDriverDataVisible(createdTrip.success);

      setTimeout(() => {
        setIsTripSaved(false);
        setIsDriverDataVisible(false);
      }, 3000);
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
    if (defaultCustomer?.id) {
      setTripSearchTerm(defaultCustomer.id);
    }
    setUserChoice("myTrips");
    setIsTitleVisible(false);
    setTripSearchTerm('');
  };

  const handleBackToMenu = () => {
    setUserChoice(null);
    setIsTitleVisible(true);
  };

  const handleGetHistoryTripes = async () => {
    setTrips([])
    setIsTripsTableVisible(true)
    const customerId: string = tripSearchTerm;
    const driverId: string = driverIdFilter;

    const historyTripes = await getHistory(customerId, driverId);
    setTrips(historyTripes.rides)
  }

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
            Buscar histórico de viagens
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

          {showTable  && (
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
                      <TableCell>{driver?.name}</TableCell>
                      <TableCell>{driver?.description}</TableCell>
                      <TableCell>{driver?.vehicle}</TableCell>
                      <TableCell>{driver?.review.rating}</TableCell>
                      <TableCell>{driver?.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {selectedDriver && (
            <Dialog open={Boolean(selectedDriver)} onOpenChange={(open) => !open && handleCloseModal()}>
              <DialogContent>
                <DialogTitle>{selectedDriver?.name}</DialogTitle>
                <DialogDescription>
                  <p>{selectedDriver?.description}</p>
                  <p><strong>Veículo:</strong> {selectedDriver?.vehicle}</p>
                  <p><strong>Avaliação:</strong> {selectedDriver?.review.rating}</p>
                  <p><strong>Valor da viagem:</strong> R$ {selectedDriver?.value}</p>
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
              <h2 className="text-xl font-semibold">Você chegará fácil com o motorista:</h2>
              <p><strong>Nome:</strong> {selectedDriverData?.name}</p>
              <p><strong>Descrição:</strong> {selectedDriverData?.description}</p>
              <p><strong>Veículo:</strong> {selectedDriverData?.vehicle}</p>
              <p><strong>Avaliação:</strong> {selectedDriverData?.rating}</p>
              <p><strong>Valor da Viagem:</strong> R$ {selectedDriverData?.price}</p>
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
              placeholder="ID do usuário"
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
              onClick={handleGetHistoryTripes}
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
                  <TableHead>Data/Hora</TableHead>
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
                    <TableCell>{trip.driver.name}</TableCell>
                    <TableCell>{trip.date}</TableCell>
                    <TableCell>{trip.origin}</TableCell>
                    <TableCell>{trip.destination}</TableCell>
                    <TableCell>{trip.distance}</TableCell>
                    <TableCell>{trip.duration}</TableCell>
                    <TableCell>R$ {trip.value}</TableCell>
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