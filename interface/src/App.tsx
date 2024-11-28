import { useState } from 'react'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './components/ui/table'
import { Search, PlusCircle } from 'lucide-react'
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@radix-ui/react-dialog'
import { DialogFooter } from './components/ui/dialog'

interface Driver {
  id: number;
  name: string;
  description: string;
  vehicle: string;
  rating: number;
  price: number;
}

const drivers: Driver[] = [
  { id: 1, name: 'Brian', description: 'Good Driver', vehicle: 'Nissan Skilen', rating: 4.5, price: 100 },
  { id: 2, name: 'John', description: 'Experienced Driver', vehicle: 'Honda Civic', rating: 4.7, price: 120 },
];

const App: React.FC = () => {
  // const [count, setCount] = useState(0)
  const [showTable, setShowTable] = useState<boolean>(false);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);

  const handleSearch = () => {
    setShowTable(true);
  };

  const handleRowClick = (driver: Driver) => {
    setSelectedDriver(driver);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold">Chame um motorista</h1>
      <form className="flex items-center gap-2 mt-1">
        <Input name="id" placeholder="Digite seu local de saída"/>
        <Input name="id" placeholder="Digite seu local de destino"/>
        <Button
          className="p-3"
          type="button"
          variant="outline"
          onClick={handleSearch}
        >
          <Search className='w-4 h-4 mr-2'/>
          Buscar motoristas
        </Button>

        <Button
          className="p-2"
          type="button"
          disabled={!selectedDriver}
        >
          <PlusCircle className='w-4 h-4 mr-2'/>
          Confirmar Viagem
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
                <TableRow key={driver.id} onClick={() => handleRowClick(driver)} className="cursor-pointer">
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
        <Dialog 
          open={Boolean(selectedDriver)}onOpenChange={(open) => !open && setSelectedDriver(null)}>
          <DialogContent>
            <DialogTitle>{selectedDriver.name}</DialogTitle>
            <DialogDescription>
              <p>{selectedDriver.description}</p>
              <p><strong>Veículo:</strong> {selectedDriver.vehicle}</p>
              <p><strong>Avaliação:</strong> {selectedDriver.rating}</p>
              <p><strong>Valor da viagem:</strong> R$ {selectedDriver.price}</p>
            </DialogDescription>
            <DialogFooter>
              <Button onClick={() => setSelectedDriver(null)}>Fechar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

export default App;