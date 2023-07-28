import { DataTable } from 'primereact/datatable';
import { Calendar } from 'primereact/calendar';
import { Toast } from 'primereact/toast';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { destroyUser, getAllUsers } from '../../store/user/thunks';
import { Paginator } from 'primereact/paginator';
import { debounce } from 'lodash';
import { errorMessage, setUpdate} from '../../store/user/userSlice';
import { useNavigate } from 'react-router-dom';

export const HomePage = () => {

  const toast = useRef(null);
  const [first, setFirst] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [filter, setFilter] = useState({name: '', date: null});
  const { rows,totalDocs,users,error } = useSelector(state => state.user);

  useEffect(() => { 
    debounceFilterChange(0,rows,filter);
  }, [filter.name]);

  useEffect(() => {
    paginate(0,rows,filter);
  }, [filter.date]);

  useEffect(() => {
    if(error) show('error',error);
    dispatch( errorMessage(''))
  }, [error]);

  const destroy = (event,user) => {
    confirmPopup({
      target: event.currentTarget,
      message: 'Desea eliminar el registro?',
      icon: 'pi pi-info-circle',
      acceptClassName: 'p-button-danger',
      accept: () => dispatch(destroyUser(user._id))
    });
  }

  const update = (user) => {
    dispatch( setUpdate(user) );
    navigate('/dashboard/update');
  }

  const onPageChange = (event) => {
    setFirst(event.first);
    paginate(event.page+1,event.rows,filter);
  }

  const filterChange = (event) => {
    if(!/^[a-zA-Z\s]*$/.test(event.target.value)) return;
    setFilter({...filter, name: event.target.value})
  }

  const filterChangeDate = (event) => {
    setFilter({...filter, date: event.target.value});
  }

  const debounceFilterChange = debounce((page,limit,filter) => {
    paginate(page,limit,filter);
  }, 600);

  const paginate = (page,limit,filter) => {
    dispatch( getAllUsers(page,limit,filter) );
  }

  const clean = () => {
    setFilter({name: '', date: null});
  };

  const show = (type,message) => {
    toast.current.show({ severity: type, summary: 'Aviso', detail: message });
  };

  const dateToString = (date) => {
    if (!date) return '';
    const newDate = new Date(date);
    const day = newDate.getDate().toString().padStart(2, '0');
    const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
    const year = newDate.getFullYear().toString();
    return `${day}/${month}/${year}`;
  }

  const actionsTemplateDateStart = (user) => {
    return (dateToString(user.dateStart));
  };

  const actionsTemplateDateEnd = (user) => {
    return (dateToString(user.dateEnd));
  };

  const actionsTemplate = (user) => {
    return (
      <div className="flex">
        <Button icon="pi pi-trash" 
            rounded text 
            severity="danger" 
            onClick={(event) => destroy(event,user)}>
        </Button>
        <Button icon="pi pi-pencil" 
            rounded text 
            severity="info" 
            onClick={() => update(user)}>
        </Button>
      </div>
    );
  };

  return (
    <div className="card">
      <Toast ref={toast} />
      <ConfirmPopup />
      <div className="formgrid grid">
        <div className="field col-12 sm:col-12 md:col-6 lg:col-4">
          <InputText placeholder="Buscar nombre" 
                     value={filter.name}
                     onChange={(event) => filterChange(event)}
                     className="w-full">
          </InputText>
        </div>
        <div className="field col-12 sm:col-12 md:col-6 lg:col-4">
          <Calendar placeholder="Buscar vencimiento"
                    value={filter.date}
                    onChange={(event) => filterChangeDate(event)}
                    className="w-full"
                    dateFormat="dd/mm/yy"
                    readOnlyInput>
          </Calendar>
        </div>
        <div className="field col-12 sm:col-12 md:col-12 lg:col-2">
          <Button label="limpiar" 
                  severity="secondary" 
                  className="w-full" 
                  onClick={() => clean()}
                  outlined>
          </Button>
        </div>
      </div>
      <DataTable value={users} emptyMessage="No se encontraron registros">
        {/* <Column header="Documento" field="document"/> */}
        <Column header="Nombre" field="name" />
        <Column header="Valor" field="cost" />
        <Column header="Subscripción" body={actionsTemplateDateStart} />
        <Column header="Vencimiento" body={actionsTemplateDateEnd}/>
        <Column header="Acciones" body={actionsTemplate} />
      </DataTable>
      <Paginator first={first}
                 rows={rows}
                 totalRecords={totalDocs}
                 rowsPerPageOptions={[10, 20, 30]}
                 onPageChange={onPageChange}
                >
      </Paginator>
    </div> 
  )
}
