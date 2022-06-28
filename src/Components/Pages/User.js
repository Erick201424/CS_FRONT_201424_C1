import React, { useEffect, useState } from 'react';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { makeStyles } from '@material-ui/core/styles';
import { Modal } from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    modal: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    },
    iconos: {
        cursor: 'pointer'
    },
    inputMaterial: {
        width: '100%'
    }
}));

function User() {

    const url = 'http://localhost:3000/api/user/';
    const styles = useStyles();

    const [data, setData] = useState([]);

    const [insertar, setInsertar] = useState(false);
    const [editar, setEditar] = useState(false);
    const [eliminar, setEliminar] = useState(false);

    const [user, setUser] = useState({
        id: '',
        username: '',
        email: '',
        password: '',
        phone_number: ''
    })

    const handleChange = e => {
        const { name, value } = e.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }))
        console.log(user);
    }

    const getUsers = async () => {
        await axios.get(`${url}list`)
            .then(response => {
                setData(response.data.statusMessage.rows);
            })
    }

    const addUser = async () => {
        await axios.post(`${url}register?username=${user.username}&email=${user.email}&password=${user.password}&phone_number=${user.phone_number}`)
            .then(response => {
                modalInsertar();
                getUsers();
            })
    }

    const updateUser = async () => {
        await axios.put(`${url}update?id=${user.id}&username=${user.username}&email=${user.email}&password=${user.password}&phone_number=${user.phone_number}`)
            .then(response => {
                modalEditar();
                getUsers();
            })
    }

    const deleteUser = async () => {
        await axios.delete(`${url}delete?id=${user.id}`)
            .then(response => {
                modalEliminar();
                getUsers();
            });
    }


    const modalInsertar = () => {
        setInsertar(!insertar);
        console.log(modalInsertar.value);
    }

    const modalEditar = () => {
        setEditar(!editar)
        console.log(modalEditar.useState);
    }

    const modalEliminar = () => {
        setEliminar(!eliminar);
    }

    const typeModal = (selectUser, caso) => {
        setUser(selectUser);
        (caso === 'Editar') ? modalEditar() : modalEliminar()
    }

    useEffect(() => {
        getUsers();
    }, []);


    const cuerpoInsertar = (
        <div className={styles.modal}>
            <div className='modal-header'>
                <h3 className='modal-title'>Add User</h3>
            </div>
            <div className='modal-body'>
                <form>
                    <div className='col-md-auto'>
                        <label htmlFor='username' className='form-label'>Username</label>
                        <input type='text' className='form-control' name='username' onChange={handleChange} />
                    </div>
                    <div className='col-auto'>
                        <label htmlFor='email' className='form-label'>Email</label>
                        <input type='email' className='form-control' name='email' onChange={handleChange} />
                    </div>
                    <div className='col-auto'>
                        <label htmlFor='password' className='form-label'>Password</label>
                        <input type='password' className='form-control' name='password' onChange={handleChange} />
                    </div>
                    <div className='col-auto'>
                        <label htmlFor='phone_number' className='form-label'>Phone</label>
                        <input type='tel' className='form-control' name='phone_number' onChange={handleChange} />
                    </div>
                    <br/>
                    <div className='row text-aling-center' align='center'>
                        <div className='col-6'>
                            <button type='button' className='btn btn-success' onClick={() => addUser()}>Registrar</button>
                        </div>
                        <div className='col-6'>
                            <button type='button' className='btn btn-danger' onClick={() => modalInsertar()}>Cancelar</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )

    const cuerpoEditar = (
        <div className={styles.modal}>
            <div className='modal-header'>
                <h3 className='modal-title'>Edit User</h3>
            </div>
            <div className='modal-body'>
                <form>
                    <div className='row'>
                        <div className='col-md-3'>
                            <label htmlFor='id' className='form-label'>ID</label>
                            <input type='text' className='form-control text-center' name='id' onChange={handleChange} value={user && user.id} disabled />
                        </div>
                        <div className='col-md-auto'>
                            <label htmlFor='username' className='form-label'>Username</label>
                            <input type='text' className='form-control' name='username' onChange={handleChange} value={user && user.username} />
                        </div>
                    </div>
                    <div className='col-auto'>
                        <label htmlFor='email' className='form-label'>Email</label>
                        <input type='email' className='form-control' name='email' onChange={handleChange} value={user && user.email} />
                    </div>
                    <div className='col-auto'>
                        <label htmlFor='password' className='form-label'>Password</label>
                        <input type='password' className='form-control' name='password' onChange={handleChange} value={user && user.password} />
                    </div>
                    <div className='col-auto'>
                        <label htmlFor='phone_number' className='form-label'>Phone</label>
                        <input type='tel' className='form-control' name='phone_number' onChange={handleChange} value={user && user.phone_number} />
                    </div>
                    <br />
                    <div className='row text-aling-center' align='center'>
                        <div className='col-6'>
                            <button type='button' className='btn btn-primary' onClick={() => updateUser()}>Actualizar</button>
                        </div>
                        <div className='col-6'>
                            <button type='button' className='btn btn-danger' onClick={() => modalEditar()}>Cancelar</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )

    const cuerpoEliminar = (
        <div className={styles.modal}>
            <div className='modal-header'>
                <h3 className='modal-title'>Delete User</h3>
            </div>
            <div className='modal-body'>
                <p>¿Desea eliminar al usuario <b>{user && user.username}</b> ?</p>
                <div className='row text-aling-center' align='center'>
                    <div className='col-6'>
                        <button type='button' className='btn btn-primary' onClick={() => deleteUser()}>Eliminar</button>
                    </div>
                    <div className='col-6'>
                        <button type='button' className='btn btn-danger' onClick={() => modalEliminar()}>Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <>
            <div className='container-fluid card text-center' id='cont-Main'>
                <div className='container-fluid card-header'>
                    <h3>List of Users</h3>
                    <button type='button' className='btn btn-primary' onClick={() => modalInsertar()}>Add</button>
                </div>
                <div className='container-fluid'>
                    <div className='table-responsive'>
                        <table className='table table-hover'>
                            <thead>
                                <tr>
                                    <th scope='col'>ID</th>
                                    <th scope='col'>Username</th>
                                    <th scope='col'>Email</th>
                                    {/* <th scope='col'>Password</th> */}
                                    <th scope='col'>Phone</th>
                                    <th scope='col'>Options</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((usr) => {
                                    return (
                                        <tr key={usr.id}>
                                            <td>{usr.id}</td>
                                            <td>{usr.username}</td>
                                            <td>{usr.email}</td>
                                            {/* <td>{usr.password}</td> */}
                                            <td>{usr.phone_number}</td>
                                            <td>
                                                <Edit className={styles.iconos} onClick={() => typeModal(usr, 'Editar')} />
                                                &nbsp;&nbsp;&nbsp;
                                                <Delete className={styles.iconos} onClick={() => typeModal(usr, 'Eliminar')} />
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <Modal
                open={insertar}
                onClose={modalInsertar}>
                {cuerpoInsertar}
            </Modal>

            <Modal
                open={editar}
                onClose={modalEditar}>
                {cuerpoEditar}
            </Modal>

            <Modal
                open={eliminar}
                onClose={modalEliminar}>
                {cuerpoEliminar}
            </Modal>
        </>
    )
}

export default User;