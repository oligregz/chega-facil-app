import { useState } from 'react'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './components/ui/table'
import { Search, PlusCircle } from 'lucide-react'

const App: React.FC = () => {
  // const [count, setCount] = useState(0)
  const [showTable, setShowTable] = useState<boolean>(false);

  const handleSearch = () => {
    setShowTable(true);
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
          disabled
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
              {Array.from({ length: 10 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell>Brian</TableCell>
                  <TableCell>Good Driver</TableCell>
                  <TableCell>Nissan Skilen</TableCell>
                  <TableCell>4.5</TableCell>
                  <TableCell>R$ {i}2</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

export default App;