import { Password } from 'primereact/password';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { useDispatch, useSelector  } from 'react-redux';
import { access } from '../../store/auth/thunks';
import { useEffect, useRef, useState } from 'react';
import { changeAccess, errorMessage } from '../../store/auth/authSlice';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export const Consult = () => {

  const toast = useRef(null);
  const dispatch = useDispatch();
  const {showError,access:intoIt} = useSelector(state => state.auth);
  const [formattedDate, setFormattedDate] = useState(null);
  const [current, setCurrent] = useState(false);
  const [visible, setVisible] = useState(false);

  const { handleSubmit,getFieldProps,resetForm,errors,touched } = useFormik({
    initialValues: {
      document: ''
    },
    validationSchema: Yup.object({
      document: Yup.string().matches(/^[0-9]+$/, 'Digite unicamente numeros').required('La contraseña es requerida')
    }),
    onSubmit: (values) => {
      dispatch( access(values) );
    }
  });

  useEffect(() => {
    if(showError) {
      show('error',showError);
      dispatch(errorMessage(''));
      resetForm();
    }
  }, [showError]);

  useEffect(() => {
    if (Object.keys(intoIt).length > 0) {
      setVisible(true);
      const today = new Date().setHours(0,0,0,0);
      const myDate = new Date(intoIt.date);
      const options = { day: 'numeric', month: 'long', year: 'numeric' };
      const date = myDate.toLocaleDateString('es-ES', options);
      if (myDate.getTime() === today) {
        setCurrent(true);
        setFormattedDate('Tu mensualidad vence hoy');
      }
      if (myDate.getTime() > today) {
        setCurrent(true);
        setFormattedDate(`Tu mensualidad vence el ${date}`);
      }
      if (myDate.getTime() < today) {
        setCurrent(false);
        setFormattedDate(`Tu mensualidad vencio el ${date}`);
      }
      setTimeout(() => {
        setVisible(false);
        resetForm();
        dispatch( changeAccess({}) );
      }, 8000);
    }
  }, [intoIt]);

  const show = (type,message) => {
    toast.current.show({ severity: type, summary: 'Aviso', detail: message });
  };

  return (
    <>
      <Toast ref={toast} />
      <Dialog visible={visible} closable={false}>
        <div className="flex flex-column align-items-center justify-content-center">
            { current 
              ? <i className="pi pi-check-circle mb-2 w-3rem flex-shrink-0" style={{ fontSize: '3rem', color: '#2068F0' }}></i>
              : <i className="pi pi-times-circle mb-2 w-3rem flex-shrink-0" style={{ fontSize: '3rem', color: '#D9654C' }}></i>
            }
          <div className="text-center">
            <div className="text-900 text-5xl font-medium mb-3">
              { current ? `¡Bienvenido! ${intoIt.name}` : intoIt.name }
            </div>
          </div>
          <div className="text-center">
            <div className="text-700 text-4xl font-medium mb-3">
              {formattedDate}
            </div>
          </div>
        </div>
      </Dialog>
      <div className="flex flex-column align-items-center justify-content-center p-4 flipleft animation-duration-300">
        <img src='/vite.svg' alt="Sakai logo" className="mb-3 w-3rem flex-shrink-0" />
        <div style={{ borderRadius: '56px', padding: '0.3rem', background: 'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)' }}>
          <div style={{borderRadius: '56px'}} className="w-full surface-card py-8 px-5 sm:px-8">
            <div className="text-center mb-3">
                <div className="text-900 text-4xl font-medium mb-3">Ingresar</div>
            </div>
            <div>
              <form noValidate onSubmit={handleSubmit}>
                <Password feedback={false} 
                          toggleMask 
                          className="w-full mb-3" 
                          inputClassName="w-full p-3 md:w-30rem"
                          {...getFieldProps('document')}>
                </Password>
                {errors.document && touched.document && <small className="block mb-3">{errors.document}</small>}  
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
};
