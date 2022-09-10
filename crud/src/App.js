
import React from 'react';
import './App.css';
import {
  Table,
  Button,
  Container,
  Modal,
  ModalBody,
  ModalHeader,
  FormGroup,
  ModalFooter
} from 'reactstrap';

const data = [
  {id:0, personaje:'Sirena', nombre:'Ariel'},
  {id:1, personaje:'Rata', nombre:'Mickey Mouse'},
  {id:2, personaje:'Perro', nombre:'Stich'},
  {id:3, personaje:'Humano', nombre:'Anastacia'},
  {id:4, personaje:'Humano', nombre:'Elsa'},
  {id:5, personaje:'Humano', nombre:'Anna'},
  {id:6, personaje:'Pato', nombre:'Donald'},
  {id:7, personaje:'Mono', nombre:'Abu'},
  {id:8, personaje:'Perro', nombre:'Goofy'},
  {id:9, personaje:'Leon', nombre:'Simba'},
  {id:10, personaje:'Muñeco', nombre:'Olaf'},
];

class App extends React.Component {
  state={
    data: data,
    modalInsertar: false,
    modalEditar:false,
    form: {
      id:'',
      personaje:'',
      nombre:'',
    }
};
handleChange = (e) => {
  this.setState({
    form: {
      ...this.state.form,
      [e.target.name]: e.target.value,
    },
  });
};
mostrarModalInsertar = () => {
  this.setState({modalInsertar:true});
};
ocultarModalInsertar = () => {
   this.setState({modalInsertar:false});
};
mostrarModalEditar = (registro) => {
  this.setState({modalEditar:true,form:registro});
};
ocultarModalEditar = () => {
   this.setState({modalEditar:false});
};

insertar = () => {
  var valorNuevo = {...this.state.form};
  valorNuevo.id = this.state.data.length+1;
  var lista = this.state.data;
  lista.push(valorNuevo);
  this.setState({data:lista, modalInsertar:false});
}
editar = (dato) => {
  var contador = 0;
  var lista = this.state.data;
  lista.map((registro)=>{
    if (dato.id === registro.id){
      lista[contador].personaje=dato.personaje;
      lista[contador].nombre=dato.nombre;
    }
    contador ++;
  });
  this.setState({data:lista,modalEditar:false});
}
eliminar = (dato) => {
  var opcion = window.confirm("Realmente desea eliminar el registro"+dato.id);
  if (opcion){
    var contador = 0;
    var lista = this.state.data;
    lista.map((registro)=>{
      if (registro.id ===dato.id){
        lista.splice(contador,1);
      }
      contador++;
    });
    this.setState({data:lista});
  };
}
  render(){
    return(
      <>
        <Container>
          <br/>
            <Button color='success' onClick={()=>this.mostrarModalInsertar()}>Insertar nuevo personaje</Button>
          <br/>
          <br/>

          <Table>
            <thead>
              <tr>
              <th>Id</th>
              <th>Personaje</th>
              <th>Nombre</th>
              <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((elemento)=>(
                <tr>
                  <td>{elemento.id}</td>
                  <td>{elemento.personaje}</td>
                  <td>{elemento.nombre}</td>
                  <td><Button color='primary' onClick={()=>this.mostrarModalEditar(elemento)}>Editar</Button>{'  '}
                  <Button color='danger' onClick={()=> this.eliminar(elemento)}>Eliminar</Button></td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Modal isOpen={this.state.modalInsertar}> 
            <ModalHeader>
              <div>
                <h3>Insertar Registro</h3>
              </div>
            </ModalHeader>

            <ModalBody>
              <FormGroup>
                <label>Id:</label>
                <input className='form-control' readOnly type='text' value={this.state.data.length+1}/>
              </FormGroup>

              <FormGroup>
                <label>Personaje:</label>
                <input className='form-control' name='personaje' type='text' onChange={this.handleChange}/>
              </FormGroup>

              <FormGroup>
                <label>Nombre</label>
                <input className='form-control' name='nombre' type='text' onChange={this.handleChange}/>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color='primary' onClick={()=>this.insertar()}>Insertar</Button>
              <Button color='danger' onClick={()=>this.eliminar()}>Cancelar</Button>
            </ModalFooter>

          </Modal>
          <Modal isOpen={this.state.modalEditar}> 
            <ModalHeader>
              <div>
                <h3>Insertar Registro</h3>
              </div>
            </ModalHeader>

            <ModalBody>
              <FormGroup>
                <label>Id:</label>
                <input className='form-control' readOnly type='text' value={this.state.form.id} />
              </FormGroup>

              <FormGroup>
                <label>Personaje:</label>
                <input className='form-control' name='personaje' type='text' onChange={this.handleChange} value={this.state.form.personaje}/>
              </FormGroup>

              <FormGroup>
                <label>Nombre</label>
                <input className='form-control' name='nombre' type='text' onChange={this.handleChange} value={this.state
                .form.nombre}/>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color='primary' onClick={()=>this.editar(this.state.form)}>Insertar</Button>
              <Button color='danger'  onClick={()=> this.ocultarModalEditar()}>Cancelar</Button>
            </ModalFooter>
          </Modal>
        </Container>
      </>          
    );
  }
}

export default App
