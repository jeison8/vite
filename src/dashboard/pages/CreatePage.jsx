import { useEffect, useRef, useState } from 'react';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../../store/user/thunks';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { errorMessage, setStatus } from '../../store/user/userSlice';

const initialValues = {
    document: '',
    name: '',
    cost: '',
    dateStart: '',
    dateEnd: ''
};
const validationSchema = () => Yup.object({
    document: Yup.string().matches(/^[0-9]+$/, 'Digite unicamente numeros').required('El documento es requerido'),
    name: Yup.string().required('El nombre es requerido'),
    cost: Yup.string().required('el valor es requerido'),
    dateStart: Yup.string().required('La fecha es requerida')
});


export const CreatePage = () => {

    const navigate = useNavigate();
    const toast = useRef(null);
    const dispatch = useDispatch();
    const [submited, setSubmited] = useState(false);
    const { status, error } = useSelector( state => state.user );
    const dropdownItems = [{ value: '38.000'},{ value: '21.000'},{ value: '11.000'},{ value: '5.000'}];

    useEffect(() => {
        if(submited){
            setSubmited(false);
            confirmDialog({
                message: 'Usuario creado correctamente ¿desea crear otro usuario?',
                header: 'Confirmaion',
                icon: 'pi pi-info-circle',
                accept: () => {
                    resetForm();
                } ,
                reject: () => {
                    resetForm();
                    navigate('/dashboard/home');
                }
            });
            dispatch(setStatus(false) );
        }
    }, [status]);

    useEffect(() => {
        if(error) {
          show('error',error);
          dispatch(errorMessage(''));
        }
      }, [error]);

    const { handleSubmit,getFieldProps,resetForm,errors,touched } = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            setSubmited(true);
            dispatch(createUser(values));
        }
    });

    const show = (type,message) => {
        toast.current.show({ severity: type, summary: 'Aviso', detail: message });
    };

    return (
        <>
            <Toast ref={toast} />
            <ConfirmDialog />
            <div className="grid">
                <div className="col-12 md:col-12">
                    <form noValidate onSubmit={handleSubmit}>
                        <div className="card p-fluid">
                            <div className="field">
                                <label htmlFor="document">Documento</label>
                                <InputText type="text" 
                                        {...getFieldProps('document')}>
                                </InputText>
                                {errors.document && touched.document && <small className="block mb-3">{errors.document}</small>}
                            </div>
                            <div className="field">
                                <label htmlFor="name">Nombre</label>
                                <InputText type="text" 
                                        {...getFieldProps('name')}>
                                </InputText>
                                {errors.name && touched.name && <small className="block mb-3">{errors.name}</small>}
                            </div>
                            <div className="field">
                                <label htmlFor="cost">Valor</label>
                                <Dropdown optionLabel="value"
                                        options={dropdownItems} 
                                        {...getFieldProps('cost')}>
                                </Dropdown>
                                {errors.cost && touched.cost && <small className="block mb-3">{errors.cost}</small>}
                            </div>
                            <div className="field">
                                <label htmlFor="dateStart">Fecha</label>
                                <Calendar {...getFieldProps('dateStart')}></Calendar>
                                {errors.dateStart && touched.dateStart && <small className="block mb-3">{errors.dateStart}</small>}
                            </div>
                            <div className="field mt-6">
                                <Button label="Crear"
                                        type="submit">
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
