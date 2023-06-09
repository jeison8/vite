import { PanelMenu } from 'primereact/panelmenu';
import { useNavigate } from 'react-router-dom';

export const SideBarPage = () => {

    const navigate = useNavigate();

    const items = [
        {
          label: 'Usuarios',
          icon: 'pi pi-fw pi-user',
          items: [
            {
              label: 'Lista usuarios',
              icon: 'pi pi-fw pi-bars',
              command: () => { navigate('/dashboard') } 
            },
            {
              label: 'Crear usuario',
              icon: 'pi pi-fw pi-plus',
              command: () => { navigate('/dashboard/create') }
            },
            {
              label: 'Consultar usuario',
              icon: 'pi pi-fw pi-search',
              command: () => { window.open('/consult', '_blank') }
            }
          ]
        }
      ];
      
      return (
        <div className="flex justify-content-center mt-3">
          <PanelMenu model={items} 
                     className="w-full md:w-25rem" >
          </PanelMenu>
        </div>
      );
}
