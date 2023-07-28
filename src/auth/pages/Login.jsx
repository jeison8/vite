import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/auth/thunks';
import { useEffect, useRef } from 'react';
import { errorMessage } from '../../store/auth/authSlice';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export const Login = () => {

  const toast = useRef(null);
  const dispatch = useDispatch();
  const { loginError } = useSelector(state => state.auth);

  useEffect(() => {
    if(loginError !== '') show('error',loginError);
    dispatch(errorMessage(''));
  }, [loginError]);
  
  const { handleSubmit,getFieldProps,errors,touched } = useFormik({
    initialValues: {
      document: '',
      password: ''
    },
    validationSchema: Yup.object({
      document: Yup.string().matches(/^[0-9]+$/, 'Digite unicamente numeros').required('El documento es requerido'),
      password: Yup.string().required('La contraseña es requerida')
    }),
    onSubmit: (values) => {
      dispatch( login(values) );
    }
  });

  const show = (type,message) => {
    toast.current.show({ severity: type, summary: 'Aviso', detail: message });
  };
  
  return (
    <>
      <Toast ref={toast} />
      <div className="flex flex-column align-items-center justify-content-center p-4 flipleft animation-duration-300">
        <img src='/vite.svg' alt="Sakai logo" className="mb-3 w-3rem flex-shrink-0" />
        <div style={{ borderRadius: '56px', padding: '0.3rem', background: 'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)' }}>
          <div style={{borderRadius: '56px'}} className="w-full surface-card py-8 px-5 sm:px-8">
            <div className="text-center mb-3">
                <div className="text-900 text-4xl font-medium mb-3">Blessing</div>
            </div>
            <div>
              <form noValidate onSubmit={handleSubmit}>
                <label htmlFor="document" className="block text-900 text-xl font-medium mb-2">Documento</label>
                <InputText  type="text" 
                            className="w-full md:w-30rem mb-3" 
                            style={{ padding: '1rem' }}
                            {...getFieldProps('document')}>
                </InputText>
                {errors.document && touched.document && <small className="block mb-3">{errors.document}</small>}
                <label htmlFor="password" className="block text-900 font-medium text-xl mb-2">Contraseña</label>
                <Password feedback={false} 
                          toggleMask 
                          className="w-full mb-3" 
                          inputClassName="w-full p-3 md:w-30rem"
                          {...getFieldProps('password')}>
                </Password>
                {errors.password && touched.password && <small className="block">{errors.password}</small>}
                <div className="mt-3">
                  <Button label="Ingresar" 
                          type="submit"
                          className="w-full p-3 text-xl">
                  </Button>
                </div>  
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
