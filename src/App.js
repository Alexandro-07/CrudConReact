import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Table,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";
import { Api } from "./api/Api";
const data = [
  {
    id: 1,
    producto: "Jabon",
    seccion: "1",
  },
  {
    id: 2,
    producto: "Gel",
    seccion: "2",
  },
  {
    id: 3,
    producto: "Cepillo",
    seccion: "3",
  },
  {
    id: 4,
    producto: "Shampo",
    seccion: "2",
  },
  {
    id: 5,
    producto: "Desodorante",
    seccion: "1",
  },
  {
    id: 6,
    producto: "Crema Dental",
    seccion: "3",
  },
];

class App extends React.Component {
  state = {
    data: [],
    modalActualizar: false,
    modalInsertar: false,
    form: {
      id: "",
      producto: "",
      seccion: "",
    },
  };

  mostrarModalActualizar = (dato) => {
    this.setState({
      form: dato,
      modalActualizar: true,
    });
  };

  cerrarModalActualizar = () => {
    this.setState({
      modalActualizar: false,
    });
  };

  mostrarModalInsertar = () => {
    this.setState({
      modalInsertar: true,
    });
  };

  cerrarModalInsertar = () => {
    this.setState({
      modalInsertar: false,
    });
  };

  Actualizar = async (params) => {
    let { id } = params;
    let res = await Api.put("projects/" + id, params);
    this.setState({
      modalActualizar: false,
    });
    this.getData();
  };

  eliminar = async (dato) => {
    let res = await Api.delete("projects/"+dato.id);
    this.getData();
  };

  insertar = async () => {
    let params = this.state.form;
    let res = await Api.post("projects", params);
    this.setState({
      modalInsertar: false,
    });
    this.getData();
  };

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };
  getData = async () => {
    let { data } = await Api.get("projects");
    this.setState({
      data,
    });
  };
  componentDidMount() {
    this.getData();
  }
  render() {
    return (
      <>
        <Container>
          <br />
          <Button color="primary" onClick={() => this.mostrarModalInsertar()}>
            Nuevo Registro
          </Button>
          <br />
          <br />
          <Table>
            <thead>
              <tr>
                <th> ID </th> <th> Producto </th> <th> Descripción </th>
                <th> Acción </th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((dato) => (
                <tr key={dato.id}>
                  <td> {dato.id} </td> <td> {dato.name} </td>
                  <td> {dato.description} </td>
                  <td>
                    <Button
                      color="info"
                      onClick={() => this.mostrarModalActualizar(dato)}
                    >
                      Editar
                    </Button>
                    <Button color="danger" onClick={() => this.eliminar(dato)}>
                      Borrar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
        <Modal isOpen={this.state.modalActualizar}>
          <ModalHeader>
            <div>
              <h3> Editar Registro </h3>
            </div>
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <label>Nombre </label>
              <input
                className="form-control"
                name="name"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.name}
              />
            </FormGroup>
            <FormGroup>
              <label>Descripción </label>
              <input
                className="form-control"
                name="description"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.description}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button
              color="info"
              onClick={() => this.Actualizar(this.state.form)}
            >
              Actualizar
            </Button>
            <Button color="danger" onClick={() => this.cerrarModalActualizar()}>
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
            <div>
              <h3> Insertar Producto </h3>
            </div>
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <label>Nombre </label>
              <input
                className="form-control"
                name="name"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label>Descripción </label>
              <input
                className="form-control"
                name="description"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="info" onClick={() => this.insertar()}>
              Insertar
            </Button>
            <Button
              className="btn btn-danger"
              onClick={() => this.cerrarModalInsertar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}
export default App;
