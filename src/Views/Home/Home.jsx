import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getResponses } from '../../redux/Actions/getResponses';
import { getForm } from '../../redux/Actions/getForm';
import { getUserById } from '../../redux/Actions/getUserById';
import styles from './Home.module.css'
import { deleteRes } from '../../redux/Actions/deleteResponse';
import Swal from 'sweetalert2';
import Update from '../Update/Update';

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isTabOpen, setIsTabOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const allResponses = useSelector((state) => state.allResponses)
    const userInfo = useSelector((state) => state.user)
    const allForms = useSelector((state) => state.allForms)
    //const access = useSelector((state)=>state.access) //sacar del local storage
    const reload = () => {
        window.location.reload(false);
    };

    const access = localStorage.getItem("access");
    const myId = localStorage.getItem("clientId");
    const userResponses = allResponses.filter(res => Number(res?.UserId) === Number(myId))
console.log(selected);

    useEffect(() => {
        access !== "true" && navigate("/");
    }, [access]);

    useEffect(() => {
        dispatch(getResponses());
        dispatch(getForm());
        dispatch(getUserById(myId))
    }, [dispatch]);

    const toggleTab = () => {
        setIsTabOpen(!isTabOpen);
    };
    const tabClassName = isTabOpen ? styles.filtersopen : styles.filters;

    return (
        <div className={styles.home}>
            <div className={styles.info}>
                <div className={tabClassName}>
                    {isTabOpen ? <div className={styles.block}>
                        <button className={styles.tab} onClick={toggleTab}>Búsqueda y Filtrado ▲</button>
                    </div>
                        :
                        <div>
                            <button className={styles.tab} onClick={toggleTab}>Búsqueda y Filtrado ▼</button>
                        </div>
                    }


                    {/* Contenido de la pestaña desplegable */}
                    {isTabOpen && (
    <div className={styles.tabContent} style={{ animation: isTabOpen ? 'myAnim 1s ease 0s 1 normal forwards' : 'none' }}>
        {/* Aquí puedes colocar el contenido de tu pestaña */}
        Contenido de la pestaña desplegable.
    </div>
)}
                </div>
                <div className={styles.header}>
                    <p>Mis Formularios ({userResponses?.length})</p>
                </div>
                <div className={styles.list}>
                    {(userResponses?.length > 0) ? userResponses?.map((res) => {
                        const form = allForms.find(e => e.id === res.FormId)
                        const handleSubmit = (event) => {
                            event.preventDefault();
                            setSelected(res?.id)
                            
                        };
                        const handleDelete = (event) => {
                            event.preventDefault();
                            Swal.fire({
                                text: '¿Estas seguro de eliminar?',
                                icon: 'warning',
                                showConfirmButton: true,
                                showCancelButton: true,
                                confirmButtonText: 'Eliminar',
                                cancelButtonText: 'Volver al Inicio',
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    dispatch(deleteRes(res.id))
                                    setTimeout(reload, 3000);
                                } else {
                                    reload();
                                }
                            })
                        }
                        return (<div className={styles.res}>
                            <p style={{ cursor: "pointer" }} onClick={(event) => handleSubmit(event)}>📝 {form?.title}</p>
                            <button className={styles.delete} type='submit' onClick={(event) => handleDelete(event)}>X</button>
                        </div>)
                    }
                    ) : "No hay formularios por el momento"}
                </div>

            </div>
            <div className={styles.formview}>
                {selected===null?<h3 style={{color:"white"}}>Selecciona o busca un formulario</h3>:<Update selected={selected}/>}
            </div>
        </div>
    )

}
export default Home;